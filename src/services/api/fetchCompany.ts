import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from '../config/axiosConfig'
import { QueryKeys } from '../../utils/QueryKeys'
import { Company, CompanyResponse, CompanyApiError, CompanyWithAnnouncements } from '../types/company'

// Create company profile
async function createCompany(companyData: FormData, token: string): Promise<CompanyResponse> {
  console.log('🏢 [CreateCompany] Creating company profile...')
  
  try {
    const { data } = await axios.post('/profile/company', companyData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - let axios handle it automatically
      },
    })
    
    console.log('🏢 [CreateCompany] Success response:', data)
    return data as CompanyResponse
  } catch (error) {
    console.error('🏢 [CreateCompany] Error details:', error)
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown } }
      console.error('🏢 [CreateCompany] HTTP Status:', axiosError.response?.status)
      console.error('🏢 [CreateCompany] Status Text:', axiosError.response?.statusText)
      console.error('🏢 [CreateCompany] Response Data:', axiosError.response?.data)
      
      if (axiosError.response?.status === 400) {
        const responseData = axiosError.response.data as CompanyApiError
        if (responseData?.code === 'COMPANY_ALREADY_EXISTS') {
          throw new Error('Company already exists')
        }
      }
      
      if (axiosError.response?.status === 401) {
        console.error('🏢 [CreateCompany] Authentication failed - token may be invalid or expired')
        throw new Error('Authentication failed')
      }
      
      if (axiosError.response?.status === 422) {
        console.error('🏢 [CreateCompany] Validation failed')
        throw new Error('Validation failed - please check your input')
      }
    }
    
    throw error
  }
}

// Get company profile - can be current user's company or a specific company by slug
async function getCompany(token: string, companySlug?: string): Promise<Company | CompanyWithAnnouncements> {
  // Use the correct endpoint format based on what the backend expects
  const endpoint = companySlug ? `/profile/company/${companySlug}` : '/profile/company';
  console.log(`🏢 [GetCompany] Fetching company profile from ${endpoint}...`);
  
  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('🏢 [GetCompany] Success response:', data);
    
    // Handle different response formats based on endpoint
    if (companySlug) {
      // For public company profiles: return full data with announcements
      console.log('🏢 [GetCompany] Extracting company with announcements for slug:', companySlug);
      console.log('🏢 [GetCompany] Full data.data:', data.data);
      
      // Return the FULL data.data structure, not just data.data.company
      const result = data.data as CompanyWithAnnouncements;
      console.log('🏢 [GetCompany] Returning result:', result);
      console.log('🏢 [GetCompany] Has announcements?', 'announcements' in result);
      console.log('🏢 [GetCompany] Announcements count:', result.announcements_count);
      
      return result;
    } else {
      // For authenticated user's company: data.data (original format)
      console.log('🏢 [GetCompany] Extracting company from data.data for authenticated user');
      console.log('🏢 [GetCompany] Company data:', data.data);
      return data.data as Company;
    }
  } catch (error) {
    console.error('🏢 [GetCompany] Error details:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown } }
      console.error('🏢 [GetCompany] HTTP Status:', axiosError.response?.status)
      console.error('🏢 [GetCompany] Status Text:', axiosError.response?.statusText)
      console.error('🏢 [GetCompany] Response Data:', axiosError.response?.data)
      
      if (axiosError.response?.status === 401) {
        console.error('🏢 [GetCompany] Authentication failed - token may be invalid or expired')
        throw new Error('Authentication required')
      }
      
      if (axiosError.response?.status === 404) {
        console.error('🏢 [GetCompany] Company not found')
        throw new Error('Company not found')
      }
    }
    
    throw error;
  }
}

// Update company profile
async function updateCompany(companyData: FormData, token: string): Promise<CompanyResponse> {
  console.log('🏢 [UpdateCompany] Updating company profile...')
  
  try {
    const { data } = await axios.put('/profile/company', companyData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - let axios handle it automatically
      },
    })
    
    console.log('🏢 [UpdateCompany] Success response:', data)
    return data as CompanyResponse
  } catch (error) {
    console.error('🏢 [UpdateCompany] Error details:', error)
    throw error
  }
}

// React Query Hooks

/**
 * Hook to create a new company profile
 * @returns useMutation object for creating company
 */
export function useCreateCompany() {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ companyData, token }: { companyData: FormData; token: string }) => 
      createCompany(companyData, token),
    {
      onSuccess: () => {
        // Invalidate company queries to refetch data
        queryClient.invalidateQueries([QueryKeys.company])
      },
    }
  )
}

/**
 * Hook to get company profile
 * @param token Authentication token
 * @param companySlug Optional company slug to fetch a specific company
 * @param enabled Whether to enable the query
 * @returns useQuery object
 */
export function useGetCompany(token: string, companySlug?: string, enabled: boolean = true) {
  return useQuery(
    companySlug ? [QueryKeys.companyPublic, companySlug] : [QueryKeys.company, token],
    () => getCompany(token, companySlug),
    {
      enabled: enabled && !!token,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: Error) => {
        // Don't retry if company doesn't exist (404) or unauthorized (401)
        const axiosError = error as { response?: { status?: number } }
        if (axiosError?.response?.status === 404 || axiosError?.response?.status === 401) {
          return false
        }
        return failureCount < 3
      },
    }
  )
}

/**
 * Hook to update company profile
 * @returns useMutation object for updating company
 */
export function useUpdateCompany() {
  const queryClient = useQueryClient()
  
  return useMutation(
    ({ companyData, token }: { companyData: FormData; token: string }) => 
      updateCompany(companyData, token),
    {
      onSuccess: () => {
        // Invalidate company queries to refetch data
        queryClient.invalidateQueries([QueryKeys.company])
      },
    }
  )
}

/**
 * Hook to get a public company profile by slug
 * @param slug Company slug from URL
 * @param token Authentication token (required)
 * @param options Additional query options
 * @returns useQuery object
 * @deprecated Use useGetCompany with a slug parameter instead
 */
export function useGetCompanyBySlug(
  slug: string, 
  token?: string,
  options?: { enabled?: boolean }
) {
  return useGetCompany(token || '', slug, options?.enabled !== undefined ? options.enabled : (!!token && !!slug));
}
