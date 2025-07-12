import dayjs from "dayjs";
import { pool } from "../core/db";

export type Member = {
  id: string;
  email: string;
  nickname: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
};

type CommonParam = { shouldMarketingAgreed?: boolean };

const MARKETING_TERMS_CD = "1002";

export const getMembers = async ({ shouldMarketingAgreed }: CommonParam = {}) => {
  const result = await pool.query<Member>(`
    SELECT *
    FROM member m
    WHERE 1=1
      ${shouldMarketingAgreed ? `AND EXISTS (SELECT 1 FROM terms_agreement ta WHERE ta.member_id = m.id AND ta.terms_cd = '${MARKETING_TERMS_CD}')` : ``}
  `);
  return result.rows;
};

export const getMemberIds = async ({ shouldMarketingAgreed }: CommonParam = {}) => {
  const result = await pool.query<Pick<Member, "id">>(`
    SELECT id
    FROM member
    WHERE 1=1
      ${shouldMarketingAgreed ? `AND EXISTS (SELECT 1 FROM terms_agreement ta WHERE ta.member_id = m.id AND ta.terms_cd = '${MARKETING_TERMS_CD}')` : ``}
  `);
  return result.rows.map(({ id }) => id);
};

export const getMembersWithoutWorks = async ({ shouldMarketingAgreed, lastActiveBeforeDays }: CommonParam & { lastActiveBeforeDays: number }) => {
  const result = await pool.query<Member>(`
    SELECT *
    FROM member m
    WHERE DATE(m.last_token_issued_at) = '${dayjs().subtract(lastActiveBeforeDays, "day").format("YYYY-MM-DD")}'
      AND NOT EXISTS ( SELECT 1 FROM product p WHERE p.created_by = m.id )
      ${shouldMarketingAgreed ? `AND EXISTS (SELECT 1 FROM terms_agreement ta WHERE ta.member_id = m.id AND ta.terms_cd = '${MARKETING_TERMS_CD}')` : ``}
  `);
  return result.rows;
};

export const getMembersWithWorks = async ({ shouldMarketingAgreed, lastActiveBeforeDays }: CommonParam & { lastActiveBeforeDays: number }) => {
  const result = await pool.query<Member>(`
    SELECT *
    FROM member m
    WHERE DATE(m.last_token_issued_at) = '${dayjs().subtract(lastActiveBeforeDays, "day").format("YYYY-MM-DD")}'
      AND EXISTS ( SELECT 1 FROM product p WHERE p.created_by = m.id )
      ${shouldMarketingAgreed ? `AND EXISTS (SELECT 1 FROM terms_agreement ta WHERE ta.member_id = m.id AND ta.terms_cd = '${MARKETING_TERMS_CD}')` : ``}
  `);
  return result.rows;
};
