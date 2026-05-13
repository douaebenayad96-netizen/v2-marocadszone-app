import { useQuery } from 'react-query';

import axios from '../config/axiosConfig';
import { QueryKeys } from '../../utils/QueryKeys';
import { City } from '../types/city';

// /cities is the endpoint to fetch all cities
export const fetchCity = async () => {
  try {
    const response = await axios.get('/cities');
    const data = response.data;
    
    console.log('Cities API response:', data); // Debug log
    
    // Handle your specific API format: { data: [...] }
    if (data && data.data && Array.isArray(data.data)) {
      return data.data as City[];
    }
    
    // Handle if the response is directly an array
    if (Array.isArray(data)) {
      return data as City[];
    }
    
    // Handle old format with Cities property
    if (data && data.Cities && Array.isArray(data.Cities)) {
      return data.Cities as City[];
    }
    
    console.warn('Unexpected cities API response format:', data);
      // Fallback to some default cities if API doesn't work as expected
    return [
      { id: 1, label: 'Casablanca', country_id: 1, media: [] },
      { id: 2, label: 'Rabat', country_id: 1, media: [] },
      { id: 3, label: 'Fès', country_id: 1, media: [] },
      { id: 4, label: 'Marrakech', country_id: 1, media: [] },
      { id: 5, label: 'Agadir', country_id: 1, media: [] },
      { id: 6, label: 'Tanger', country_id: 1, media: [] },
      { id: 7, label: 'Oujda', country_id: 1, media: [] },
      { id: 8, label: 'Kénitra', country_id: 1, media: [] }
    ] as City[];
    
  } catch (error) {
    console.error('Error fetching cities:', error);    // Return fallback cities in case of API error
    return [
      { id: 1, label: 'Casablanca', country_id: 1, media: [] },
      { id: 2, label: 'Rabat', country_id: 1, media: [] },
      { id: 3, label: 'Fès', country_id: 1, media: [] },
      { id: 4, label: 'Marrakech', country_id: 1, media: [] },
      { id: 5, label: 'Agadir', country_id: 1, media: [] },
      { id: 6, label: 'Tanger', country_id: 1, media: [] },
      { id: 7, label: 'Oujda', country_id: 1, media: [] },
      { id: 8, label: 'Kénitra', country_id: 1, media: [] }
    ] as City[];
  }
}

export const useFetchCity = () => {
  return useQuery(QueryKeys.cities, fetchCity);
}
