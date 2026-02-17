
export enum AppView {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  CONTRACTS = 'contracts',
  SPLITS = 'splits',
  PAYOUTS = 'payouts',
  SECURITY = 'security',
  ADVISOR = 'advisor',
  ONBOARDING = 'onboarding',
  KNOWLEDGEBASE = 'knowledgebase'
}

export interface UserProfile {
  name: string;
  legalName: string;
  avatar?: string;
  walletAddress: string;
  did: string; // Decentralized Identity
  verifiedAt: string;
}

export interface SecurityMetrics {
  intrusionAttempts: number;
  encryptionStrength: string;
  neuralDefenseStatus: 'OPTIMAL' | 'REACTIVE' | 'THREAT_DETECTED';
  zkProofCount: number;
  enclaveIntegrity: number;
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
  hash: string; // Cryptographic anchor
}

export interface PayoutTransaction {
  id: string;
  source: string;
  amount: number;
  timestamp: string;
  verified: boolean;
  status: 'cleared' | 'processing' | 'flagged';
  proofUri?: string; // Link to ZK-proof
}

export interface Reputation {
  score: number;
  rank: string;
  complianceRate: number;
  totalDeals: number;
}
