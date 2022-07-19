export const google_disabled = false;

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
