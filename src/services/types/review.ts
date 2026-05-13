import { Client } from "./auth";

export type Review = {
  id: number;
  client_id: number;
  prestation_id: number;
  comment: string;
  rate: number;
  created_at: string;
  updated_at: string;
  clients: Client;
  client: Client;
}