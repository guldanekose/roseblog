import mysql from "mysql2/promise"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"gul123",
    database: "roseblog",
     waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
