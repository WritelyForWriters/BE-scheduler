import dotenv from "dotenv";
const envFile = !process.env.NODE_ENV ? ".env" : process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

import cron from "node-cron";
import memberDao from "./dao/member.dao";
import productHistoryDao from "./dao/productHistory.dao";
import dayjs from "dayjs";
import amplitude from "./core/amplitude";

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

// business logics
cron.schedule("0 0 * * *", async () => {
  console.log("task 'reset writing streak' started.");
  try {
    const memberIds = await memberDao.getAllIds();
    for (const memberId of memberIds) {
      const wasModifiedYesterday = !!(await productHistoryDao.getOne({ memberId, date: dayjs().subtract(-1, "day") }));
      if (!wasModifiedYesterday) {
        console.log(`target member: ${memberId}`);
        amplitude.setWritingStreak(memberId, 0);
      }
    }
  } catch (error) {
    console.error(error);
  }
});
