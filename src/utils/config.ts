import { generalConfig, organizationConfig } from "config";

import { getProperties } from "@/lib/property";
import type { GeneralConfig, OrganizationConfig } from "@/types";

import { getEnv, getGlobalVars } from "./env";

let cache: GeneralConfig | undefined;

export const getConfig = () => {
  if (cache) return cache;
  const finalConfig = mergeConfigs();
  cache = finalConfig;
  return finalConfig;
};

const mergeConfigs = (): GeneralConfig => {
  const organizationConfig = getOrganizationConfig(generalConfig.property);
  const finalMailConfig = {
    MAILING_LIST:
      organizationConfig.MAILING_LIST ?? generalConfig.mail.MAILING_LIST,
    MAIL_TITLE: organizationConfig.MAIL_TITLE ?? generalConfig.mail.MAIL_TITLE,
    SEND_BY: organizationConfig.SEND_BY ?? generalConfig.mail.SEND_BY,
  };
  const finalSlackConfig = {
    SLACK_WEBHOOK_URL:
      organizationConfig.SLACK_WEBHOOK_URL ??
      generalConfig.slack.SLACK_WEBHOOK_URL,
  };
  return { ...generalConfig, mail: finalMailConfig, slack: finalSlackConfig };
};

const getOrganizationConfig = (
  mode: GeneralConfig["property"]
): OrganizationConfig => {
  switch (mode) {
    case "env": {
      return getEnv();
    }
    case "propertyService": {
      return getProperties();
    }
    case "global": {
      return getGlobalVars();
    }
    default: {
      return organizationConfig;
    }
  }
};
