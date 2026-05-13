import { Category } from "./category"
import { City } from "./city"
import { Media } from "./media"

export type TService = {
  id: number
  client_id: number
  categorys_id: number
  metier_id: number
  nbr: number
  date: string
  hour: string
  ville_id: number
  adresse: string
  tel: string
  title: string
  description: string
  payment_method: string
  status: string
  availability: string
  updated_at: string
  created_at: string
  reference: string
  ville?: City
  categorie?: Category
  media: Media[]
  prestataire_id?: number
  comission?: number
  price?: number
  brut?: number
  Active: number
}