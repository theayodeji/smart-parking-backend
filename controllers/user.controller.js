import admin from '../utils/firebase.js';

// Helper function to calculate remaining cooldown time in a human-readable format
function getCooldownMessage(lastReservedAt, cooldownHours = 3) {
    const lastTime = new Date(lastReservedAt).getTime();
    const now = Date.now();
    const msLeft = (cooldownHours * 60 * 60 * 1000) - (now - lastTime);

    if (msLeft <= 0) return null;

    const hours = Math.floor(msLeft / (1000 * 60 * 60));
    const minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((msLeft % (1000 * 60)) / 1000);

    let parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0 && hours === 0) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return `You must wait ${parts.join(', ')} before reserving another space.`;
}

export const fetchParkingSpaces = async (req, res) => {
    try {
        const db = admin.database();
        const ref = db.ref('spaces');
        const snapshot = await ref.once('value');
        const data = snapshot.val();

        const spacesWithIds = data ? Object.entries(data).map(([id, space]) => ({ id, ...space })) : [];
        res.json(spacesWithIds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching parking spaces', error: error.message });
    }
};

export const reserveSpace = async (req, res) => {
    try {
        const spaceId = req.params.id;
        const userId = req.body.userId;
        const db = admin.database();

        // 1. Check user's last reservation time
        const userRef = db.ref(`users/${userId}`);
        const userSnap = await userRef.once('value');
        const userData = userSnap.val();

        if (userData && userData.lastReservedAt) {
            const lastReservedAt = new Date(userData.lastReservedAt).getTime();
            const now = Date.now();
            const hoursSince = (now - lastReservedAt) / (1000 * 60 * 60);
            if (hoursSince < 3) {
                const message = getCooldownMessage(userData.lastReservedAt, 3);
                return res.status(403).json({ message });
            }
        }

        // 2. Check if space is already reserved
        const spaceRef = db.ref(`spaces/${spaceId}`);
        const spaceSnap = await spaceRef.once('value');
        const spaceData = spaceSnap.val();

        if (!spaceData) {
            return res.status(404).json({ message: 'Space not found' });
        }
        if (spaceData.reserved === 'true') {
            return res.status(400).json({ message: 'Space is already reserved' });
        }

        // 3. Reserve the space and update user's lastReservedAt
        await spaceRef.update({ reserved: 'true', lastUser: userId });
        await userRef.update({ lastReservedAt: new Date().toISOString() });

        res.json({ message: 'Space reserved successfully', spaceId });
    } catch (error) {
        res.status(500).json({ message: 'Error reserving space', error: error.message });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const spaceId = req.params.id;
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const db = admin.database();
        const ref = db.ref(`spaces/${spaceId}`);
        const snapshot = await ref.once('value');
        const spaceData = snapshot.val();

        if (!spaceData) {
            return res.status(404).json({ message: 'Space not found' });
        }

        if (spaceData.reserved !== 'true') {
            return res.status(400).json({ message: 'Space is not reserved' });
        }

        if (spaceData.lastUser !== userId) {
            return res.status(403).json({ message: 'You are not authorized to cancel this reservation' });
        }

        await ref.update({ reserved: 'false' });
        res.json({ message: 'Reservation canceled successfully', spaceId });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling reservation', error: error.message });
    }
};