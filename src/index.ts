import cron from "node-cron";
import memberDao from "./dao/member.dao";
import productHistoryDao from "./dao/productHistory.dao";
import dayjs from "dayjs";

console.log("running");

cron.schedule("* * * * *", async () => {
  try {
    const memberIds = await memberDao.getAllIds();
    for (const memberId of memberIds) {
      const updatedAts = (await productHistoryDao.getUpdatedAtByMemberId(memberId)).map((date) => dayjs(date));
      console.log(updatedAts);
    }
  } catch (error) {
    console.error(error);
  }
});
