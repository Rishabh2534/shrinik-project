// config/database.js
//import { connection } from 'mongoose';
import mysql from 'mysql';

const connection= mysql.createConnection({

     host: "sql12.freesqldatabase.com",   // Your MySQL Hostname
    user:  process.env.DBuser,              // Your MySQL Username
    password: process.env.DBpassword,         // Your MySQL Password (keep it secret)
    database: "sql12761841",  // Your MySQL Database Name
    port: 3306  
  
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

export default connection;
