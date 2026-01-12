
export enum UserPlan {
  FREE = 'FREE',
  PAID = 'PAID'
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  plan: UserPlan;
  dailyQuotaUsed: number;
  totalQuota: number;
  customApiKey?: string;
}

export interface ThumbnailStyle {
  id: string;
  name: string;
  description: string;
  promptSuffix: string;
  previewImage: string;
}

export interface GenerationHistory {
  id: string;
  title: string;
  style: string;
  imageUrl: string;
  createdAt: number;
}
