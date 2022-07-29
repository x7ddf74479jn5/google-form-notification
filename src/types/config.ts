export type GeneralConfig = {
  property?: "default" | "env" | "propertyService" | "global" | undefined;
  mail: {
    MAILING_LIST: OrganizationConfig["MAILING_LIST"];
    MAIL_TITLE: string;
    SEND_BY: string;
  };
  slack: {
    SLACK_WEBHOOK_URL: OrganizationConfig["SLACK_WEBHOOK_URL"];
  };
  triggers?: TriggerConfig[] | undefined;
};

export type OrganizationConfig = {
  MAILING_LIST: string | string[];
  MAIL_TITLE?: string;
  SEND_BY?: string;
  SLACK_WEBHOOK_URL: string;
};

type EventType = { CLOCK: "CLOCK"; ON_FORM_SUBMIT: "ON_FORM_SUBMIT" };

export type TimeBasedEvent = {
  eventType: EventType["CLOCK"];
  atHour: number;
  nearMinute?: Minute;
  frequency?: {
    type: "everyDays";
    interval: 1;
  };
};

export type OnFormSubmitEvent = {
  eventType: EventType["ON_FORM_SUBMIT"];
};

type Notifier = "mail" | "slack";

type TriggerConfig = {
  notifiers: Notifier[];
  event: EventConfig;
};

type Minute = 1 | 5 | 10 | 15 | 30;

type Frequency =
  | {
      type: "everyMinutes";
      interval: Minute;
    }
  | {
      type: "everyHours" | "everyDays";
      interval: number;
    };

export type EventConfig = TimeBasedEvent | OnFormSubmitEvent;
// | {
//     eventType: EventType["CLOCK"];
//     frequency: Frequency;
//   }
// | {
//     eventType: EventType["CLOCK"];
//     atDate: [number, number, number]; // year, month, day
//   }
