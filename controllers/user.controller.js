import admin from '../utils/firebase.js';

export const fetchParkingSpaces = async (req, res) => {
    try {
        const db = admin.database();

        // Reference the 'spaces' node in Firebase Realtime Database
        const ref = db.ref('spaces');

        // Fetch all parking spaces data from the database
        const snapshot = await ref.once('value');
        const data = snapshot.val();

        // Transform the data to include space IDs
        const spacesWithIds = data ? Object.entries(data).map(([id, space]) => ({ id, ...space })) : [];

        res.json(spacesWithIds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};

export const reserveSpace = async (req, res) => {
    try {
        const spaceId = req.params.id;
        const db = admin.database();
        const ref = db.ref(`spaces/${spaceId}`);

        // Fetch the current space data
        const snapshot = await ref.once('value');
        const spaceData = snapshot.val();

        if (!spaceData) {
            return res.status(404).json({ message: 'Space not found' });
        }

        // Check if the space is already reserved
        if (spaceData.reserved === 'true') {
            return res.status(400).json({ message: 'Space is already reserved' });
        }

        // Update the space to mark it as reserved
        await ref.update({ reserved: 'true' });

        res.json({ message: 'Space reserved successfully', spaceId });
    } catch (error) {
        res.status(500).json({ message: 'Error reserving space', error: error.message });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const spaceId = req.params.id;
        const db = admin.database();
        const ref = db.ref(`spaces/${spaceId}`);

        // Fetch the current space data
        const snapshot = await ref.once('value');
        const spaceData = snapshot.val();

        if (!spaceData) {
            return res.status(404).json({ message: 'Space not found' });
        }

        // Check if the space is not reserved
        if (spaceData.reserved !== 'true') {
            return res.status(400).json({ message: 'Space is not reserved' });
        }

        // Update the space to mark it as not reserved
        await ref.update({ reserved: 'false' });


        res.json({ message: 'Reservation canceled successfully', spaceId });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling reservation', error: error.message });
    }
};