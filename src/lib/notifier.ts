import { getForm } from "@/lib/form";
import { getConfig } from "@/utils/config";

export const sendMail = (body: string) => {
  const {
    mail: { MAILING_LIST, MAIL_TITLE, SEND_BY },
  } = getConfig();
  const title = getForm().getTitle();
  const subject = MAIL_TITLE ? MAIL_TITLE : `Googleフォーム申請: ${title}`;
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
