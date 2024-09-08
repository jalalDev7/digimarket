import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  const saltRounds = 10;

  return bcrypt.hashSync(password, saltRounds);
}
