import { onFormSubmitToMail, onFormSubmitToSlack } from "@/core/form";
import { onScheduleToMail, onScheduleToSlack } from "@/core/schedule";
import { resetTriggers, setTriggers } from "@/core/trigger";
import { debugMail, debugSlack } from "@/test/debug";

const greeting = () => {
  Logger.log("Hello World");
};

// @ts-expect-error
(global as any).greeting = greeting;

const main = () => {
  resetTriggers();
  setTriggers();
};

// @ts-expect-error
(global as any).main = main;
// @ts-expect-error
(global as any).onFormSubmitToMail = onFormSubmitToMail;
// @ts-expect-error
(global as any).onFormSubmitToSlack = onFormSubmitToSlack;
// @ts-expect-error
(global as any).onScheduleToMail = onScheduleToMail;
// @ts-expect-error
(global as any).onScheduleToSlack = onScheduleToSlack;
// @ts-expect-error
(global as any).debugMail = debugMail;
// @ts-expect-error
(global as any).debugSlack = debugSlack;
// @ts-expect-error
(global as any).resetTriggers = resetTriggers;
