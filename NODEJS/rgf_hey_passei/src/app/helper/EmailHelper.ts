import emailjs from "@emailjs/browser";

// const timeout = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };
/**
 * Ferramenta servidora: https://www.emailjs.com/
 * rgfranchi@gmail.com
 *
 * @param email
 * @param text
 */
export const sendEmail = async (
  email: string,
  text: string,
  from_name: string,
  to_name: string
) => {
  console.log("E-Mail START:" + email);
  const form = {
    from_name: from_name,
    to_name: to_name,
    message: text,
    send_to: email,
  };
  let rest = "";
  await emailjs
    .send("service_ywzss6z", "template_gdspy67", form, "bpgOnI14ZoavWyMAO")
    .then(
      (result) => {
        console.log(result.text);
        rest = result.text;
      },
      (error) => {
        console.log(error.text);
        rest = error.text;
      }
    );
  // await timeout(1500);
  console.log("E-Mail RESPONSE:" + text);
};
