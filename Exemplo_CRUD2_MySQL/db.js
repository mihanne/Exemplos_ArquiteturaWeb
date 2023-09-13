import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// create the connection to database
export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });


  connection.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
    }
});