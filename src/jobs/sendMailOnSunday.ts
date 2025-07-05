import mail from "../core/mail";
import memberDao from "../dao/member.dao";

export const sendMailOnSunday = async () => {
  const members = await memberDao.getAll();
  for (const member of members) {
    try {
      await mail.send({
        receivers: [member.email],
        subject: `${member.nickname}님, 평화로운 주말에는 미뤄뒀던 글쓰기 어떠세요?`,
        html: `작가님, 이번 일주일도 고생하셨어요.
        <br>일요일은 일상에서 잠시 벗어나 생각을 정리하고 이야기를 한 걸음 더 발전시키기에 좋은 날입니다.
        <br>많은 작가들이 말합니다. <b>주 1회라도 정기적으로 쓰는 습관이 가장 중요하다”고요.</b>
        <br>모처럼 찾아온 쉬는 시간을 소중한 작품에 투자해보세요.
        <br>혹시 몰라요 - 시간이 충분한 오늘, 충분한 영감이 찾아올지! 
        <br>👉 <a href=${process.env.SERVICE_URL}>[700자 집필 시작하기]</a>
        `.trim(),
      });
      console.log(`mail sent to ${member.email}`);
    } catch (err) {
      console.error(err);
    }
  }
};
