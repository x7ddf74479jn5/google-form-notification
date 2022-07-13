import { getConfig } from "@/utils/config";

export type Send = (body: string) => void;

export const sendMail = (body: string) => {
  const {
    mail: { MAILING_LIST, MAIL_TITLE, SEND_BY },
  } = getConfig();
  const subject = MAIL_TITLE ? MAIL_TITLE : "Googleフォーム申請";
  const recipient = Array.isArray(MAILING_LIST)
    ? MAILING_LIST.join(",")
    : MAILING_LIST;

  const draft = GmailApp.createDraft(recipient, subject, body, {
    name: SEND_BY ? SEND_BY : "Google Form Notification",
  });

  draft.send();
};

export const sendSlack = (body: string) => {
  const {
    slack: { SLACK_WEBHOOK_URL },
  } = getConfig();

  const jsonData = { text: body };
  const payload = JSON.stringify(jsonData);

  const response = UrlFetchApp.fetch(SLACK_WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload,
  });

  if (response.getResponseCode() !== 200) {
    Logger.log(response.getContentText());
  }
};
