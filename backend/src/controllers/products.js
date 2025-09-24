import require from 'express';
import pool from '../models/db.js';
import { GET_ALL, GET_BY_ID, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../models/products.js';

export async function GetAllProducts(req, res) {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute(GET_ALL);
        connection.release();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function GetIdProducts(req, res) {
    try {
        const { id } = req.params;

        const connection = await pool.getConnection();
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
        const { Name, Description, Price, Category, Image, Stock } = req.params;

        const connection = await pool.getConnection();
        const [result] = await connection.execute(CREATE_PRODUCT, [Name, Description, Price, Category, Image, Stock]);

        connection.release();

        res.status(201).json({ insertId: result.insertId, mensagem: "Produto criado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function UpdateProduct(req, res) {
    try {
        const { id } = req.params;

        const connection = await pool.getConnection();
        const [rows] = await connection.execute(UPDATE_PRODUCT, [id]);

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

export async function DeleteProduct(req, res) {
    try {
        const { id } = req.params;

        const connection = await pool.getConnection();
        const [rows] = await connection.execute(DELETE_PRODUCT, [id]);

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