import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
}

export async function comparePassword(
  userPassword: string,
  dbPassword: string
) {
  const compare = await bcrypt.compare(userPassword, dbPassword);

  return compare;
}
