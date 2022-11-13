import { Form, Hook, Schedule, Trigger } from "./core";
import { Debug } from "./test";

const main = () => {
  Trigger.resetTriggers();
  Trigger.setTriggers();
};

// @ts-expect-error
global.main = main;
// @ts-expect-error
global.onOpen = Hook.onOpen;
// @ts-expect-error
global.openSettings = Hook.openSettings;
// @ts-expect-error
global.onFormSubmitToMail = Form.onFormSubmitToMail;
// @ts-expect-error
global.onFormSubmitToSlack = Form.onFormSubmitToSlack;
// @ts-expect-error
global.onScheduleToMail = Schedule.onScheduleToMail;
// @ts-expect-error
global.onScheduleToSlack = Schedule.onScheduleToSlack;
// @ts-expect-error
global.debugMail = Debug.debugMail;
// @ts-expect-error
global.debugSlack = Debug.debugSlack;
// @ts-expect-error
global.greeting = Debug.greeting;
// @ts-expect-error
global.resetTriggers = Trigger.resetTriggers;
