/* Spreadsheet */

let ssCache: GoogleAppsScript.Spreadsheet.Spreadsheet;

export const getSpreadsheet = () => {
  if (!ssCache) {
    ssCache = SpreadsheetApp.getActiveSpreadsheet();
  }

  return ssCache;
};

/* SpreadSheet */

let formCache: GoogleAppsScript.Forms.Form;

export const getFormByUrl = (url: string) => {
  if (!formCache) {
    formCache = FormApp.openByUrl(url);
  }

  return formCache;
};

/* Util */

export type Urls = {
  ssUrl: string;
  formUrls: {
    summaryUrl: string;
    editUrl: string;
    viewUrl: string;
  };
};

export const getUrls = (): Urls => {
  const ss = getSpreadsheet();
  const ssUrl = ss.getUrl();
  const _formUrl = ss.getActiveSheet().getFormUrl();
  if (!_formUrl)
    throw new Error("紐付けられたフォームが見つかりませんでした。");
  const form = getFormByUrl(_formUrl);
  const summaryUrl = form.shortenFormUrl(form.getSummaryUrl());
  const viewUrl = form.shortenFormUrl(form.getPublishedUrl());
  const editUrl = form.shortenFormUrl(form.getEditUrl());
  const formUrls = { summaryUrl, viewUrl, editUrl };
  return { ssUrl, formUrls };
};

import { privateConfig } from "config";

import type { PrivateConfig } from "@/types";
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
    return data as RemoveIndexSignature<PrivateConfig>;
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
): data is PrivateConfig => {
  return Object.entries(data).every(([k, v]) => {
    Object.keys(privateConfig).includes(k) && v !== "";
  });
};
