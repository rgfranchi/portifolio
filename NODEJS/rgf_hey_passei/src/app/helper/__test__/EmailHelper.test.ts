import { sendEmail } from "../EmailHelper";

/**
 * @todo: como implementar setImmediate no teste.
 * https://jestjs.io/pt-BR/docs/jest-object#mock-timers
 * https://jestjs.io/pt-BR/docs/timer-mocks#executar-todos-os-temporizadores
 */
describe("Email de teste", () => {
  // jest.useFakeTimers("modern");
  // jest.spyOn(global, "setImmediate");
  test("Encaminhar e-mail", async () => {
    // comentado para economizar e-mail
    // await sendEmail(
    //   "rgfranchi@hotmail.com",
    //   "novo p@$$W00&",
    //   "Professor Girafales",
    //   "Chaves"
    // );
  });
});
