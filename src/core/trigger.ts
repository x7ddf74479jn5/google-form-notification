/**
 * @see https://developers.google.com/apps-script/reference/script/clock-trigger-builder
 * @see https://developers.google.com/apps-script/reference/script/form-trigger-builder
 */

import { generalConfig } from "config";

import { onFormSubmitHandlerName } from "@/core/form";
import { onScheduleHandlerName } from "@/core/schedule";
import { getSpreadsheet } from "@/gas";
import type { TimeBasedEvent } from "@/types";

const setOnFormSubmitTrigger = (fn: string) => {
  const sheet = getSpreadsheet();
  ScriptApp.newTrigger(fn).forSpreadsheet(sheet).onFormSubmit().create();
};

const setTimeBasedTrigger = (fn: string, event: TimeBasedEvent) => {
  const { atHour, nearMinute = 0, frequency } = event;
  ScriptApp.newTrigger(fn)
    .timeBased()
    .atHour(atHour)
    .nearMinute(nearMinute)
    .everyDays(frequency?.interval || 1) // Frequency is required if you are using atHour() or nearMinute()
    .create();
};

export const resetTriggers = () => {
  const triggers = ScriptApp.getProjectTriggers();
  if (triggers.length === 0) return;
  for (let i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
};

export const setTriggers = () => {
  const triggers = generalConfig.triggers;
  if (triggers?.length === 0) return;
  triggers?.forEach((trigger) => {
    if (trigger.notifiers.length === 0) {
      Logger.log("configの設定が間違っています");
      throw new Error("No notifier in config");
    }
    if (trigger.event.eventType === "ON_FORM_SUBMIT") {
      if (trigger.notifiers.includes("mail")) {
        setOnFormSubmitTrigger(onFormSubmitHandlerName.onFormSubmitToMail);
      }
      if (trigger.notifiers.includes("slack")) {
        setOnFormSubmitTrigger(onFormSubmitHandlerName.onFormSubmitToSlack);
      }
    }
    if (trigger.event.eventType === "CLOCK") {
      if (trigger.notifiers.includes("mail")) {
        setTimeBasedTrigger(
          onScheduleHandlerName.onScheduleToMail,
          trigger.event
        );
      }
      if (trigger.notifiers.includes("slack")) {
        setTimeBasedTrigger(
          onScheduleHandlerName.onScheduleToSlack,
          trigger.event
        );
      }
    }
  });
};
