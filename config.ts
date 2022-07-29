/**
 * @see https://github.com/x7ddf74479jn5/google-form-notification/docs/config.md
 */

import type { GeneralConfig, OrganizationConfig } from "@/types";

export const organizationConfig: OrganizationConfig = {
  MAILING_LIST: [],
  MAIL_TITLE: "",
  SEND_BY: "",
  SLACK_WEBHOOK_URL: "",
};

export const generalConfig: GeneralConfig = {
  property: "env",
  mail: {
    MAILING_LIST: "",
    MAIL_TITLE: "",
    SEND_BY: "",
  },
  slack: {
    SLACK_WEBHOOK_URL: "",
  },
  triggers: [
    {
      notifiers: ["slack"],
      event: {
        eventType: "ON_FORM_SUBMIT",
      },
    },
    {
      notifiers: ["mail"],
      event: {
        eventType: "CLOCK",
        atHour: 10,
      },
    },
  ],
};
