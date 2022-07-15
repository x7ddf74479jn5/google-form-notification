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
