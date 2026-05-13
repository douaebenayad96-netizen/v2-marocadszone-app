import { TCandidatures } from "./candidature"
import { Prestataire } from "./prestataire"
import { TService } from "./serviceType"

export type TCheckoutState = {
  prestataire: Prestataire
  demande: TService
  candidature: TCandidatures
}