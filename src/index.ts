import dotenv from "dotenv";
const envFile = !process.env.NODE_ENV ? ".env" : process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

import cron from "node-cron";
import dayjs from "dayjs";
import { withLogging } from "./utils/withLogging";
import jobs from "./jobs";

// override logger
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
console.log = (...args: unknown[]) => {
  originalLog(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}]`, ...args);
};
console.warn = (...args: unknown[]) => {
  originalWarn(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}]`, ...args);
};
console.error = (...args: unknown[]) => {
  originalError(`[${dayjs().format("YYYY-MM-DD HH:mm:ss")}]`, ...args);
};

// schedules
cron.schedule("0 0 * * *", withLogging("resetWritingStreak", jobs.resetWritingStreak));
cron.schedule("0 11 * * 0", withLogging("sendMailOnSunday", jobs.sendMailOnSunday));
