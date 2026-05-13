import { useQuery } from 'react-query';

import axios from '../config/axiosConfig';
import { QueryKeys } from '../../utils/QueryKeys';
import { Pagination } from '../types/pagination';
import { Prestataire } from '../types/prestataire';
import { PrestataireFilter } from '../types/filter';

// fetch all prestataires with pagination
async function fetchPrestataires(page: number) {
  const { data } = await axios.get(`/Artisans?page=${page}`);
  return data.artisans as Pagination<Prestataire>;
}

/**
 * @description usePrestataires hook to fetch prestataires
 * @returns useQuery object
 * @param page // page number
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestataires(page: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestataires + page, page], () => fetchPrestataires(page), {
    enabled: enabled,
  });
}

// fetch prestataire by id
async function fetchPrestataireById(id: number) {
  const { data } = await axios.get(`/Artisans/${id}`);
  return data as Prestataire;
}

/**
 * @description usePrestataire hook to fetch prestataire by id
 * @returns useQuery object
 * @param id // prestataire id
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestataire(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestataire + id, id], () => fetchPrestataireById(id), {
    enabled: enabled,
  });
}

// /Filter_Prestataire by filter
async function fetchPrestatairesByFilter(filter: PrestataireFilter, page: number) {
  const { data } = await axios.get(`/Filter_artisan`, {
    params: {
      ...filter,
      page: page,
    },
  })
  return data as Pagination<Prestataire>;
}

/**
 * @description usePrestatairesByFilter hook to fetch prestataires by filter
 * @returns useQuery object
 * @param filter // prestataire filter
 * @param page // page number
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestatairesByFilter(filter: PrestataireFilter, page: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestatairesByFilter + JSON.stringify(filter) + page, page],
    () => fetchPrestatairesByFilter(filter, page),
    {
      enabled: enabled,
    }
  );
}

// /Prestataire_Specialite?specialite= by specialite id
async function fetchPrestatairesBySpecialite(specialite: number, page: number) {
  const { data } = await axios.get(`/Artisans/Category`, {
    params: {
      category: specialite,
      page: page,
    },
  })
  return data as Pagination<Prestataire>
}

/**
 * @description usePrestatairesBySpecialite hook to fetch prestataires by specialite
 * @returns useQuery object
 * @param specialite // specialite id
 * @param page // page number
 * @param enabled // boolean value to enable or disable the query
 */

export function usePrestatairesBySpecialite(specialite: number, page: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestatairesBySpecialite + specialite + page, page],
    () => fetchPrestatairesBySpecialite(specialite, page),
    {
      enabled: enabled,
    }
  )
}

// /Prestataire_Ville?ville= by city id
async function fetchPrestatairesByCity(city: number) {
  const { data } = await axios.get(`/Artisans/City`, {
    params: {
      city: city
    },
  })
  return data as Pagination<Prestataire>
}

/**
 * @description usePrestatairesByCity hook to fetch prestataires by city
 * @returns useQuery object
 * @param city // city id
 * @param enabled // boolean value to enable or disable the query
 */
export function usePrestatairesByCity(city: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestatairesByVille + city, city],
    () => fetchPrestatairesByCity(city),
    {
      enabled: enabled,
    }
  )
}

// /similar-prestataire/41 limit=4 by prestataire id
async function fetchSimilarPrestataires(id: number) {
  const { data } = await axios.get(`/Artisans/Similar/${id}`)
  return data as Prestataire[]
}

/**
 * @description useSimilarPrestataires hook to fetch similar prestataires
 * @returns useQuery object
 * @param id // prestataire id
 * @param enabled // boolean value to enable or disable the query
 */
export function useSimilarPrestataires(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.similarPrestataires + id],
    () => fetchSimilarPrestataires(id),
    {
      enabled: enabled,
    }
  )
}






// /Prestataire_Specialite?specialite= by specialite id
async function fetchPrestatairesMaps(latitude: number, longitude: number) {
  const { data } = await axios.get(`/Artisans/Nearby`, {
    params: {
      latitude: latitude,
      longitude: longitude,
    },
  })
  return data.artisans as Prestataire[]
}

/**
 * @description usePrestatairesBySpecialite hook to fetch prestataires by specialite
 * @returns useQuery object
 * @param latitude // specialite id
 * @param longitude // page number
 * @param enabled // boolean value to enable or disable the query
 */

export function usePrestatairesMaps(latitude: number, longitude: number, enabled: boolean = true) {
  return useQuery([QueryKeys.prestatairesBySpecialite + latitude + longitude, latitude,longitude],
    () => fetchPrestatairesMaps(latitude, longitude),
    {
      enabled: enabled,
    }
  )
}