import { Prestataire } from "./prestataire";
import { Prestation } from "./prestation";

export type SaveReservationRequest = {
  payment_method: 0 | 1
  idPrestataire: number
  idDemande: number
}

export type Reservation = {
  id: number;
  reference: string;
  prestation_id: number;
  client_id: number;
  prestataire_id: number;
  status: string;
  date: string;
  hour: string;
  brut: number;
  comission: number;
  nbr: number;
  price: number;
  payment_method: string;
  adresse: string;
  comment: string;
  created_at: string;
  updated_at: string;
  prestataire: Prestataire;
  prestation: Prestation;
}
