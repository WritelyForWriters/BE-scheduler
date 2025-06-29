import dotenv from "dotenv";
dotenv.config();

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
cron.schedule("* * * * *", async () => {
  console.log("task 'reset writing streak' started.");
  try {
    const memberIds = await memberDao.getAllIds();
    for (const memberId of memberIds) {
      const wasModifiedYesterday = !!(await productHistoryDao.getOne({ memberId, date: dayjs().subtract(-1, "day") }));
      if (!wasModifiedYesterday) {
        amplitude.setWritingStreak(memberId, 0);
      }
    }
  } catch (error) {
    console.error(error);
  }
});
