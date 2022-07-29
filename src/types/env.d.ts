export {};

declare global {
  const process: {
    env: {
      [key: string]: string;
      // Define type for custom environmental variables here:
      // NODE_ENV: "development" | "production";
      MAILING_LIST: string;
      SLACK_WEBHOOK_URL: string;
      MAIL_TITLE: string;
      SEND_BY: string;
    };
  };
}
