import { Media } from "./media";

export enum BillingPeriodEnum {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum SubscriptionStatusEnum {
  ACTIVE = "active",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
  ON_HOLD = "on_hold",
}
export interface Subscription {
  id?: number;
  status: SubscriptionStatusEnum;
  amount?: number;
  trial_ends_at?: string | null;
  current_period_start?: string | null;
  current_period_end?: string | null;
  cancelled_at?: string | null;
  cancellation_reason?: string | null;
  metadata?: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
  user?: User | null;
  plan?: Plan | null;
}

export interface Plan {
  id?: number;
  name?: string;
  billing_period?: BillingPeriodEnum;
  price?: number;
  max_announces?: number | null;
  is_active?: boolean;
  is_popular?: boolean;
}

export type User = {
  id?: number; // Made optional since Laravel might not always return it
  full_name?: string; // Added since this is what Laravel returns
  first_name: string;
  last_name: string;
  tel?: string; // Made optional
  email: string;
  phone_number?: string;
  address?: string;
  zip?: string;
  city?: string;
  city_id?: number; // Added since this is in the user object
  country_id?: number; // Added since this is in the user object
  media?: Media[]; // Made optional since it might not always be present
  roles: Role[] | string[]; // Allow both formats
  announcements_count?: number; // Added for tracking user's announcements
  current_active_subscription: Subscription;
  // Firebase fields
  firebase_uid?: string; // Firebase user ID
  provider?: string; // Authentication provider (google.com, facebook.com, etc.)
  avatar?: string; // User's profile picture URL
};

export type Role = {
  id: number;
  name: "Client" | "User_Prestataire";
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: number;
    role_id: number;
  };
};
