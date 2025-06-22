export interface ClaimResponse {
  total: number;
  successful: number;
  active: number;
  completedAmount: number;
  successByMonth: { month: string; success: string }[];
}
