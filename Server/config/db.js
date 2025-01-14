import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true
    // waitForConnections:true,
    // connectionLimit: 10, //Número máximo de conexiones activas
    // queueLimit: 0 //Número máximo de solicitudes en cola (0 = sin límite)
});

export const executeQuery = async (sql, values=[]) =>{
    let connection;
    try {
        //obtiene conexión del pool
        connection = await dbPool.getConnection();
        //ejecuto la consulta
        const [result] = await connection.query(sql, values);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        //libero la conexion
        if(connection){
            connection.release();
        }
    }
}

const testDbConnection = async () => {
    try {
        const result = await executeQuery('select * from user');
        console.log("resultado del test ", result);
    } catch (error) {
        console.log(error);
    }
}
// testDbConnection();