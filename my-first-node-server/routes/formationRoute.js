import express from 'express';
import mysql from '../config/mysql.js';

const router = express.Router();

router.get('/formations', async (req, res) => {
    try {
        const connection = await mysql.getConnection();
        const [formations] = await connection.execute('SELECT * FROM formations');
        connection.release();

        if (!formations || formations.length === 0) {
            return res.status(404).json({ message: "Aucune formation trouvée." });
        }

        res.json(formations);
    } catch (err) {
        console.error("❌ Erreur récupération formations :", err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/formations', async (req, res) => {
    const { nom, prix, description } = req.body;
    try {
        const connection = await mysql.getConnection();
        const [result] = await connection.execute(
            'INSERT INTO formations (nom, prix, description) VALUES (?, ?, ?)',
            [nom, prix, description]
        );
        connection.release();
        res.status(201).json({ id: result.insertId, nom, prix, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/formation/:id', async (req, res) => {
    const { nom, prix, description } = req.body;
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute(
            'UPDATE formations SET nom=?, prix=?, description=? WHERE id=?',
            [nom, prix, description, id]
        );
        connection.release();
        res.json({ id, nom, prix, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/formation/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM formations WHERE id=?', [id]);
        connection.release();
        res.json({ message: 'Formation supprimée de la DB' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
