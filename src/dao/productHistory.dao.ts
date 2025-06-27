import { pool } from "../core/db";

export interface ProductHistory {
  id: string;
  product_id: string;
  title?: string;
  content?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  history_at: string;
}

const getUpdatedAtByMemberId = async (memberId: string) => {
  const result = await pool.query<Pick<ProductHistory, "updated_at">>(`
    SELECT MAX(ph.updated_at) as updated_at
    FROM product_history ph
    WHERE ph.updated_by = '${memberId}'
    GROUP BY DATE(ph.updated_at)
  `);
  return result.rows.map(({ updated_at }) => updated_at);
};

export default { getUpdatedAtByMemberId };
