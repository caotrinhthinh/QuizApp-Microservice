import { UserModel } from "../models/UserModel";
import { DBClient } from "../utility/databaseClient";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class UserRepository {
  private db;

  constructor() {
    this.db = DBClient();
  }

  async createAccount({ phone, email, password, salt, userType }: UserModel) {
    const queryString =
      "INSERT INTO users(phone, email, password, salt, user_type) VALUES(?, ?, ?, ?, ?)";
    const values = [phone, email, password, salt, userType];

    // Ép kiểu kết quả là ResultSetHeader
    const [result] = await this.db.query<ResultSetHeader>(queryString, values);

    if (result.affectedRows > 0) {
      // Lấy lại user vừa insert bằng insertId
      const [rows] = await this.db.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE user_id = ?",
        [result.insertId]
      );
      return rows[0] as UserModel;
    }
  }

  async findAccount(email: string) {
    const queryString =
      "SELECT user_id, email, password, phone, salt FROM users WHERE email = ?";
    const values = [email];

    const [rows] = await this.db.query<RowDataPacket[]>(queryString, values);

    if (rows.length < 1) {
      throw new Error("user does not exist with provided email id!");
    }
    return rows[0] as UserModel;
  }
}
