export const getEnv = () => {
  return {
    MAILING_LIST: process.env.MAILING_LIST,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
    MAIL_TITLE: process.env.MAIL_TITLE,
    SEND_BY: process.env.SEND_BY,
  };
};

export const getGlobalVars = () => {
  return {
    // @ts-expect-error Global variables expected to be defined in a remote gs file
    MAILING_LIST: MAILING_LIST,
    // @ts-expect-error
    SLACK_WEBHOOK_URL: SLACK_WEBHOOK_URL,
    // @ts-expect-error
    MAIL_TITLE: MAIL_TITLE,
    // @ts-expect-error
    SEND_BY: SEND_BY,
  };
};
