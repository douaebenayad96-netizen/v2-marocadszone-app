import { useQuery } from 'react-query'
import axios from '../config/axiosConfig'
import { QueryKeys } from '../../utils/QueryKeys'

// Type definition for announcement types
export interface AnnonceType {
  id: number
  label: string
  value: string
  description?: string
  created_at?: string
  updated_at?: string
}

// Fetch all announcement types
async function fetchAnnonceTypes() {
  try {
    const { data } = await axios.get('/annonce-types')
    
    // Handle different response formats
    if (data && Array.isArray(data.data)) {
      return data.data as AnnonceType[]
    }
    
    if (Array.isArray(data)) {
      return data as AnnonceType[]
    }
    
    // Fallback: return default types matching backend enum values
    return [
      { id: 1, label: 'Vente', value: 'sale', description: 'Vente de produits ou services' },
      { id: 2, label: 'Location', value: 'rental', description: 'Location de produits ou services' },
      { id: 3, label: 'Service', value: 'service', description: 'Prestation de services' }
    ] as AnnonceType[]
  } catch (error) {
    console.error('❌ fetchAnnonceTypes error:', error)
    
    // Return default types matching backend enum values if API call fails
    return [
      { id: 1, label: 'Vente', value: 'sale', description: 'Vente de produits ou services' },
      { id: 2, label: 'Location', value: 'rental', description: 'Location de produits ou services' },
      { id: 3, label: 'Service', value: 'service', description: 'Prestation de services' }
    ] as AnnonceType[]
  }
}

/**
 * @description useAnnonceTypes hook to fetch announcement types
 * @returns useQuery object
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnonceTypes(enabled: boolean = true) {
  return useQuery([QueryKeys.annonceTypes], () => fetchAnnonceTypes(), {
    enabled: enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Fetch announcement type by ID
async function fetchAnnonceTypeById(id: number) {
  try {
    const { data } = await axios.get(`/annonce-types/${id}`)
    
    if (data && data.data) {
      return data.data as AnnonceType
    }
    
    return data as AnnonceType
  } catch (error) {
    console.error('❌ fetchAnnonceTypeById error:', error)
    throw error
  }
}

/**
 * @description useAnnonceTypeById hook to fetch an announcement type by ID
 * @returns useQuery object
 * @param id announcement type ID
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnonceTypeById(id: number, enabled: boolean = true) {
  return useQuery(
    [QueryKeys.annonceTypes, id], 
    () => fetchAnnonceTypeById(id), 
    {
      enabled: enabled && !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  )
}
