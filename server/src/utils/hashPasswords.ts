import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, saltRounds);
}

export function compareWithHash(password: string, hash: string) {
  console.log(password, hash);
  console.log(bcrypt.compareSync(password, hash));
  return bcrypt.compareSync(password, hash);
}
