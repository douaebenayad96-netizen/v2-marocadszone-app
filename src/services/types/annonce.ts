import { Category } from "./category";
import { City } from "./city";

// Structure utilisateur simplifiée
export type AnnonceUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string | null;
  phone_number?: string;
  formatted_phone_number?: string;
  company_exists?: boolean;
};

// Structure pays
export type Country = {
  id: number;
  label: string;
};

// Structure sous-catégorie
export type Subcategory = {
  id: number;
  label: string;
  category: Category;
};

// Structure image
export type AnnonceImage = {
  id?: number;
  url?: string;
  path?: string;
  size?: number;
  // Spatie Media Library properties
  original_url?: string;
  preview_url?: string;
  file_name?: string;
  mime_type?: string;
};

// Structure video
export type AnnonceVideo = {
  url: string;
  size: number;
  mime_type: string;
};

export type Annonce = {
  [key: string]: any;
  id: number;
  title: string;
  slug: string;
  description: string;
  email: string;
  phone_number: string;
  formatted_phone_number: string;
  location: string;
  video_source_type?: string;
  phone?: string;
  status: string;
  status_label: string;
  is_active?: boolean;
  activation_status?: "active" | "inactive" | string;
  announce_type?: string;
  announce_type_label?: string;
  item_condition?: string;
  item_condition_label?: string;
  price?: string;
  formatted_price?: string;
  created_at: string;
  updated_at: string;
  user: AnnonceUser;
  city: City;
  country: Country;
  subcategory: Subcategory;
  images: AnnonceImage[];
  video: AnnonceVideo | null;
  // Firebase Storage fields
  image_urls?: string[];
  video_url?: string;
  distance?: number;
  announce_url?: string;
};

export type AnnonceFilter = {
  category_id?: number;
  subcategory_id?: number;
  city_id?: number;
  country_id?: number;
  ville_id?: number; // Added for city/ville filter
  category?: string; // Added for category name filter
  ville?: string; // Added for city/ville name filter
  status?: string;
  search?: string;
  sort_by?: string;
  latitude?: number;
  longitude?: number;
  video_url?: string;
  video_source_type?: string;
  price_min?: number; // Added for price range filter
  price_max?: number; // Added for price range filter
};
