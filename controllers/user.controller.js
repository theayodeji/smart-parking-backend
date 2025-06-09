import admin from '../utils/firebase.js';

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
        const ref = db.ref(`spaces/${spaceId}`);

        const snapshot = await ref.once('value');
        const spaceData = snapshot.val();

        if (!spaceData) {
            return res.status(404).json({ message: 'Space not found' });
        }

        if (spaceData.reserved === 'true') {
            return res.status(400).json({ message: 'Space is already reserved' });
        }

        await ref.update({ reserved: 'true', lastUser: userId });
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