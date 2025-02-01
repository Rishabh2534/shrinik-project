// config/database.js
//import { connection } from 'mongoose';
import mysql from 'mysql';

const connection= mysql.createConnection({
     host: "sql201.infinityfree.com",   // Your MySQL Hostname
    user: "if0_37994069",              // Your MySQL Username
    password: "fWiNgMspmtWgyQe",         // Your MySQL Password (keep it secret)
    database: "if0_37994069_shrinik",  // Your MySQL Database Name
    port: 3306  
    /*host: 'sql201.infinityfree.com', // Updated host
    user: 'if0_37994069',           // Updated username
    password: 'Mishra@123',    // Updated password
    database: 'if0_37994069_shrinik',   // Updated database name
    port: 3306 
   host: 'localhost',
    user: 'root',
    password: '',
    database: 'shrinik'*/
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

export default connection;
