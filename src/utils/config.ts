import { generalConfig, organizationConfig } from "config";

import type { GeneralConfig, OrganizationConfig } from "@/types";

import { getEnv, getGlobalVars } from "./env";
import { getProperties } from "./property";

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
    ...generalConfig.mail,
    MAILING_LIST: organizationConfig.MAILING_LIST,
  };
  const finalSlackConfig = {
    ...generalConfig.slack,
    SLACK_WEBHOOK_URL: organizationConfig.SLACK_WEBHOOK_URL,
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
