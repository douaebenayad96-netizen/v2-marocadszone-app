import { Prestataire } from "./prestataire"

export type TCandidatures = {
  id: number
  prestation_id: number
  prestataire_id: number
  price: string
  description: string
  created_at: string
  updated_at: string
  prestataire: Prestataire
}