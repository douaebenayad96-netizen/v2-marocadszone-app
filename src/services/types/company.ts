// Company types for the company profile API

// Simplified types for company announcements
export interface CompanyAnnouncement {
  id: number;
  title: string;
  description: string;
  price: string;
  slug: string;
  announcement_type: string;
  item_condition: string;
  status: string;
  created_at: string;
  category: {
    id: number;
    label: string;
  };
  subcategory: {
    id: number;
    label: string;
  };
  city: {
    id: number;
    label: string;
  };
  country: {
    id: number;
    label: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string | null;
  };
  images: string[];
  videos: string[];
}
export interface Announcement {
  id: number;
  title: string;
  description: string;
  price: string;
  slug: string;
  email: string;
  phone_number: string;
  image_urls: string[];
  thumbnail_url: string | null;
  video_url: string | null;
  video_source_type: "url" | "upload" | string;
  activation_status: "active" | "inactive" | string;
  announce_type: "sale" | "rent" | string;
  announce_type_label: string;
  announcement_type: "text" | "video" | string;
  item_condition: "new" | "good_condition" | "used" | string;
  item_condition_label: string;
  status: "pending" | "approved" | "rejected" | string;
  is_flagged: boolean;
  likes_count: number;

  category_id: number;
  subcategory_id: number;
  city_id: number;
  country_id: number;
  user_id: number;

  category: {
    id: number;
    label: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };

  subcategory: {
    id: number;
    label: string;
    description: string;
    category_id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };

  city: {
    id: number;
    country_id: number;
    label: string;
    created_at: string;
    updated_at: string;
  };

  country: {
    id: number;
    label: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };

  user: {
    id: number;
    plan_id: number;
    city_id: number | null;
    country_id: number | null;
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
  };

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Company {
  id: number;
  name: string;
  slug?: string;
  logo?: string;
  description: string;
  address?: string;
  phone_number?: string;
  email?: string;
  url?: string[];
  user_id: number;
  created_at: string;
  updated_at: string;
  announcements: Announcement[];
}

export interface CompanyWithAnnouncements {
  company: Company;
  announcements: CompanyAnnouncement[];
  announcements_count: number;
}

export interface CreateCompanyData {
  logo: File;
  name: string;
  description: string;
  url?: string[];
  address?: string;
  phone_number?: string;
}

export interface UpdateCompanyData extends Partial<CreateCompanyData> {
  id?: number;
}

export interface CompanyResponse {
  message: string;
  data?: Company;
  code?: string;
}

export interface CompanyApiError {
  message: string;
  code: string;
  errors?: Record<string, string[]>;
}
