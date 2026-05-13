import { useMutation, useQuery } from 'react-query'

import axios from '../config/axiosConfig'
import { QueryKeys } from '../../utils/QueryKeys'
import { Reservation, SaveReservationRequest } from '../types/reservation'

// save reservation /demandeDeService/:iddemande/accepterPrestataire/:idprestataire
async function saveReservation(info: { reservation: SaveReservationRequest, token: string }) {
  const { data } = await axios.post(`/demandeDeService/${info.reservation.idDemande}/accepterPrestataire/${info.reservation.idPrestataire}`, {
    payment_method: info.reservation.payment_method,
  }, {
    headers: {
      Authorization: `Bearer ${info.token}`
    }
  })
  return data
}

/**
 * @description useSaveReservation hook to save reservation
 * @returns useMutation object
 * @param reservation // reservation object
 */
export function useSaveReservation() {
  return useMutation(QueryKeys.saveReservation, saveReservation)
}

// get user reservations by token /reservation
async function getUserReservations(token: string) {
  const { data } = await axios.get('/reservation', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data.reservations as Reservation[]
}

/**
 * @description useGetUserReservations hook to get user reservations
 * @returns useQuery object
 * @param token // token
 */
export function useGetUserReservations(token: string, enabled: boolean = true) {
  return useQuery(QueryKeys.getUserReservations, () => getUserReservations(token), {
    enabled
  })
}
