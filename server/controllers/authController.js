import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connection } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);

    const [result] = await connection.query(
      'INSERT INTO users (name, username, password) VALUES (?, ?, ?)',
      [name, username, hashedPassword]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      username,
    });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error al registrar el usuario');
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).send("Usuario o contraseña incorrectos");
    }

    const user = rows[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send("Usuario o contraseña incorrectos");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).send({ auth: true, token , personId: user.id});
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error al iniciar sesión");
  }
};

export const logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
