import * as memberDao from "../dao/member.dao";
import * as mail from "../core/mail";

export default async () => {
  // 2일 경과
  const members2dayInactivated = await memberDao.getMembersWithoutWorks({ shouldMarketingAgreed: true, lastActiveBeforeDays: 2 });
  for (const { email, nickname } of members2dayInactivated) {
    try {
      await mail.send({
        receivers: [email],
        subject: `${nickname} 님, 작품 시작은 어렵지만 잠깐의 글쓰기는 쉬워요. ✍️`,
        html: `안녕하세요, 작가님! 아직 첫 작품을 시작하지 않으신 것 같아요.
        <br>본격적인 작품 아이디어가 생각나지 않는다면, 일단 아무 글이나 써보시는 것은 어떠세요?
        <br><b>매일 잠깐이나마</b> ‘자유 쓰기’를 실천하면, 일상 속 작은 아이디어에서 멋진 작품을 발굴할 수도 있어요.
        <br>까짓것 10분만, 아무 글이나 써볼까요?
        <br>👉 <a href=${process.env.SERVICE_URL}>[지금 10분 자유 쓰기 시작하기]</a>
        <br>
        <br>광고 메일을 수신하고 싶지 않을 시, ‘동의 철회’라고 답장해주시면 마케팅 메시지 수신 동의가 철회됩니다.
        `.trim(),
      });
      console.log(`mail sent to ${email}`);
    } catch (err) {
      console.error(err);
    }
  }
  // 4일 경과
  const members4dayInactivated = await memberDao.getMembersWithoutWorks({ shouldMarketingAgreed: true, lastActiveBeforeDays: 4 });
  for (const { email, nickname } of members4dayInactivated) {
    try {
      await mail.send({
        receivers: [email],
        subject: `${nickname} 님, 요즘도 글 쓰고 계신가요?`,
        html: `안녕하세요, 작가님! 가입하신 지 벌써 4일이 되었어요.
        <br>아직 첫 문장이 망설여지시나요?
        <br>처음부터 멋진 이야기를 써야 한다는 부담은 잠시 내려두셔도 괜찮아요.
        <br><b>매일 단 10분의 자유 쓰기</b>만으로도,
        <br>뇌는 창의력을 활성화하고 생각을 정리하는 능력을 키워갑니다.
        <br>오늘은 그냥 떠오르는 생각을 한 문단 써보는 것부터 시작해 보세요.
        <br>멋진 이야기는 그렇게 조용히 시작되기도 하니까요.
        <br>👉 <a href=${process.env.SERVICE_URL}>[지금 10분 자유 쓰기 시작하기]</a>
        <br>광고 메일을 수신하고 싶지 않을 시, ‘동의 철회’라고 답장해주시면 마케팅 메시지 수신 동의가 철회됩니다.
        `.trim(),
      });
      console.log(`mail sent to ${email}`);
    } catch (err) {
      console.error(err);
    }
  }
};
