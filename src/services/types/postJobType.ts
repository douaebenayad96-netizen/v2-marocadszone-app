import { TCandidatures } from "./candidature"
import { Category } from "./category"
import { City } from "./city"
import { Media } from "./media"

export type TPostJob = {
  image1?: File
  image2?: File
  image3?: File
  client_id: string
  categorys_id: string
  metier_id: string
  date: string
  time: string
  ville_id: string
  adresse: string
  tel: string
  titre: string
  description: string
  payment_method: string
  specialite_id: string
  nbr_heurs: string
}

export type TPostJobResponse = {
  message: string
  prestation: TPrestation
}

export type TPrestation = {
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
  ville?: City;
  categorie?: Category
  media: Media[]
  candidatures: TCandidatures[]
}