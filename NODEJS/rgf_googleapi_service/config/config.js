import path from "path";
import { fileURLToPath } from "url";

export const google_disabled = false;

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Versão da API
 */
export const version = "v3";

/**
 * Credencial de acesso:
 * -> verificar DOCUMENTOS/google_helper.txt
 */
export const authOptions = {
  keyFile: __dirname + "/google_key.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
};

/**
 * Pasta de acesso do google drive.
 */
export const parents = ["1nXkkY19ZSTktb0E-yRw-9do7te7-9axX"];

/**
 * Configuração de acesso a api.
 * Express.
 */
export const port = 3001;
export const driveBaseUrl = "/apiV1/fileBase64/";

/**
 * Diretório Temporário.
 */
export const temporaryDir = "./tmp/";
