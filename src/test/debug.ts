import type { Send } from "@/core/notifier";
import { sendMail, sendSlack } from "@/core/notifier";

export const debugMail = () => {
  debugSend(sendMail);
};

export const debugSlack = () => {
  debugSend(sendSlack);
};

const debugSend = (debug: Send) => {
  const body = "This is a test message from google-form-notifier";
  debug(body);
};
