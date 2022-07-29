import { organizationConfig } from "config";

import type { OrganizationConfig } from "@/types";
import type { RemoveIndexSignature } from "@/types/utils";

export const getProperties = () => {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const data = scriptProperties.getProperties();
    for (const key in data) {
      Logger.log("Key: %s, Value: %s", key, data[key]);
    }
    if (!validateProperties(data)) {
      throw new Error("PropertyValidationError");
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

const validateProperties = (
  data: Record<string, unknown>
): data is OrganizationConfig => {
  return Object.entries(data).every(([k, v]) => {
    Object.keys(organizationConfig).includes(k) && v !== "";
  });
};
