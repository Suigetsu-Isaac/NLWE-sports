"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/convert-minutes-amount-to-hours-string.ts
var convert_minutes_amount_to_hours_string_exports = {};
__export(convert_minutes_amount_to_hours_string_exports, {
  convertMinutesAmountToHourString: () => convertMinutesAmountToHourString
});
module.exports = __toCommonJS(convert_minutes_amount_to_hours_string_exports);
function convertMinutesAmountToHourString(minuteAmount) {
  const hour = Math.floor(minuteAmount / 60);
  const minute = minuteAmount % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertMinutesAmountToHourString
});
