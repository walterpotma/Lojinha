import require from 'express';
import pool from '../models/db.js';
import { GET_ALL, GET_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../models/products.js';

export async function GetAllProducts(req, res) {
    try {
        const connection = await pool.getConnection();

        const [rows] = await connection.execute(GET_ALL);
        
        res.status(200).json(rows);
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function GetIdProducts(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { id } = req.params;
        const [rows] = await connection.execute(GET_BY_ID, [id]);

        if (rows.length > 0) {
            res.status(200).json(rows[0]); 
        } else {
            res.status(404).json({ mensagem: "Produto não encontrado." });
        }

        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function CreateProduct(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { Name, Description, Price, Category, Image, Stock } = req.body;
        const [result] = await connection.execute(CREATE_PRODUCT, [Name, Description, Price, Category, Image, Stock]);

        res.status(200).json({ insertId: result.insertId, mensagem: "Produto criado com sucesso!" });
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function UpdateProduct(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { id } = req.params;
        const { Name, Description, Price, Category, Image, Stock } = req.body;

        const [info] = await connection.execute(UPDATE_PRODUCT, [ Name, Description, Price, Category, Image, Stock, id]);
        const [result] = await connection.execute(GET_BY_ID, [id]);

        res.status(200).json({ Product: result, mensagem: "Produto Atualizado com sucesso!" });
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function DeleteProduct(req, res) {
    try {
        const connection = await pool.getConnection();
        
        const { id } = req.params;
        const [result] = await connection.execute(DELETE_PRODUCT, [id]);

        res.status(200).json({Id: id, mensagem: "Produto deletado com sucesso." }); 
        
        connection.release();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}