import { google } from "googleapis";
import { authOptions, version } from "./config/config.js";

const auth = new google.auth.GoogleAuth(authOptions);

const driveService = google.drive({
  version,
  auth,
});

/**
 * Cria (Envia) arquivo no Google Drive.
 * @param requestBody nome do arquivo e local onde salvar.
 * @param media tipo de arquivo (conteúdo em bytes)
 * @param fields Campos de retorno separado por ','
 * @returns
 */
export const createFile = async (requestBody, media, fields) => {
  let response = await driveService.files.create({
    requestBody,
    media,
    fields,
  });
  return response;
};

/**
 * Atualiza arquivo no Google Drive.
 * @param fileId Id do arquivo existente
 * @param media tipo de arquivo (conteúdo em bytes)
 * @param fields Campos de retorno separado por ','
 * @param requestBody Nome do arquivo e local onde salvar.
 * @returns
 */
export const updateFile = async (fileId, requestBody, media, fields) => {
  let response = await driveService.files.update({
    fileId,
    media,
    fields,
    requestBody,
  });
  return response;
};

/**
 * Exclui arquivo.
 * @param fileId Id do arquivo
 * @param fields retorno esperado (status: 204 e statusText: 'No Content').
 * @returns
 */
export const deleteFile = async (fileId, fields = "status") => {
  let response = await driveService.files.delete({
    fileId,
    fields,
  });
  return response;
};

/**
 * Cria arquivo temporário e converte para Base64.
 * @param {*} fileId
 * @param {*} fileName
 * @returns
 */
export const getFile = async (fileId, createStreamDestination) => {
  return await driveService.files
    .get({ fileId, alt: "media" }, { responseType: "stream" })
    .then((res) => {
      let progress = 0;
      return new Promise((resolve, reject) => {
        res.data
          .on("end", () => {
            console.log("->Done downloading file.");
            resolve({ path: createStreamDestination.path, status: res.status });
          })
          .on("error", (err) => {
            console.error("->Error downloading file.");
            reject({ errors: "ERRO AO BAIXAR ARQUIVO.", code: res.code });
          })
          .on("data", (d) => {
            progress += d.length;
            if (process.stdout.isTTY) {
              process.stdout.clearLine();
              process.stdout.cursorTo(0);
              process.stdout.write(`Downloaded ${progress} bytes`);
            }
          })
          .pipe(createStreamDestination);
      });
    });
};

/**
 * Recebe lista de arquivos do Google Drive.
 * @returns Referencia aos arquivos em var.data.files
 */
export const listFile = async () => {
  // descrição no fin do arquivo -> Params$Resource$Files$List
  const listParams = {};
  let response = await driveService.files.list(listParams);
  return response;
};

// interface StandardParameters {
//     /**
//      * Auth client or API Key for the request
//      */
//     auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | BaseExternalAccountClient | GoogleAuth;
//     /**
//      * Data format for the response.
//      */
//     alt?: string;
//     /**
//      * Selector specifying which fields to include in a partial response.
//      */
//     fields?: string;
//     /**
//      * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
//      */
//     key?: string;
//     /**
//      * OAuth 2.0 token for the current user.
//      */
//     oauth_token?: string;
//     /**
//      * Returns response with indentations and line breaks.
//      */
//     prettyPrint?: boolean;
//     /**
//      * An opaque string that represents a user for quota purposes. Must not exceed 40 characters.
//      */
//     quotaUser?: string;
//     /**
//      * Deprecated. Please use quotaUser instead.
//      */
//     userIp?: string;
// }

//  export interface Params$Resource$Files$Get extends StandardParameters {
//     /**
//      * Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media.
//      */
//     acknowledgeAbuse?: boolean;
//     /**
//      * The ID of the file.
//      */
//     fileId?: string;
//     /**
//      * Specifies which additional view's permissions to include in the response. Only 'published' is supported.
//      */
//     includePermissionsForView?: string;
//     /**
//      * Whether the requesting application supports both My Drives and shared drives.
//      */
//     supportsAllDrives?: boolean;
//     /**
//      * Deprecated use supportsAllDrives instead.
//      */
//     supportsTeamDrives?: boolean;
// }

// export interface Params$Resource$Files$List extends StandardParameters {
//     /**
//      * Groupings of files to which the query applies. Supported groupings are: 'user' (files created by, opened by, or shared directly with the user), 'drive' (files in the specified shared drive as indicated by the 'driveId'), 'domain' (files shared to the user's domain), and 'allDrives' (A combination of 'user' and 'drive' for all drives where the user is a member). When able, use 'user' or 'drive', instead of 'allDrives', for efficiency.
//      */
//     corpora?: string;
//     /**
//      * The source of files to list. Deprecated: use 'corpora' instead.
//      */
//     corpus?: string;
//     /**
//      * ID of the shared drive to search.
//      */
//     driveId?: string;
//     /**
//      * Whether both My Drive and shared drive items should be included in results.
//      */
//     includeItemsFromAllDrives?: boolean;
//     /**
//      * Specifies which additional view's permissions to include in the response. Only 'published' is supported.
//      */
//     includePermissionsForView?: string;
//     /**
//      * Deprecated use includeItemsFromAllDrives instead.
//      */
//     includeTeamDriveItems?: boolean;
//     /**
//      * A comma-separated list of sort keys. Valid keys are 'createdTime', 'folder', 'modifiedByMeTime', 'modifiedTime', 'name', 'name_natural', 'quotaBytesUsed', 'recency', 'sharedWithMeTime', 'starred', and 'viewedByMeTime'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedTime desc,name. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.
//      */
//     orderBy?: string;
//     /**
//      * The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached.
//      */
//     pageSize?: number;
//     /**
//      * The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
//      */
//     pageToken?: string;
//     /**
//      * A query for filtering the file results. See the "Search for Files" guide for supported syntax.
//      */
//     q?: string;
//     /**
//      * A comma-separated list of spaces to query within the corpus. Supported values are 'drive' and 'appDataFolder'.
//      */
//     spaces?: string;
//     /**
//      * Whether the requesting application supports both My Drives and shared drives.
//      */
//     supportsAllDrives?: boolean;
//     /**
//      * Deprecated use supportsAllDrives instead.
//      */
//     supportsTeamDrives?: boolean;
//     /**
//      * Deprecated use driveId instead.
//      */
//     teamDriveId?: string;
// }
