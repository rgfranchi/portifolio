/**
 * Converte tipos para string: object, boolean, function, number, string, undefined
 * @param message
 */
export function parseAnyToString(message: any): string {
  switch (typeof message) {
    case "object":
      return JSON.stringify(message);
    case "boolean":
      return message.toString();
    case "function":
      return "Function:" + message.name;
    case "number":
      return message.toString();
    case "string":
      return message;
    case "undefined":
      return "Mensagem não definida";
    default:
      return "Falha ao processar mensagem";
  }
}

/**
 * Converte tipos para ARRAY de string: object, boolean, function, number, string, undefined
 * Utiliza parseAnyToString.
 * @param message
 */
export function parseAnyToArrayString(message: any): string[] {
  switch (typeof message) {
    case "object":
      return readAllObject(message);
    case "string":
      try {
        return readAllObject(JSON.parse(message));
      } catch (e) {
        return [parseAnyToString(message)];
      }
    default:
      return [parseAnyToString(message)];
  }
}

/**
 * Lê objeto e retorna um array de valores.
 * Verifica se é do tipo Array e valida cada valor RECURSIVAMENTE.
 * @param value
 */
function readAllObject(value: Object): string[] {
  let ret: string[] = [];
  if (Array.isArray(value)) {
    value.forEach((val) => {
      if (typeof val === "object") {
        parseAnyToArrayString(val).forEach((subVal) => ret.push(subVal));
      } else {
        ret.push(parseAnyToString(val));
      }
    });
  } else {
    if (value === null || value === undefined) {
      ret.push(parseAnyToString(value));
    } else {
      Object.entries(value).forEach(([key, val]) => {
        if (typeof val === "object") {
          readAllObject(val).forEach((subVal) => ret.push(subVal));
        } else {
          ret.push(key + ":" + parseAnyToString(val));
        }
      });
    }
  }
  return ret;
}

/**
 * Realiza conversão da data para o formato YYYY-MM-DD HH:MM:SS.mmmm
 * @param time boolean exibi ou não a informção de hora.
 */
export function dateTimeNowToString(time: boolean = true): string {
  var dateNow = new Date();
  return time ? dateNow.toISOString() : dateNow.toISOString().split("T")[0];
  // var timeNow = time
  //   ? " " +
  //     ("0" + dateNow.getHours()).slice(-2) +
  //     ":" +
  //     ("0" + dateNow.getMinutes()).slice(-2) +
  //     ":" +
  //     ("0" + dateNow.getSeconds()).slice(-2) +
  //     "." +
  //     ("0" + dateNow.getMilliseconds()).slice(-3)
  //   : "";
  // return (
  //   dateNow.getFullYear() +
  //   "-" +
  //   ("0" + (dateNow.getMonth() + 1)).slice(-2) +
  //   "-" +
  //   ("0" + dateNow.getDate()).slice(-2) +
  //   timeNow
  // );
}
