import express from 'express';
import mysql from '../config/mysql.js';

const router = express.Router();

//USERS:
router.get('/users', async (req, res) => {
    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users');
        connection.release();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/users', async (req, res) => {
    const {nom, email, mdp} = req.body;
    try{
        const connection = await mysql.getConnection();
        const [result] = await connection.execute('INSERT INTO users (nom, email, mdp) VALUES (?,?,?)', [nom, email, mdp]);
        connection.release();
        res.status(201).json({ id: result.insertId, nom, email, mdp });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/user/:id', async (req, res) => {
    const {nom, email, mdp} = req.body;
    const {id} = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('UPDATE user SET nom=?, email=?, mdp=? WHERE id=?', [nom, email, mdp, id]);
        connection.release();
        res.json({ id, nom, email, mdp });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/user/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM users WHERE id=?', [id]);
        connection.release();
        res.json({ message: 'User supprimé de la DB' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;
