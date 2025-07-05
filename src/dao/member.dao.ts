import { pool } from "../core/db";

export type Member = {
  id: string;
  email: string;
  nickname: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
};

const getAllIds = async () => {
  const result = await pool.query<Pick<Member, "id">>(`
    SELECT id
    FROM member
  `);
  return result.rows.map(({ id }) => id);
};

export default { getAllIds };
