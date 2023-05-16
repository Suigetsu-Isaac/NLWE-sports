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

// src/convert-hours-string-to-minute.ts
var convert_hours_string_to_minute_exports = {};
__export(convert_hours_string_to_minute_exports, {
  convertHoursStringToMinutes: () => convertHoursStringToMinutes
});
module.exports = __toCommonJS(convert_hours_string_to_minute_exports);
function convertHoursStringToMinutes(hoursString) {
  const [hours, minutes] = hoursString.split(":").map(Number);
  const minuteAmount = hours * 60 + minutes;
  return minuteAmount;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  convertHoursStringToMinutes
});
