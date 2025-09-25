import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@Senha123@',
    database: 'marketplus',
    port: 3306
});

export default pool;