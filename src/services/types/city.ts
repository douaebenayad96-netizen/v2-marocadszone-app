import { Media } from "./media";

export type City = {
  id: number;
  label: string;
  country_id: number;
  media: unknown[];
  created_at?: string;
  updated_at?: string;
}
export type Blog = {
  id: number
    title: string
    contenu: string
    updated_at: string
  year: string ;
  month?: string ;
  description?: string ;
  media: Media[]
  /*label_fr?: string;
  label_en?: string;
  label_ar?: string;*/
}