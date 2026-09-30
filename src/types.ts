export type OptionCategory = 'BRAND_NEW' | 'REFURBISHED';

export interface QuotationLink {
  id: string;
  title: string;
  url: string;
  vendor?: string;
  uploadedAt: string;
  addedBy?: string;
  organization?: string;
}

export interface VendorOption {
  id: string;
  vendor: string;
  vendorSubtext?: string;
  category: OptionCategory;
  label: string;
  model: string;
  speed: number; // ppm
  monthlyRental: number; // RM
  bwClick: number; // RM
  colorClick: number; // RM
  contractDuration: number; // Months (e.g. 60 or 36)
  tonerInclusion: string;
  sla: string;
  slaTag?: string;
  imageUrl?: string;
  notes?: string;
  
  // Verification flags
  isVerified?: boolean;
  hasFlaggedField?: boolean;
  flagMessage?: string;
  flagActionLabel?: string;
  flagResolved?: boolean;

  // SLA details for Matrix
  slaResponseTime: string;
  slaResponseNumHours?: number;
  uptimeCommitment: number; // e.g. 98.5
  backupPolicy: string;
  downtimePenalty: string;
  vendorRating: string; // e.g. "AAA (Tier-1 Principal)"
  isRecommended?: boolean;
}

export interface TenderProject {
  id: string;
  title: string;
  refCode: string;
  currency: string;
  targetVolume: number; // e.g. 25000
  monoRatio: number; // e.g. 0.8 (80%)
  colorRatio: number; // e.g. 0.2 (20%)
  fleetSize: number; // e.g. 12
  createdAt: string;
  options: VendorOption[];
  links?: QuotationLink[];
}

export interface SavedProjectRecord {
  id: string;
  title: string;
  refCode: string;
  currency: string;
  targetVolume: number;
  savedAt: string;
  optionsCount: number;
  projectData: TenderProject;
  links?: QuotationLink[];
  userId?: string;
  userEmail?: string;
  organization?: string;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  organization: string;
  department?: string;
  role?: string;
}

export type MatrixFilter = 'all' | 'brand-new' | 'refurbished' | 'recommendations';
