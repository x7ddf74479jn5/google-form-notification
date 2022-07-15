export const getEnv = () => {
  return {
    MAILING_LIST: process.env.MAILING_LIST,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  };
};
