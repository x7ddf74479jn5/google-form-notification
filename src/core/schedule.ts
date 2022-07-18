import { sendMail, sendSlack } from "@/core/notifier";
import type { Urls } from "@/lib/gas";
import { getActiveSheet, getSheetData } from "@/lib/gas";
import { getForm } from "@/lib/gas";
import { getUrls } from "@/lib/gas";

export const onScheduleToMail = () => {
  onSchedule(sendMail);
};

export const onScheduleToSlack = () => {
  onSchedule(sendSlack);
};

const onSchedule = (notify: (body: string) => void) => {
  const sheet = getActiveSheet();
  const sheetData = getSheetData(sheet);
  const yesterday = getYesterday();
  const count = getYesterdayDataCount(sheetData, yesterday);

  if (count === 0) return;

  const urls = getUrls();
  const title = getForm().getTitle();
  const body = createBody({ title, count, yesterday, urls });

  notify(body);
};

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const yesterday = Utilities.formatDate(date, "Asia/Tokyo", "MM/dd");
  return yesterday;
};

const getYesterdayDataCount = (sheetData: string[][], yesterday: string) => {
  const header = sheetData[0];

  const count = sheetData.filter((data) => {
    return (
      data[header.indexOf("タイムスタンプ")] !== "" &&
      Utilities.formatDate(
        new Date(data[header.indexOf("タイムスタンプ")]),
        "Asia/Tokyo",
        "MM/dd"
      ) === yesterday
    );
  }).length;

  return count;
};

const createBody = ({
  title,
  count,
  yesterday,
  urls,
}: {
  title: string;
  count: number;
  yesterday: string;
  urls: Urls;
}) => {
  const {
    ssUrl,
    formUrls: { editUrl, summaryUrl },
  } = urls;

  const body = `
${title}

${yesterday}の申請数は${count}です。

# Form Summary URL
${summaryUrl}

# Form Edit URL
${editUrl}

# Spread Sheet URL
${ssUrl}
`;

  return body;
};

export const onScheduleHandlerName = {
  onScheduleToMail: onScheduleToMail.name,
  onScheduleToSlack: onScheduleToSlack.name,
};
