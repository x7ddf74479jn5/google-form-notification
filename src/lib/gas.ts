/* Spreadsheet */

let ssCache: GoogleAppsScript.Spreadsheet.Spreadsheet;

export const getSpreadsheet = () => {
  if (ssCache) return ssCache;
  ssCache = SpreadsheetApp.getActiveSpreadsheet();
  return ssCache;
};

let sheetCache: GoogleAppsScript.Spreadsheet.Sheet;

export const getActiveSheet = () => {
  if (sheetCache) return sheetCache;
  sheetCache = getSpreadsheet().getActiveSheet();
  if (!sheetCache) {
    throw new Error("スプレッドシートのシートが見つかりませんでした。");
  }
  return sheetCache;
};

export const getSheetData = (sheet: GoogleAppsScript.Spreadsheet.Sheet) => {
  const sheetData = sheet.getDataRange().getValues() as string[][];
  return sheetData;
};

/* Form */

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
  const form = getForm();
  const summaryUrl = form.shortenFormUrl(form.getSummaryUrl());
  const viewUrl = form.shortenFormUrl(form.getPublishedUrl());
  const editUrl = form.shortenFormUrl(form.getEditUrl());
  const formUrls = { summaryUrl, viewUrl, editUrl };
  return { ssUrl, formUrls };
};
