
export enum AppView {
  DASHBOARD = 'dashboard',
  CONTRACTS = 'contracts',
  SPLITS = 'splits',
  PAYOUTS = 'payouts',
  SECURITY = 'security',
  ADVISOR = 'advisor',
  ONBOARDING = 'onboarding'
}

export interface ContractAnalysis {
  riskScore: number;
  flags: Array<{
    severity: 'low' | 'medium' | 'high';
    clause: string;
    description: string;
    suggestion: string;
  }>;
  summary: string;
  equityEstimated: string;
}

export interface SplitSheet {
  id: string;
  title: string;
  status: 'pending' | 'verified' | 'disputed';
  participants: Array<{
    name: string;
    percentage: number;
    confirmed: boolean;
    identityVerified: boolean;
  }>;
  creationDate: string;
}

export interface PayoutTransaction {
  id: string;
  source: string;
  amount: number;
  timestamp: string;
  verified: boolean;
  status: 'cleared' | 'processing' | 'flagged';
}

export interface Reputation {
  score: number;
  rank: string;
  complianceRate: number;
  totalDeals: number;
}
