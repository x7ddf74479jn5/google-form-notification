import type { OrganizationConfig } from "@/types";
import type { RemoveIndexSignature } from "@/types/utils";

export const getProperties = () => {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const data = scriptProperties.getProperties();
    for (const key in data) {
      Logger.log("Key: %s, Value: %s", key, data[key]);
    }

    return data as RemoveIndexSignature<OrganizationConfig>;
  } catch (err) {
    if (err instanceof Error) {
      Logger.log("Failed with error %s", err.message);
      Logger.log("環境変数の設定が間違っています");
      throw err;
    }
  }
  throw new Error("環境変数の設定が間違っています");
};

export function openSettings() {
  const template = HtmlService.createTemplateFromFile("settings");
  template.settings = getProperties();
  const html = template.evaluate().setWidth(500).setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, "Settings");
}

export function saveProperties(
  formObj: Record<Lowercase<keyof OrganizationConfig>, string>
) {
  const userProperties = PropertiesService.getUserProperties();
  const { mailing_list, send_by, mail_title, slack_webhook_url } = formObj;
  userProperties.setProperties({
    SLACK_WEBHOOK_URL: slack_webhook_url,
    MAILING_LIST: mailing_list,
    SEND_BY: send_by,
    MAIL_TITLE: mail_title,
  });
}

export function registerMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🎈 Menu").addItem("Settings", "openSettings").addToUi();
}
