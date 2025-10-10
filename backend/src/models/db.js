import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ga062230',
    database: 'marketplus',
    port: 3306
});

export default pool;