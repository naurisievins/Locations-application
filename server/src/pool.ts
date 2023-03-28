import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "optimistic-mysql_db-1",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "optimistic",
  port: 3306,
});

export default pool;
