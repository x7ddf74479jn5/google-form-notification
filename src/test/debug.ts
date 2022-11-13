import { sendMail, sendSlack } from "@/lib/notifier";

export const debugMail = () => {
  debugSend(sendMail);
};

export const debugSlack = () => {
  debugSend(sendSlack);
};

const debugSend = (debug: (body: string) => void) => {
  const body = "This is a test message from google-form-notifier";
  debug(body);
};

export const greeting = () => {
  Logger.log("Hello World");
};
