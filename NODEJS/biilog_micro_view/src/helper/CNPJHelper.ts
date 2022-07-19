import { StringSchema, string } from "yup";

/**
 * Mascara para ser utilizada com o react-text-mask
 * Identifica posições do CNPJ
 */
export const CNPJMask = [
  /[0-9]/,
  /[0-9]/,
  ".",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  ".",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "/",
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  "-",
  /[0-9]/,
  /[0-9]/,
];

/**
 * Formula de validção do CNPJ
 * https://www.geradorcnpj.com/javascript-validar-cnpj.htm
 * @param cnpj
 * @returns boolean
 */
export const CNPJValidate = (cnpj: any): boolean => {
  if (cnpj === "" || cnpj === undefined) return false;
  cnpj = cnpj.replace(/[^0-9]/g, "");

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  ) {
    return false;
  }
  // Valida DVs
  let tamanho: number = cnpj.length - 2;
  let numeros: any = cnpj.substring(0, tamanho);
  const digitos: string = cnpj.substring(tamanho);
  let soma: number = 0;
  let pos: number = tamanho - 7;
  for (let i: number = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado: number = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== Number(digitos.charAt(0))) {
    return false;
  }
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i: number = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(1))) {
    return false;
  }
  return true;
};
/**
 * Variavel de validação do CNPJ utilizando YUP
 *
 */
export const CNPJSchema: StringSchema = string()
  .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Formato do CNPJ inválido")
  .test("is-cnpj", "Valor do CNPJ inválido", (value) => CNPJValidate(value));
