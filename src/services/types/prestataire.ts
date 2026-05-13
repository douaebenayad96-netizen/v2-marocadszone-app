import { Category, Profession } from "./category";
import { City } from "./city";
import { Media } from "./media";

export type Prestataire = {
  id: number;
  gallery?: string[];
  first_name: string;
  last_name: string;
  adresse: string;
  description: string;
  zip: string;
  // city: string;
  title: string;
  pubtel: string;
  pubemail: string;
  phone_number: string;
  email: string;
  email_verified_at: string;
  CA: string;
  created_at: string;
  updated_at: string;
  media: Media[];
  totalAvis: number;
  avgRating: number | null;
  availability: number
  speciality_id: number;
  speciality: Category;
  city_id: number;
  city: City;
  profession_id: number;
  profession: Profession;
  availability_days: ("0" | "1" | "2" | "3" | "4" | "5" | "6")[];
  instant: 0 | 1
  language: "fr" | "en" | "ar"
  advantage: string;
  inclus: string;
  coordinates: string;
  reservation_count?: number;
}