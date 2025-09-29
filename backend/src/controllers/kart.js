import require from 'express';
import pool from '../models/db.js';
import { GET_ALL, GET_BY_ID, CREATE_KART, UPDATE_KART, DELETE_KART} from '../models/kart.js';

export async function GetAllKart(req, res) {
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(GET_ALL);
        
        res.status(200).json(rows);
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function GetIdKart(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { id } = req.params;
        const [rows] = await connection.execute(GET_BY_ID, [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]); 
        } else {
            res.status(404).json({ mensagem: "Carrinho não encontrado." });
        }

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function CreateKart(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { Name, Description, Price, Category, Image, Stock } = req.body;
        const [result] = await connection.execute(CREATE_KART, [Name, Description, Price, Category, Image, Stock]);

        res.status(200).json({ insertId: result.insertId, mensagem: "Carrinho criado com sucesso!" });
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function UpdateKart(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { id } = req.params;
        const { Name, Description, Price, Category, Image, Stock } = req.body;

        const [info] = await connection.execute(UPDATE_KART, [ Name, Description, Price, Category, Image, Stock, id]);
        const [result] = await connection.execute(GET_BY_ID, [id]);

        res.status(200).json({ Kart: result, mensagem: "Carrinho Atualizado com sucesso!" });
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function DeleteKart(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { id } = req.params;
        const [result] = await connection.execute(DELETE_KART, [id]);

        res.status(200).json({Id: id, mensagem: "Carrinho deletado com sucesso." }); 
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}