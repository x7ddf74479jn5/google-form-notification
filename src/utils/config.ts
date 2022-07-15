import { generalConfig, privateConfig } from "config";

import type { GeneralConfig, PrivateConfig } from "@/types";

import { getEnv } from "./env";
import { getProperties } from "./property";

let cache: GeneralConfig | undefined;

export const getConfig = () => {
  if (cache) return cache;
  const finalConfig = mergeConfigs();
  cache = finalConfig;
  return finalConfig;
};

const mergeConfigs = (): GeneralConfig => {
  const privateConfig = getPrivateConfig(generalConfig.property);
  const finalMailConfig = {
    ...generalConfig.mail,
    MAILING_LIST: privateConfig.MAILING_LIST,
  };
  const finalSlackConfig = {
    ...generalConfig.slack,
    SLACK_WEBHOOK_URL: privateConfig.SLACK_WEBHOOK_URL,
  };
  return { ...generalConfig, mail: finalMailConfig, slack: finalSlackConfig };
};

const getPrivateConfig = (mode: GeneralConfig["property"]): PrivateConfig => {
  switch (mode) {
    case "env": {
      return getEnv();
    }
    case "propertyService": {
      return getProperties();
    }
    default: {
      return privateConfig;
    }
  }
};
