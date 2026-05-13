import { useQuery } from 'react-query';

import axios from '../config/axiosConfig';
import { QueryKeys } from '../../utils/QueryKeys';
import { Category } from '../types/category';
import { Pagination } from '../types/pagination';
import { isAxiosError } from 'axios';

// fetch all categories with pagination
async function fetchCategories(page: number, perPageOverride?: number) {
  const paginate = 1;
  const perPage = perPageOverride || 6;
  // Fix the API path to avoid duplication of /api
  const { data } = await axios.get(`/categories`, {
    params: {
      page,
      paginate,
      perPage
    }
  });
  
  if (Array.isArray(data)) {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      current_page: page,
      last_page: Math.ceil(data.length / perPage),
      from: startIndex + 1,
      first_page_url: '',
      last_page_url: ''
    } as Pagination<Category>;
  }
  
  return data as Pagination<Category>;
}

export function useCategories(page: number, enabled: boolean, perPageOverride?: number) {
  return useQuery([QueryKeys.categories + page, page, perPageOverride], () => fetchCategories(page, perPageOverride), {
    enabled: enabled,
  });
}

// fetch all /Metier categories
async function fetchMetierCategories() {
  // Fix the API path to avoid duplication of /api
  const { data } = await axios.get(`/professions`);
  return data as Category[];
}

/**
 * @description useMetierCategories hook to fetch Metier categories
 * @returns useQuery object
 */
export function useMetierCategories() {
  return useQuery(QueryKeys.metierCategories, () => fetchMetierCategories());
}

// /metiers-by-category/:id
async function fetchMetierByCategory(id: string) {
  // const { data } = await axios.get(`/metiers-by-category/${id}`);
  // return data.Metiers as Category[];
  try {
    const { data } = await axios.get(`categories/professions/${id}`);
    return data as Category[];
  } catch (error) {
    if (isAxiosError(error)) {
      // check if the error is a 404 error
      if (error.response?.status === 404) {
        return [];
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}

/**
 * @description useMetierByCategory hook to fetch Metier categories by category id
 * @returns useQuery object
 * @param id // category id
 */
export function useMetierByCategory(id: string, enabled: boolean = true) {
  return useQuery([QueryKeys.metierByCategory + id], () => fetchMetierByCategory(id), {
    enabled: enabled,
  })
}

// /categories/top
async function fetchPopularSpecialities() {
  const response = await axios.get(`/categories/top`);
  // If the response is { message: string, data: Category[] }
  return response.data || [];
}

/**
 * @description usePopularSpecialities hook to fetch popular specialities
 * @returns useQuery object
 */
export function usePopularSpecialities() {
  return useQuery(QueryKeys.popularSpecialities, () => fetchPopularSpecialities());
}





async function fetchCategories1() {
  // Fetch all categories by setting a large perPage value and paginate=0
  const { data } = await axios.get(`/categories`, {
    params: {
      paginate: 0,
      perPage: 1000 // Large number to get all categories
    }
  });
  
  // Handle both paginated and non-paginated responses
  if (data && Array.isArray(data)) {
    return data as Category[];
  } else if (data && data.data && Array.isArray(data.data)) {
    return data.data as Category[];
  } else {
    return [] as Category[];
  }
}

/**
 * @description useCategories hook to fetch categories
 * @returns useQuery object
 */
export function useCategories1() {
  return useQuery([QueryKeys.categories], () => fetchCategories1(), {
  });
}

// fetch subcategories by category id
async function fetchSubcategories(categoryId: number) {
  try {
    const response = await axios.post('/subcategories', { category_ids: [categoryId] });
    return response.data as Category[];
  } catch (error) {
    if (isAxiosError(error)) {
      // check if the error is a 404 error
      if (error.response?.status === 404) {
        return [];
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}

/**
 * @description useSubcategories hook to fetch subcategories by category id
 * @returns useQuery object
 * @param categoryId // category id
 * @param enabled // boolean value to enable or disable the query
 */
export function useSubcategories(categoryId: number, enabled: boolean = true) {
  return useQuery([QueryKeys.subcategories, categoryId], () => fetchSubcategories(categoryId), {
    enabled: enabled && !!categoryId,
  });
}
