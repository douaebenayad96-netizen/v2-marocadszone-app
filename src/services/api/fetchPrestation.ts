import { useQuery, useInfiniteQuery } from 'react-query'

import axios from '../config/axiosConfig'
import { QueryKeys } from '../../utils/QueryKeys'
import { Pagination } from '../types/pagination'
import { Prestation } from '../types/prestation'
import { PrestationFilter } from '../types/filter'
import { TDemande } from '../types/demandeType'

// fetch all prestations with pagination
async function fetchPrestations(page: number) {
  const { data } = await axios.get(`/Prestations?page=${page}`)
  return data as Pagination<Prestation>
}

/**
 * @description usePrestations hook to fetch prestations
 * @returns useQuery object
 * @param page // page number
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestations(page: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestations + page, page], () => fetchPrestations(page), {
    enabled: enabled,
  })
}

// fetch one prestations by id prestataire
async function fetchPrestationById(id: number) {
  const { data } = await axios.get(`/Prestataire_Prestation/${id}`)
  return data as Prestation[]
}

/**
 * @description usePrestationById hook to fetch prestations by id prestataire
 * @returns useQuery object
 * @param id // id prestataire
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestationById(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestationsByIdPrestataire + id, id], () => fetchPrestationById(id), {
    enabled: enabled,
  })
}

// fetch one prestations by id
async function fetchPrestation(id: number) {
  const { data } = await axios.get(`/Prestations/${id}`)
  return data as Prestation
}

/**
 * @description usePrestation hook to fetch prestations by id
 * @returns useQuery object
 * @param id // id prestataire
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestation(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestation + id, id], () => fetchPrestation(id), {
    enabled: enabled,
  })
}

// /similar-prestations/:id by id prestatation
async function fetchSimilarPrestations(id: number) {
  const { data } = await axios.get(`/similar-prestations/${id}`)
  return data as Prestation[]
}

/**
 * @description useSimilarPrestations hook to fetch prestations by id
 * @returns useQuery object
 * @param id // id prestataire
 * @param enabled // boolean value to enable or disable the query
 */
export function useSimilarPrestations(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.similarPrestations + id, id], () => fetchSimilarPrestations(id), {
    enabled: enabled,
  })
}

// /Filter_Prestation by filter
async function fetchFilterPrestations(filter: PrestationFilter, page: number) {
  const { data } = await axios.get(`/Filter_Prestation`, {
    params: {
      ...filter,
      page: page,
    },
  })
  return data as Pagination<Prestation>
}

/**
 * @description useFilterPrestations hook to fetch prestations by filter
 * @returns useQuery object
 * @param filter // filter
 * @param page // page number
 * @param enabled // boolean value to enable or disable the query
 */
export function useFilterPrestations(filter: PrestationFilter, page: number, enabled: boolean = true) {
  return useQuery([QueryKeys.filterPrestations + JSON.stringify(filter) + page, filter], () =>
    fetchFilterPrestations(filter, page),
    {
      enabled: enabled,
    }
  )
}

// /prestations/category/:id by id category
async function fetchPrestationsByCategory(id: number, page: number) {
  const { data } = await axios.get(`/prestations/category/${id}`, {
    params: {
      page: page,
    },
  })
  return data.prestations as Pagination<Prestation>
}

/**
 * @description usePrestationsByCategory hook to fetch prestations by id category
 * @returns useQuery object
 * @param id // id category
 * @param page // page number
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestationsByCategory(id: number, page: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestationsByCategory + id + page, id], () => fetchPrestationsByCategory(id, page), {
    enabled: enabled,
  })
}

// /Prestations get use demandes de prestations using pagination and user token
async function fetchDemandesPrestations(token: string, page: number) {
  const { data } = await axios.get(`/Prestations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
    },
  })
  return data as Pagination<TDemande>
}

/**
 * @description useDemandesPrestations hook to fetch demandes de prestations
 * @returns useQuery object
 * @param token // user token
 * @param page // initial page number
 * @param enabled // boolean value to enable or disable the query
 */
export function useDemandesPrestations(token: string, page: number, enabled: boolean = true) {
  return useInfiniteQuery([QueryKeys.demandesPrestations], 
    ({ pageParam = page }) => fetchDemandesPrestations(token, pageParam), {
    enabled: enabled,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1
      }
      return null
    },
  })
}