import { Buffer } from "buffer";

export const encryptPassword = (email: string, password: string): string => {
  console.log("encryptPassword START:" + email);
  const ret = Buffer.from(email.replace("@", password)).toString("base64");
  console.log("encryptPassword MOCK RESPONSE:" + ret);
  return ret;
};

export const temporaryPassword = (): string => {
  return Math.random().toString(36).slice(2);
};
