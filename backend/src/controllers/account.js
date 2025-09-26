import pool from '../models/db.js';
import { GET_ALL, GET_BY_ID, CREATE_USER, UPDATE_USER, DELETE_USER, LOGIN } from '../models/account.js';

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
        
        res.status(200).json({Id: id, mensagem: "Usuario deletado com sucesso." }); 
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function Login(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { Email, Password } = req.body;
        const [rows] = await connection.execute(LOGIN, [Email, Password]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(401).json({ mensagem: "Credenciais inválidas." });
        }

        connection.release();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}