import express from 'express';
import mysql from '../config/mysql.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { upload } from '../config/multer.js';
import { uploadImage } from '../Utils/cloudinaryUtils.js';

const router = express.Router();

// 📝 Inscription d'un utilisateur
router.post('/register', upload.single('profileImage'), async (req, res) => {
    const { nom, email, mot_de_passe, role } = req.body;

    if (!nom || !email || !mot_de_passe) {
        return res.status(400).json({ status: 'error', message: 'Tous les champs sont requis' });
    }

    try {
        const connection = await mysql.getConnection();

        // Vérifier si l'utilisateur existe déjà
        const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ status: 'error', message: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // Par défaut, l'utilisateur a le rôle "user"
        const userRole = role || 'user';

        // Insérer l'utilisateur en base de données
        await connection.execute(
            'INSERT INTO users (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)',
            [nom, email, hashedPassword, userRole]
        );

        res.status(201).json({ status: 'success', message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ status: 'error', message: 'Erreur serveur' });
    }
});

// 🔐 Connexion d'un utilisateur
router.post('/login', async (req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ status: 'error', message: 'Tous les champs sont requis' });
    }

    try {
        const connection = await mysql.getConnection();
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        console.log("📌 Résultat de la requête SQL:", rows); // 🔍 Vérifie si l'utilisateur est récupéré

        if (rows.length === 0) {
            console.log("❌ Aucun utilisateur trouvé avec cet email");
            return res.status(401).json({ status: 'error', message: 'Email ou mot de passe incorrect' });
        }

        const userData = rows[0];
        console.log("✅ Données utilisateur récupérées:", userData); // 🔍 Vérifie les données récupérées

        const isPasswordValid = await bcrypt.compare(mot_de_passe, userData.mot_de_passe);
        console.log("🔑 Mot de passe valide ?", isPasswordValid); // 🔍 Vérifie si le mot de passe correspond

        if (!isPasswordValid) {
            console.log("❌ Mot de passe incorrect");
            return res.status(401).json({ status: 'error', message: 'Email ou mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: userData.id, email: userData.email, role: userData.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log("🔓 Connexion réussie, token généré !");
        res.json({ status: 'success', token, role: userData.role });

    } catch (error) {
        console.error("🚨 Erreur lors de la connexion:", error);
        res.status(500).json({ status: 'error', message: 'Erreur serveur' });
    }
});

export default router;
