import mysql from "mysql2/promise";

export const DBClient = () => {
  return mysql.createPool({
    host: "127.0.0.1",
    user: "root", // mặc định MySQL có user root
    database: "user_service", // database của bạn
    password: "61120055", // mật khẩu root
    port: 3306, // cổng mặc định của MySQL
    waitForConnections: true,
    connectionLimit: 10, // số connection tối đa
    queueLimit: 0,
  });
};
