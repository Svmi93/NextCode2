import express from 'express';
import mysql from '../config/mysql.js';
import multer from 'multer';


const router = express.Router();

router.get('/plats', async (req, res) => {
    try {
        const connection = await mysql.getConnection();
        const [plats] = await connection.execute('SELECT * FROM plats');

        console.log("✅ Plats récupérés depuis MySQL :", plats); // ✅ Debug

        if (!plats || plats.length === 0) {
            return res.status(404).json({ message: "Aucun plat trouvé." });
        }

        const platsetingredients = await Promise.all(plats.map(async (plat) => {
            if (!plat.id) { // ✅ Vérifie si l'ID est bien défini
                console.error("❌ ERREUR : plat.id est undefined !");
                return { ...plat, ingredients: [] };
            }

            const [ingredients] = await connection.execute(`
                SELECT i.id, i.nom, i.quantite_stock
                FROM ingredient i
                JOIN plat_ingredient pi ON i.id = pi.ingredient_id
                WHERE pi.plat_id = ?
            `, [plat.id]);

            return {
                ...plat,
                ingredients: ingredients || []
            };
        }));

        connection.release();
        res.json(platsetingredients);
    } catch (err) {
        console.error("❌ Erreur récupération plats :", err); // ✅ Debugging
        res.status(500).json({ error: err.message });
    }
});


router.post('/plats', async (req, res) => {
    const { nom, prix, description } = req.body;
    try {
        const connection = await mysql.getConnection();
        const [result] = await connection.execute('INSERT INTO plats (nom, prix, description) VALUES (?, ?, ?)', [nom, prix, description]);
        connection.release();
        res.status(201).json({ id: result.insertId, nom, prix, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/plat/:id', async (req, res) => {
    const { nom, prix, description } = req.body;
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('UPDATE plats SET nom=?, prix=?, description=? WHERE id=?', [nom, prix, description, id]);
        connection.release();
        res.json({ id, nom, prix, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/plat/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await mysql.getConnection();
        await connection.execute('DELETE FROM plats WHERE id=?', [id]);
        connection.release();
        res.json({ message: 'Plat supprimé de la DB' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




export default router;