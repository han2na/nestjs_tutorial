import * as bcrypt from 'bcryptjs';

export function encodePassword(password: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(password, SALT);
}

export function comparePasswords(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
