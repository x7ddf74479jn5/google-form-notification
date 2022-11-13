import { getSpreadsheet } from "./sheet";

let formCache: GoogleAppsScript.Forms.Form;

export const getFormByUrl = (url: string) => {
  if (formCache) {
    return formCache;
  }

  formCache = FormApp.openByUrl(url);

  return formCache;
};

export const getForm = () => {
  if (formCache) {
    return formCache;
  }

  const ss = getSpreadsheet();
  const _formUrl = ss.getActiveSheet().getFormUrl();

  if (!_formUrl) {
    throw new Error("紐付けられたフォームが見つかりませんでした。");
  }

  const form = getFormByUrl(_formUrl);

  return form;
};
