"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_express = __toESM(require("express"));
var import_client = require("@prisma/client");

// src/convert-hours-string-to-minute.ts
function convertHoursStringToMinutes(hoursString) {
  const [hours, minutes] = hoursString.split(":").map(Number);
  const minuteAmount = hours * 60 + minutes;
  return minuteAmount;
}

// src/convert-minutes-amount-to-hours-string.ts
function convertMinutesAmountToHourString(minuteAmount) {
  const hour = Math.floor(minuteAmount / 60);
  const minute = minuteAmount % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

// src/server.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.use((0, import_cors.default)());
var prisma = new import_client.PrismaClient(
  {
    // serve para verificar as query, não é necessário ir para produção.
    log: ["query"]
  }
);
app.post("/games/:id/ads", (request, response) => __async(exports, null, function* () {
  const gameId = request.params.id;
  const body = request.body;
  const ad = yield prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hoursStart: convertHoursStringToMinutes(body.hoursStart),
      hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  });
  return response.status(201).json(ad);
}));
app.get("/games", (request, response) => __async(exports, null, function* () {
  const games = yield prisma.game.findMany(
    {
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    }
  );
  return response.json(games);
}));
app.get("/games/:id/ads", (request, response) => __async(exports, null, function* () {
  const gameId = request.params.id;
  const ads = yield prisma.ad.findMany(
    {
      select: {
        id: true,
        name: true,
        weekDays: true,
        hoursStart: true,
        hoursEnd: true,
        useVoiceChannel: true,
        yearsPlaying: true
      },
      where: { gameId },
      orderBy: { createdAt: "desc" }
    }
  );
  return response.json(ads.map(
    (ad) => {
      return __spreadProps(__spreadValues({}, ad), {
        weekDays: ad.weekDays.split(","),
        hoursStart: convertMinutesAmountToHourString(ad.hoursStart),
        hoursEnd: convertMinutesAmountToHourString(ad.hoursEnd)
      });
    }
  ));
}));
app.get("/ads/:id/discord", (request, response) => __async(exports, null, function* () {
  const adId = request.params.id;
  const discord = yield prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });
  return response.json(discord);
}));
app.listen(3333, () => {
  console.log("server running");
});
