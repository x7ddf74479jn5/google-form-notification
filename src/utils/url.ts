export type Urls = {
  ssUrl: string;
  formUrls: {
    summaryUrl: string;
    editUrl: string;
    viewUrl: string;
  };
};

export const getUrls = (): Urls => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ssUrl = ss.getUrl();
  const _formUrl = ss.getActiveSheet().getFormUrl();
  if (!_formUrl)
    throw new Error("紐付けられたフォームが見つかりませんでした。");
  const form = FormApp.openByUrl(_formUrl);
  const summaryUrl = form.shortenFormUrl(form.getSummaryUrl());
  const viewUrl = form.shortenFormUrl(form.getPublishedUrl());
  const editUrl = form.shortenFormUrl(form.getEditUrl());
  const formUrls = { summaryUrl, viewUrl, editUrl };
  return { ssUrl, formUrls };
};
