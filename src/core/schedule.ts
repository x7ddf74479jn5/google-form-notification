import { sendMail, sendSlack } from "@/core/notifier";
import type { Urls } from "@/utils/url";
import { getUrls } from "@/utils/url";

export const onScheduleToMail = () => {
  onSchedule(sendMail);
};

export const onScheduleToSlack = () => {
  onSchedule(sendSlack);
};

const onSchedule = (notify: (body: string) => void) => {
  const urls = getUrls();
  const sheet = SpreadsheetApp.getActiveSheet();
  if (!sheet)
    throw new Error("スプレッドシートのシートが見つかりませんでした。");
  const sheetData = sheet.getDataRange().getValues() as string[][];
  const header = sheetData[0];

  const today = Utilities.formatDate(new Date(), "Asia/Tokyo", "MM/dd");

  const count = sheetData.filter((data) => {
    return (
      data[header.indexOf("タイムスタンプ")] !== "" &&
      Utilities.formatDate(
        new Date(data[header.indexOf("タイムスタンプ")]),
        "Asia/Tokyo",
        "MM/dd"
      ) === today
    );
  }).length;

  if (count === 0) return;

  const body = createBody({ count, today, urls });

  notify(body);
};

const createBody = ({
  count,
  today,
  urls,
}: {
  count: number;
  today: string;
  urls: Urls;
}) => {
  const {
    ssUrl,
    formUrls: { editUrl, summaryUrl },
  } = urls;

  const body = `
${today}の申請数は${count}です。

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
