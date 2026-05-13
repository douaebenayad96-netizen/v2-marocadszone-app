import { useQuery } from 'react-query';
import axios from '../config/axiosConfig';
import { QueryKeys } from '../../utils/QueryKeys';

export type Country = {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  media: unknown[];
};

// Fetch all countries
async function fetchCountries() {
  try {
    const response = await axios.get('/countries');
    const data = response.data;
    
    console.log('Countries API response:', data); // Debug log
    
    // Handle your specific API format: { data: [...] }
    if (data && data.data && Array.isArray(data.data)) {
      return data.data as Country[];
    }
    
    // Handle if the response is directly an array
    if (Array.isArray(data)) {
      return data as Country[];
    }
    
    // If the response has a Countries property (like cities API)
    if (data && data.Countries && Array.isArray(data.Countries)) {
      return data.Countries as Country[];
    }
    
    console.warn('Unexpected countries API response format:', data);
    
    // Fallback to some default countries if API doesn't work as expected
    return [
      { id: 1, label: 'Morocco', created_at: '', updated_at: '', deleted_at: null, media: [] },
      { id: 2, label: 'France', created_at: '', updated_at: '', deleted_at: null, media: [] },
      { id: 3, label: 'Algérie', created_at: '', updated_at: '', deleted_at: null, media: [] },
      { id: 4, label: 'Tunisie', created_at: '', updated_at: '', deleted_at: null, media: [] }
    ] as Country[];
    
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Return fallback countries in case of API error
    return [
      { id: 1, label: 'Morocco', created_at: '', updated_at: '', deleted_at: null, media: [] },
      { id: 2, label: 'France', created_at: '', updated_at: '', deleted_at: null, media: [] },
      { id: 3, label: 'Algérie', created_at: '', updated_at: '', deleted_at: null, media: [] },
      { id: 4, label: 'Tunisie', created_at: '', updated_at: '', deleted_at: null, media: [] }
    ] as Country[];
  }
}

export const useFetchCountries = () => {
  return useQuery(QueryKeys.countries, fetchCountries);
}
