import dayjs from "dayjs";
import * as amplitude from "../core/amplitude";
import * as memberDao from "../dao/member.dao";
import productHistoryDao from "../dao/productHistory.dao";

export default async () => {
  const memberIds = await memberDao.getMemberIds();
  for (const memberId of memberIds) {
    const wasModifiedYesterday = !!(await productHistoryDao.getOne({ memberId, date: dayjs().subtract(-1, "day") }));
    if (!wasModifiedYesterday) {
      console.log(`[${memberId}] set streak to 0`);
      amplitude.setWritingStreak(memberId, 0);
    }
  }
};
