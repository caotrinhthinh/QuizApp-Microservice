import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const APP_SECRET = "my_app_secret";

export const getSalt = async () => {
  return await bcrypt.genSalt();
};

export const getHashedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password + APP_SECRET, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  const hash = await getHashedPassword(enteredPassword, salt);
  return hash === savedPassword;
};

export const getToken = ({ user_id, email, phone, userType }: UserModel) => {
  return jwt.sign(
    {
      user_id,
      email,
      phone,
      userType,
    },
    APP_SECRET,
    { expiresIn: "2h" }
  );
};

export const verifyToken = async (token: string) => {
  try {
    if (token !== "") {
      const payload = await jwt.verify(token.split(" ")[1], APP_SECRET);
      return payload;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
