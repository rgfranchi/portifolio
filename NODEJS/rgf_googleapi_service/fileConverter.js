import fs from "fs";
import { temporaryDir } from "./config/config.js";

export const fileBase64_decode = (base64str, file) => {
  var bitmap = Buffer.from(base64str, "base64");
  fs.writeFileSync(dirFile(file), bitmap);
  return file;
};
export const fileBase64_to_ReadStream = (base64str, file) => {
  var newFile = fileBase64_decode(base64str, file);
  return fs.createReadStream(dirFile(newFile));
};

/**
 * Realiza leitura do arquivo.
 * Verifica se o arquivo já está carregado para iniciar conversão.
 * @todo melhorar o ajuste do async para quando o arquivo estiver carregado.
 * @param {*} file
 * @returns
 */
export const fileBase64_encode = async (file) => {
  if (!fs.existsSync(file)) {
    return "ARQUIVO NÃO LOCALIZADO EM DISCO"; 
  }
  let count = 3;
  let fileStat = 0;
  do {
    fileStat = fs.statSync(file).size;
    console.log(
      `TENTATIVA ${count}/3 de carregar o arquivo -> LOAD: ${fileStat} bytes`
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });
    count--;
  } while (fileStat <= 0 && count >= 0);
  return fs.readFileSync(file, { encoding: "base64" });
};

export const createStream = (fileName) => {
  return fs.createWriteStream(dirFile(fileName));
};

export const deleteTemporaryFiles = () => {
  fs.readdirSync(temporaryDir).forEach((file) => fs.rmSync(dirFile(file)));
};

const dirFile = (fileName) => {
  return temporaryDir + fileName;
};
