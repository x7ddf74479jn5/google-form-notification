import { getForm } from "./form";
import { getSpreadsheet } from "./sheet";

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
