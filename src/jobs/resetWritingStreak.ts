import dayjs from "dayjs";
import amplitude from "../core/amplitude";
import memberDao from "../dao/member.dao";
import productHistoryDao from "../dao/productHistory.dao";

export const resetWritingStreak = async () => {
  const memberIds = await memberDao.getAllIds();
  for (const memberId of memberIds) {
    const wasModifiedYesterday = !!(await productHistoryDao.getOne({ memberId, date: dayjs().subtract(-1, "day") }));
    if (!wasModifiedYesterday) {
      console.log(`[${memberId}] set streak to 0`);
      amplitude.setWritingStreak(memberId, 0);
    }
  }
};
