import { Category, Profession } from "./category";
import { City } from "./city";
import { Media } from "./media";
import { User } from "./user";

export type RegisterUser = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  image?: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: {
    token: string;
    user: User;
  };
};

// Firebase Auth Response from backend
export type FirebaseAuthResponse = {
  success: boolean;
  message: string;
  data: AuthResponse;
};

export type UpdateUser = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  media: Media[];
  advantage?: string;
  description?: string;
  availability?: boolean;
  online_hours?: number;
  inclus?: string;
  email?: string;
  coordinates?:
    | {
        latitude?: string;
        longitude?: string;
      }
    | undefined;
  irc?: Media | undefined;
  kibs?: Media | undefined;
  adresse?: string | undefined;
  zip?: string | undefined;
  city?: City | undefined;
  speciality?: Category | undefined;
  profession?: Profession | undefined;
};

export type UpdateUserInfo = {
  first_name?: string;
  last_name?: string;
  media: Media[];
  tel?: string;
  email?: string;
  advantage?: string;
  inclus_array?: string[];
  description?: string;
  adresse?: string | undefined;
  zip?: string | undefined;
  irc?: Media | undefined;
  kibs?: Media | undefined;
  city_artisan?: number | undefined;
  coordinates?:
    | {
        latitude?: string;
        longitude?: string;
      }
    | undefined;
  speciality_artisan?: number | undefined;
  profession_artisan?: number | undefined;
  online_hours?: number | undefined;
  availability?: boolean;
};

export type Client = {
  id: number;
  firstname: string;
  lastname: string;
  tel: string;
  email: string;
  adresse: string | undefined;
  zip: string | undefined;
  city: string | undefined;
  advantage: string | undefined;
  inclus: string | undefined;
  description: string | undefined;
  title: string | undefined;
  pubtel: string | undefined;
  pubemail: string | undefined;
  specialite: string | undefined;
  email_verified_at: string;
  CA: number | undefined;
  created_at: string;
  updated_at: string;
  media: Media[];
};

export type ChangePassword = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export type Cover = {
  cover: Media;
};
