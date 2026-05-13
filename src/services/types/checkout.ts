import { Prestation } from "./prestation"

export type CheckoutState = {
  prestation: Prestation
  date: Date
  number: number
}

export type paymentMethod = 'credit-card' | 'cash' | 'paypal'

export type CardsType = 'Visa' | 'Mastercard' | 'American Express' | 'Discover' | 'Unknown'