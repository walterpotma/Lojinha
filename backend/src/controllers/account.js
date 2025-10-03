import pool from '../models/db.js';
import { GET_ALL, GET_BY_ID, CREATE_USER, UPDATE_USER, DELETE_USER, LOGIN } from '../models/account.js';
import jwt from 'jsonwebtoken';

const JWT_KEY = "123abc456def789ghi0ihgfedcba654321";

export async function GetAllUser(req, res) {
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(GET_ALL);

        res.status(200).json(rows);

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function GetIdUser(req, res) {
    try {
        const connection = await pool.getConnection();

        const { id } = req.params;
        const [rows] = await connection.execute(GET_BY_ID, [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ mensagem: "Usuario não encontrado." });
        }

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function CreateUser(req, res) {
    try {
        const connection = await pool.getConnection();

        const { Name, Email, Phone, Password, Image } = req.body;
        let Active = false;

        const [info] = await connection.execute(CREATE_USER, [Name, Email, Phone, Password, Image, Active]);
        const [result] = await connection.execute(GET_BY_ID, [info.insertId]);

        res.status(200).json({ result, mensagem: "Conta criada com sucesso!" });

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function UpdateUser(req, res) {
    try {
        const connection = await pool.getConnection();

        const { id } = req.params;
        const { Name, Phone, Password, Image } = req.body;

        const [currentUserRows] = await connection.execute(GET_BY_ID, [id]);

        if (currentUserRows.length === 0) {
            return res.status(404).json({ mensagem: "Usuario não encontrado para atualização." });
            connection.release();
        }

        const currentUser = currentUserRows[0];

        const updatedName = Name || currentUser.Name;
        const updatedPhone = Phone || currentUser.Phone;
        const updatedPassword = Password || currentUser.Password;
        const updatedImage = Image || currentUser.Image;

        await connection.execute(UPDATE_USER, [
            updatedName,
            updatedPhone,
            updatedPassword,
            updatedImage,
            id
        ]);

        const [updatedUserRows] = await connection.execute(GET_BY_ID, [id]);

        res.status(200).json({
            user: updatedUserRows[0],
            mensagem: "Usuário atualizado com sucesso!"
        });

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function DeleteUser(req, res) {
    try {
        const connection = await pool.getConnection();

        const { id } = req.params;
        const [result] = await connection.execute(DELETE_USER, [id]);

        res.status(200).json({ Id: id, mensagem: "Usuario deletado com sucesso." });

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function Login(req, res) {
    try {
        const connection = await pool.getConnection();

        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const [rows] = await connection.execute(LOGIN, [Email]);
        const user = rows[0];

        if (rows.length === 1 && user.Password === Password) {
            const token = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });

            res.status(200).json({ token: token });
        } else {
            res.status(401).json({ mensagem: "Credenciais inválidas." });
        }

        connection.release();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function ValidateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = decoded;
        next();
    });

    res.status(200).json({ message: 'Token válido.', user: req.user });
}