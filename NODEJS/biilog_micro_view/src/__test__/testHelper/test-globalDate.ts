/**
 * Fixa a data e hora do sistema para teste.
 * Realizar chamada no beforeAll(() => {});
 * Criar variável global : const realDate = Date.bind(global.Date);
 * E incluir no afterAll(() => {global.Date = realDate;});
 * @param YYYY
 * @param MM
 * @param DD
 * @param HH
 * @param mm
 * @param ss
 */

export const fixedGlobalDate = (
  YYYY: number,
  MM: number,
  DD: number,
  HH: number,
  mm: number,
  ss: number
) => {
  // https://github.com/facebook/jest/issues/2234#issuecomment-573621597
  const fixedDate = new Date(YYYY, MM, DD, HH, mm, ss);
  const d = Date;
  // This will only mock any Date objects instantiated with new
  // and not Date.now().
  const mockGlobal = global;
  // @ts-ignore
  mockGlobal.Date = jest.fn(() => fixedDate);
  mockGlobal.Date.parse = d.parse;
  mockGlobal.Date.UTC = d.UTC;
  mockGlobal.Date.now = d.now;
};
