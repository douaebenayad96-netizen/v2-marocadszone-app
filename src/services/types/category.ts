import { Media } from "./media"

export type Category = {
  label: string | undefined
  id: number
  picture: string | undefined
  artisan_specialite_count: number| undefined
  prestations_count: number | undefined
  media: Media[]
  sub_categories: Category[]
  percentage: number | undefined
  created_at: string | undefined
  updated_at: string | undefined
  prestataires_count: number 
}

export type Profession = {
  id: number
  label: string | undefined
  prestations_count: number | undefined
  media: Media[]
  percentage: number | undefined
  created_at: string | undefined
  updated_at: string | undefined
  prestataires_count: number | undefined
}