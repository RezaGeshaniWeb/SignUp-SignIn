import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  console.log(hashedPassword);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export function verifyToken(token, secretKey) {
  try {
    const res = verify(token, secretKey);
    return { email: res.email };
  } catch (error) {
    return false;
  }
}
