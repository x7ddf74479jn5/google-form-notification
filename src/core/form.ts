import { sendMail, sendSlack } from "@/core/notifier";
import type { Urls } from "@/lib/gas";
import { getUrls } from "@/lib/gas";

/**
 * @see https://developers.google.com/apps-script/guides/triggers/events#form-submit
 */
type Event = {
  namedValues: Record<string, string[]>;
};

export const onFormSubmitToSlack = (e: Event) => {
  onFormSubmit(e.namedValues, sendSlack);
};

export const onFormSubmitToMail = (e: Event) => {
  onFormSubmit(e.namedValues, sendMail);
};

const onFormSubmit = (
  values: Event["namedValues"],
  notifier: (body: string) => void
) => {
  const urls = getUrls();
  const timestamp = new Date();
  const body = createBody({ timestamp, values, urls });

  notifier(body);
};

const createBody = ({
  values,
  timestamp,
  urls,
}: {
  values: Event["namedValues"];
  timestamp: GoogleAppsScript.Base.Date;
  urls: Urls;
}) => {
  const {
    ssUrl,
    formUrls: { editUrl, summaryUrl },
  } = urls;

  const QAndAs = Object.entries(values)
    .map(([q, a]) => {
      return `${q}: ${a.join(",")}`;
    })
    .join("\n");

  const formattedTimeStamp = Utilities.formatDate(
    timestamp,
    "Asia/Tokyo",
    "yyyy/MM/dd HH:mm:ss"
  );

  const body = `
Googleフォームに申請がありました。

----------------------------------------
# 申請日
${formattedTimeStamp}

# 回答内容
${QAndAs}

----------------------------------------
# Form Summary URL
${summaryUrl}

# Form Edit URL
${editUrl}

# Spread Sheet URL
${ssUrl}
`;

  return body;
};

export const onFormSubmitHandlerName = {
  onFormSubmitToMail: onFormSubmitToMail.name,
  onFormSubmitToSlack: onFormSubmitToSlack.name,
};
