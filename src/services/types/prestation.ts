import { Category } from "./category"
import { City } from "./city";
import { Media } from "./media";
import { Prestataire } from "./prestataire"

export type Prestation = {
  id: number;
  prestataire_id: number;
  categorys_id: number;
  availability: string;
  status: string;
  title: string;
  description: string;
  tarification: 'Service' | 'Heures' | 'Jours';
  prixType: 'Max' | 'Min' | 'Fixe';
  price: number;
  created_at: string;
  updated_at: string;
  media: Media[];
  prestataire: Prestataire;
  avis_count: number;
  categorie: Category;
  subcategories: [];
  avis_avg_rate: number;
  avantage: string;
  inclus: string;
  brut: number;
  comission: number;
  tax: number;
  payment_method: number;
  villes: City[];
  reservations_count: number;
  favoris_count: number;
}