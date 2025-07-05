import type { Dayjs } from "dayjs";
import { pool } from "../core/db";

export type ProductHistory = {
  id: string;
  product_id: string;
  title?: string;
  content?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  history_at: string;
};

interface GetOneParams {
  memberId: string;
  date: Dayjs;
}
const getOne = async ({ memberId, date }: GetOneParams) => {
  const result = await pool.query<ProductHistory>(`
    SELECT *
    FROM product_history ph
    WHERE ph.updated_by = '${memberId}'
      AND DATE(ph.updated_at) = '${date.format("YYYY-MM-DD")}'
    `);

  return result.rows.length >= 0 ? result.rows[0] : null;
};

export default { getOne };
