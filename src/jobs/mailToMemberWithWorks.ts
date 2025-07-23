import * as memberDao from "../dao/member.dao";
import * as mail from "../core/mail";

export default async () => {
  // 2일 경과
  const members2dayInactivated = await memberDao.getMembersWithWorks({ shouldMarketingAgreed: true, lastActiveBeforeDays: 2 });
  for (const { email, nickname, title } of members2dayInactivated) {
    try {
      await mail.send({
        receivers: [email],
        subject: `${nickname} 님, <${title || "소중한 작품"}>이(가) 작가님의 손길을 기다리고 있어요 📖`,
        html: `작가님, &lt;${title || "소중한 작품"}&gt;을 개설하신 지 이틀이 지났어요.
        <br>이야기의 첫 장을 넘긴 지금, 다음 장면이 작가님의 손끝을 기다리고 있어요.
        <br>✍️ 실제 많은 작가들은 하루 700자~1000자 정도의 꾸준한 집필을 <b>가장 중요한 습관</b>이라고 이야기합니다.
        <br><b>작품을 완성하는 힘은 하루 한 걸음, 그 700자에서 시작돼요.</b>
        <br>혹시 오늘 무엇을 써야 할지 고민되시나요?
        <br>&lt;${title || "소중한 작품"}gt;의 인물들이 다음에 어떤 선택을 할 지 상상해보세요.
        <br>그 상상, 라이트온의 AI 어시스턴트와 함께한다면 700자는 금방입니다. 
        <br>👉 <a href=${process.env.SERVICE_URL}>[지금 700자 집필 이어가기]</a>
        <br>광고 메일을 수신하고 싶지 않을 시, ‘동의 철회’라고 답장해주시면 마케팅 메시지 수신 동의가 철회됩니다.
          `.trim(),
      });
      console.log(`mail sent to ${email}`);
    } catch (err) {
      console.error(err);
    }
  }
  // 4일 경과
  const members4dayInactivated = await memberDao.getMembersWithWorks({ shouldMarketingAgreed: true, lastActiveBeforeDays: 4 });
  for (const { email, nickname, title } of members4dayInactivated) {
    try {
      await mail.send({
        receivers: [email],
        subject: `${nickname} 님, <${title || "소중한 작품"}>이 4일째 멈춰 있어요`,
        html: `작가님, &lt;${title || "소중한 작품"}&gt;을 집필하신 지 4일이 지났습니다.
        <br>이야기의 흐름이 멈춘 지 꽤 되었네요! 지금 다시 이어가기에 딱 좋은 시점입니다.
        <br>많은 작가들이 말합니다. <b>“완성은 매일 조금씩 쓰는 습관에서 시작된다”고요.</b>
        <br>하루 700자, 지금 그 첫 문단만 써보세요.
        <br>라이트온의 AI 어시스턴트와 한 줄부터 다시 시작해보면, 흐름은 자연스럽게 돌아올 거예요.
        <br>&lt;${title || "소중한 작품"}&gt;의 다음 장면, 다시 그려보는 건 어떨까요?
        <br>👉 <a href=${process.env.SERVICE_URL}>[오늘의 700자 이어쓰기 시작하기]</a>
        <br>광고 메일을 수신하고 싶지 않을 시, ‘동의 철회’라고 답장해주시면 마케팅 메시지 수신 동의가 철회됩니다.
          `.trim(),
      });
      console.log(`mail sent to ${email}`);
    } catch (err) {
      console.error(err);
    }
  }
};
