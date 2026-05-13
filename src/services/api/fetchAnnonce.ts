import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import { QueryKeys } from "../../utils/QueryKeys";
import axiosConfig, { apiClientV2 } from "../config/axiosConfig";
import { Annonce, AnnonceFilter } from "../types/annonce";
import {
  AnnoncesApiResponse,
  Pagination,
  PaginationV2,
} from "../types/pagination";

// Types for creating/updating annonces
export interface CreateAnnonceData {
  title: string;
  description: string;
  email: string;
  phone_number: string;
  category_id: number;
  subcategory_id?: number;
  city_id: number;
  country_id: number;
  images?: File[];
  video?: File;
  announce_type?: string;
  item_condition?: string;
  price?: number;
}

export interface UpdateAnnonceData extends Partial<CreateAnnonceData> {
  id: number;
}

export interface AnnonceResponse {
  message: string;
  data: Annonce;
}

// Fetch all annonces with pagination
async function fetchAnnonces(page: number = 1) {
  try {
    // Fix the API path to avoid duplication of /api
    const response = await axiosConfig.get(`/announces`, {
      params: { page },
    });

    // Check if response.data is null or undefined
    if (!response.data) {
      return {
        data: [],
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: 1,
        last_page_url: "",
      } as Pagination<Annonce>;
    }

    // If the API returns { message: "...", data: [...] }
    if (response.data && Array.isArray(response.data.data)) {
      // Return a properly formatted pagination object
      return {
        data: response.data.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: response.data.last_page || 1,
        last_page_url: "",
      } as Pagination<Annonce>;
    }

    // If response.data is the array directly
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: 1, // Assume just one page if no pagination info
        last_page_url: "",
      } as Pagination<Annonce>;
    }

    return response.data as Pagination<Annonce>;
  } catch (error) {
    console.error("❌ fetchAnnonces error:", error);
    throw error;
  }
}

/**
 * @description useAnnonces hook to fetch all annonces with pagination
 * @returns useQuery object
 * @param page page number
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnonces(page: number = 1, enabled: boolean = true) {
  return useQuery([QueryKeys.annonces, page], () => fetchAnnonces(page), {
    enabled: enabled,
    keepPreviousData: true,
  });
}

// Fetch annonces with infinite loading
async function fetchAnnoncesInfinite(page: number) {
  try {
    // Fix the API path to avoid duplication of /api
    const response = await axiosConfig.get(`/announces`, {
      params: { page },
    });

    // If the API returns { message: "...", data: [...] }
    if (response.data && Array.isArray(response.data.data)) {
      // Return a properly formatted pagination object
      return {
        data: response.data.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: response.data.last_page || 1,
        last_page_url: "",
      } as Pagination<Annonce>;
    }

    // If response.data is the array directly
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: 1, // Assume just one page if no pagination info
        last_page_url: "",
      } as Pagination<Annonce>;
    }

    return response.data as Pagination<Annonce>;
  } catch (error) {
    console.error("❌ fetchAnnoncesInfinite error:", error);
    throw error;
  }
}

/**
 * @description useAnnoncesInfinite hook to fetch annonces with infinite loading
 * @returns useInfiniteQuery object
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnoncesInfinite(enabled: boolean = true) {
  return useInfiniteQuery(
    [QueryKeys.annonces],
    ({ pageParam = 1 }) => fetchAnnoncesInfinite(pageParam),
    {
      enabled: enabled,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return null;
        if (lastPage.current_page < lastPage.last_page) {
          return lastPage.current_page + 1;
        }
        return null;
      },
    }
  );
}

// Fetch one annonce by id
async function fetchAnnonceById(id: number) {
  try {
    // Fix the API path to avoid duplication of /api
    const response = await axiosConfig.get(`/announces/${id}`);

    // If the API returns { message: "...", data: {...} }
    if (response.data && response.data.data) {
      return response.data.data as Annonce;
    }
    return response.data as Annonce;
  } catch (error) {
    console.error("❌ fetchAnnonceById error:", error);
    throw error;
  }
}

// Fetch one annonce by slug
async function fetchAnnonceBySlug(slug: string) {
  try {
    const response = await apiClientV2.get(`/announces/slug/${slug}`);

    // Handle ApiAnnounceResource response: { message: "...", data: {...} }
    if (response.data && response.data.data) {
      return response.data.data as Annonce;
    }
    return response.data as Annonce;
  } catch (error) {
    console.error("❌ fetchAnnonceBySlug error:", error);
    throw error;
  }
}

/**
 * @description useAnnonceById hook to fetch an annonce by id
 * @returns useQuery object
 * @param id annonce id
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnonceById(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.annonce, id], () => fetchAnnonceById(id), {
    enabled: enabled,
  });
}

/**
 * @description useAnnonceBySlug hook to fetch an annonce by slug
 * @returns useQuery object
 * @param slug annonce slug
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnonceBySlug(slug: string, enabled: boolean = true) {
  return useQuery(
    [QueryKeys.annonce, "slug", slug],
    () => fetchAnnonceBySlug(slug),
    {
      enabled: enabled && !!slug,
    }
  );
}

// Fetch annonces with filters
async function fetchAnnoncesWithFilter(
  filter: AnnonceFilter,
  page: number = 1,
  perPage: number = 10
) {
  try {
    // Use the standard /announces endpoint, not /announces/filter
    const endpoint = "/announces";
    const params: { [key: string]: string | number | undefined } = {
      page: page,
      per_page: perPage,
    };

    // Add filter parameters
    if (filter.search) params.search = filter.search;

    // Category filters - support both ID and name
    if (filter.category)
      params.category = filter.category; // Filter by category name
    else if (filter.category_id) params.category_id = filter.category_id; // Filter by category ID

    if (filter.subcategory_id) params.subcategory_id = filter.subcategory_id;

    // ONLY use ville parameter for city filtering - no city_id or country_id
    if (filter.ville) {
      params.ville = filter.ville;
    }
    if (filter.sort_by) params.sort_by = filter.sort_by;

    const response = await apiClientV2.get(endpoint, { params });

    // Handle your backend's new response format: { message: "...", data: { items: [...], pagination: {...} } }
    if (
      response.data &&
      response.data.data &&
      response.data.data.items &&
      response.data.data.pagination
    ) {
      return {
        message: response.data.message,
        data: {
          items: response.data.data.items,
          pagination: response.data.data.pagination,
        },
      } as AnnoncesApiResponse<Annonce>;
    }

    // Fallback for old Laravel pagination format
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      const apiData = response.data.data;

      // Check if it's a Laravel paginated collection (has data, current_page, last_page, etc.)
      if (
        typeof apiData === "object" &&
        "data" in apiData &&
        Array.isArray(apiData.data)
      ) {
        // Extract pagination metadata from Laravel paginator
        return {
          data: apiData.data,
          current_page: apiData.current_page || page,
          first_page_url: apiData.first_page_url || "",
          from: apiData.from || 0,
          last_page: apiData.last_page || 1,
          last_page_url: apiData.last_page_url || "",
          per_page: apiData.per_page || perPage,
          total: apiData.total || 0,
          to: apiData.to || 0,
          next_page_url: apiData.next_page_url || null,
          prev_page_url: apiData.prev_page_url || null,
        } as Pagination<Annonce>;
      }

      // If data is just an array (collection without pagination)
      if (Array.isArray(apiData)) {
        return {
          data: apiData,
          current_page: page,
          first_page_url: "",
          from: 0,
          last_page: 1,
          last_page_url: "",
          per_page: perPage,
          total: apiData.length,
        } as Pagination<Annonce>;
      }
    }

    // Check if response.data is null or undefined
    if (!response.data) {
      return {
        data: [],
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: 1,
        last_page_url: "",
        per_page: perPage,
      } as Pagination<Annonce>;
    }

    // If response.data is the array directly
    if (Array.isArray(response.data)) {
      const totalItems = response.data.length;
      const estimatedLastPage = Math.ceil(totalItems / perPage);

      return {
        data: response.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: estimatedLastPage,
        last_page_url: "",
        per_page: perPage,
      } as Pagination<Annonce>;
    }

    return response.data as Pagination<Annonce>;
  } catch (error) {
    console.error("❌ fetchAnnoncesWithFilter error:", error);
    throw error;
  }
}

/**
 * @description useAnnoncesWithFilter hook to fetch annonces with filters
 * @returns useQuery object
 * @param filter AnnonceFilter object
 * @param page page number
 * @param enabled boolean value to enable or disable the query
 * @param perPage number of items per page
 */
export function useAnnoncesWithFilter(
  filter: AnnonceFilter,
  page: number = 1,
  enabled: boolean = true,
  perPage: number = 10
) {
  return useQuery<AnnoncesApiResponse<Annonce> | Pagination<Annonce>>(
    [QueryKeys.annoncesFilter, filter, page, perPage],
    () => fetchAnnoncesWithFilter(filter, page, perPage),
    {
      enabled: enabled,
      keepPreviousData: true,
    }
  );
}

// Fetch annonces by category
async function fetchAnnoncesByCategory(categoryId: number, page: number = 1) {
  try {
    // Fix the API path to avoid duplication of /api
    const response = await axiosConfig.get(
      `/announces/category/${categoryId}`,
      {
        params: {
          page: page,
        },
      }
    );

    // If the API returns { message: "...", data: [...] }
    if (response.data && Array.isArray(response.data.data)) {
      // Return a properly formatted pagination object
      return {
        data: response.data.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: response.data.last_page || 1,
        last_page_url: "",
      } as Pagination<Annonce>;
    }
    return response.data as Pagination<Annonce>;
  } catch (error) {
    console.error("❌ fetchAnnoncesByCategory error:", error);
    throw error;
  }
}

/**
 * @description useAnnoncesByCategory hook to fetch annonces by category
 * @returns useQuery object
 * @param categoryId category id
 * @param page page number
 * @param enabled boolean value to enable or disable the query
 */
export function useAnnoncesByCategory(
  categoryId: number,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.annoncesCategory, categoryId, page],
    () => fetchAnnoncesByCategory(categoryId, page),
    {
      enabled: enabled,
      keepPreviousData: true,
    }
  );
}

// Search annonces
async function searchAnnonces(searchTerm: string, page: number = 1) {
  try {
    // Fix the API path to avoid duplication of /api
    const response = await axiosConfig.get("/announces/search", {
      params: {
        q: searchTerm,
        page: page,
      },
    });

    // If the API returns { message: "...", data: [...] }
    if (response.data && Array.isArray(response.data.data)) {
      // Return a properly formatted pagination object
      return {
        data: response.data.data,
        current_page: page,
        first_page_url: "",
        from: 0,
        last_page: response.data.last_page || 1,
        last_page_url: "",
      } as Pagination<Annonce>;
    }
    return response.data as Pagination<Annonce>;
  } catch (error) {
    console.error("❌ searchAnnonces error:", error);
    throw error;
  }
}

/**
 * @description useSearchAnnonces hook to search annonces
 * @returns useQuery object
 * @param searchTerm search term
 * @param page page number
 * @param enabled boolean value to enable or disable the query
 */
export function useSearchAnnonces(
  searchTerm: string,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.annoncesSearch, searchTerm, page],
    () => searchAnnonces(searchTerm, page),
    {
      enabled: enabled && searchTerm.length > 0,
      keepPreviousData: true,
    }
  );
}

// Fetch similar annonces by slug
async function fetchSimilarAnnoncesBySlug(annonceSlug: string) {
  try {
    const response = await apiClientV2.get(`/announces/${annonceSlug}/similar`);

    // Handle nested response structure {message: '...', data: [...]}
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data as Annonce[];
    }

    // Fallback for direct array response
    if (Array.isArray(response.data)) {
      return response.data as Annonce[];
    }

    return [] as Annonce[];
  } catch (error) {
    console.error("❌ fetchSimilarAnnoncesBySlug error:", error);
    return [] as Annonce[];
  }
}

// Fetch similar annonces (deprecated - use slug version)
async function fetchSimilarAnnonces(annonceId: number) {
  try {
    const response = await axiosConfig.get(`/announces/${annonceId}/similar`);

    // Handle nested response structure {message: '...', data: [...]}
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data as Annonce[];
    }

    // Fallback for direct array response
    if (Array.isArray(response.data)) {
      return response.data as Annonce[];
    }

    return [] as Annonce[];
  } catch (error) {
    console.error("❌ fetchSimilarAnnonces error:", error);
    return [] as Annonce[];
  }
}

/**
 * @description useSimilarAnnoncesBySlug hook to fetch similar annonces by slug
 * @returns useQuery object
 * @param annonceSlug annonce slug
 * @param enabled boolean value to enable or disable the query
 */
export function useSimilarAnnoncesBySlug(
  annonceSlug: string,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.annoncesSimilar, annonceSlug],
    () => fetchSimilarAnnoncesBySlug(annonceSlug),
    {
      enabled: enabled && !!annonceSlug,
    }
  );
}

/**
 * @description useSimilarAnnonces hook to fetch similar annonces
 * @returns useQuery object
 * @param annonceId annonce id
 * @param enabled boolean value to enable or disable the query
 */
export function useSimilarAnnonces(annonceId: number, enabled: boolean = true) {
  return useQuery(
    [QueryKeys.annoncesSimilar, annonceId],
    () => fetchSimilarAnnonces(annonceId),
    {
      enabled: enabled,
    }
  );
}

// Fetch user's annonces (requires authentication)
async function fetchUserAnnonces(token: string, page: number = 1) {
  try {
    const { data } = await apiClientV2.get("/my-announcements", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
      },
    });
    return data as Pagination<Annonce>;
  } catch (error) {
    console.error("❌ fetchUserAnnonces error:", error);
    throw error;
  }
}

export function useUserAnnonces(
  token: string,
  page: number = 1,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.annonces, "user", page],
    () => fetchUserAnnonces(token, page),
    {
      enabled: enabled && !!token,
      keepPreviousData: true,
    }
  );
}

// Fetch annonces by location (nearby)
async function fetchAnnoncesByLocation(
  latitude: number,
  longitude: number,
  radius: number = 20
) {
  try {
    // Try to fetch from the nearby endpoint if it exists
    try {
      const response = await axiosConfig.get("/announces/nearby", {
        params: {
          latitude,
          longitude,
          radius,
        },
      });

      // If the API returns { message: "...", data: [...] }
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data as Annonce[];
      }

      // If response.data is the array directly
      if (Array.isArray(response.data)) {
        return response.data as Annonce[];
      }

      return [] as Annonce[];
    } catch (nearbyError) {
      console.log(
        "Nearby endpoint not available, fetching all announcements instead"
      );
      // Fallback: If the nearby endpoint is not available, fetch all announcements
      const fallbackResponse = await axiosConfig.get("/announces", {
        params: {
          page: 1,
          sort_by: "newest",
        },
      });

      if (fallbackResponse.data && Array.isArray(fallbackResponse.data.data)) {
        return fallbackResponse.data.data as Annonce[];
      }

      if (Array.isArray(fallbackResponse.data)) {
        return fallbackResponse.data as Annonce[];
      }

      return [] as Annonce[];
    }
  } catch (error) {
    console.error("❌ fetchAnnoncesByLocation error:", error);
    return [] as Annonce[];
  }
}

export function useAnnoncesByLocation(
  latitude: number,
  longitude: number,
  radius: number = 20,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.annoncesLocation, latitude, longitude, radius],
    () => fetchAnnoncesByLocation(latitude, longitude, radius),
    {
      enabled: enabled && latitude !== 0 && longitude !== 0,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

async function createAnnonce(
  annonceData: CreateAnnonceData | FormData,
  token: string
): Promise<AnnonceResponse> {
  try {
    console.log("🚀 Creating annonce with data:", annonceData);

    let formData: FormData;

    // Check if data is already FormData
    if (annonceData instanceof FormData) {
      formData = annonceData;
    } else {
      // Create FormData from object
      formData = new FormData();

      // Add text fields
      formData.append("title", annonceData.title);
      formData.append("description", annonceData.description);
      formData.append("email", annonceData.email);
      formData.append("phone_number", annonceData.phone_number);
      formData.append("category_id", annonceData.category_id.toString());
      formData.append("city_id", annonceData.city_id.toString());
      formData.append("country_id", annonceData.country_id.toString());

      // Add subcategory if provided
      if (annonceData.subcategory_id) {
        formData.append(
          "subcategory_id",
          annonceData.subcategory_id.toString()
        );
      }

      // Add optional fields
      if (annonceData.announce_type) {
        formData.append("announce_type", annonceData.announce_type);
      }

      if (annonceData.item_condition) {
        formData.append("item_condition", annonceData.item_condition);
      }

      if (annonceData.price !== undefined) {
        formData.append("price", annonceData.price.toString());
      }

      // Add images
      if (annonceData.images && annonceData.images.length > 0) {
        annonceData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      // Add video if provided
      if (annonceData.video) {
        formData.append("video", annonceData.video);
      }
    }
    // Debug FormData contents
    console.log("📋 FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(
        `  ${key}:`,
        value instanceof File ? `File: ${value.name}` : value
      );
    }
    const response = await apiClientV2.post("/announces", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Annonce created successfully:", response.data);
    return response.data as AnnonceResponse;
  } catch (error) {
    console.error("❌ createAnnonce error:", error);
    // Enhanced error logging
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: {
          status?: number;
          statusText?: string;
          data?: unknown;
          headers?: unknown;
        };
      };
      console.error("📊 Error details:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers,
      });
    }

    throw error;
  }
}

async function updateAnnonce(
  annonceData: UpdateAnnonceData
): Promise<AnnonceResponse> {
  try {
    const formData = new FormData();

    // Add text fields if provided
    if (annonceData.title) formData.append("title", annonceData.title);
    if (annonceData.description)
      formData.append("description", annonceData.description);
    if (annonceData.email) formData.append("email", annonceData.email);
    if (annonceData.phone_number)
      formData.append("phone_number", annonceData.phone_number);
    if (annonceData.category_id)
      formData.append("category_id", annonceData.category_id.toString());
    if (annonceData.city_id)
      formData.append("city_id", annonceData.city_id.toString());
    if (annonceData.country_id)
      formData.append("country_id", annonceData.country_id.toString());
    if (annonceData.subcategory_id)
      formData.append("subcategory_id", annonceData.subcategory_id.toString());

    // Add method for Laravel
    formData.append("_method", "PUT");

    // Add images if provided
    if (annonceData.images && annonceData.images.length > 0) {
      annonceData.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
    }

    // Add video if provided
    if (annonceData.video) {
      formData.append("video", annonceData.video);
    }

    const response = await apiClientV2.post(
      `/announces/${annonceData.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data as AnnonceResponse;
  } catch (error) {
    console.error("❌ updateAnnonce error:", error);
    throw error;
  }
}

async function deleteAnnonce(id: number): Promise<void> {
  try {
    await axiosConfig.delete(`/announces/id/${id}`);
  } catch (error) {
    console.error("❌ deleteAnnonce error:", error);
    throw error;
  }
}

/**
 * Get annonce by ID
 * @param id Annonce ID
 * @returns Promise<Annonce>
 */
async function getAnnonceById(id: number): Promise<Annonce> {
  try {
    const response = await axiosConfig.get(`/announces/${id}`);

    if (response.data && response.data.data) {
      return response.data.data as Annonce;
    }

    return response.data as Annonce;
  } catch (error) {
    console.error("❌ getAnnonceById error:", error);
    throw error;
  }
}

// React Query Hooks for CRUD operations

/**
 * Hook to create a new annonce
 * @returns useMutation object for creating annonce
 */
export function useCreateAnnonce() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, token }: { data: CreateAnnonceData | FormData; token: string }) =>
      createAnnonce(data, token),
    {
      onSuccess: () => {
        // Invalidate and refetch annonces list
        queryClient.invalidateQueries(QueryKeys.annonces);
        queryClient.invalidateQueries(QueryKeys.annoncesFilter);
      },
    }
  );
}

/**
 * Hook to update an existing annonce
 * @returns useMutation object for updating annonce
 */
export function useUpdateAnnonce() {
  const queryClient = useQueryClient();
  return useMutation(updateAnnonce, {
    onSuccess: (data) => {
      // Invalidate and refetch annonces list
      queryClient.invalidateQueries(QueryKeys.annonces);
      queryClient.invalidateQueries(QueryKeys.annoncesFilter);
      // Update single annonce cache
      queryClient.setQueryData([QueryKeys.annonce, data.data.id], data.data);
    },
  });
}

/**
 * Hook to delete an annonce
 * @returns useMutation object for deleting annonce
 */
export function useDeleteAnnonce() {
  const queryClient = useQueryClient();
  return useMutation(deleteAnnonce, {
    onSuccess: () => {
      // Invalidate and refetch annonces list
      queryClient.invalidateQueries(QueryKeys.annonces);
      queryClient.invalidateQueries(QueryKeys.annoncesFilter);
    },
  });
}

/**
 * Hook to get annonce by ID
 * @param id Annonce ID
 * @param enabled Whether to enable the query
 * @returns useQuery object
 */
export function useAnnonce(id: number, enabled: boolean = true) {
  return useQuery([QueryKeys.annonce, id], () => getAnnonceById(id), {
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// API Response type for videos endpoint
interface VideosApiResponse {
  message: string;
  data: {
    items: Annonce[];
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
}

// Fetch videos from announces/videos endpoint
async function fetchVideos(
  page: number = 1,
  perPage: number = 10,
  filters: AnnonceFilter = {}
): Promise<Pagination<Annonce>> {
  try {
    const response = await apiClientV2.get<VideosApiResponse>(
      "/announces-with-videos",
      {
        params: {
          page,
          per_page: perPage,
          ...filters,
        },
      }
    );

    console.log("🎥 Videos API response:", response.data);

    // Handle the new API response format: { message: "...", data: { items: [...], pagination: {...} } }
    if (
      response.data &&
      response.data.data &&
      response.data.data.items &&
      response.data.data.pagination
    ) {
      const { items, pagination } = response.data.data;

      const result = {
        data: items,
        current_page: pagination.current_page,
        first_page_url: "",
        from: 0,
        last_page: pagination.last_page,
        last_page_url: "",
        per_page: pagination.per_page,
        total: pagination.total,
      } as Pagination<Annonce>;

      return result;
    }

    // If the response structure is unexpected, return empty pagination
    return response.data;
  } catch (error) {
    console.error("❌ fetchVideos error:", error);
    throw error;
  }
}

/**
 * @description useVideos hook to fetch videos from announces/videos endpoint
 * @returns useQuery object
 * @param page page number
 * @param perPage number of items per page
 * @param enabled boolean value to enable or disable the query
 */
export function useVideos(
  page: number = 1,
  perPage: number = 15,
  enabled: boolean = true
) {
  const result = useQuery(
    [QueryKeys.annonces, "videos", page, perPage],
    () => fetchVideos(page, perPage),
    {
      enabled: enabled,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  return result;
}

// announces-with-videos/:slug endpoint
async function fetchVideosBySlug(
  slug: string,
  page: number = 1,
  perPage: number = 10,
  filters: AnnonceFilter = {}
): Promise<PaginationV2<Annonce>> {
  const response = await apiClientV2.get(`/announces-with-videos/${slug}`, {
    params: {
      page,
      per_page: perPage,
      ...filters,
    },
  });

  return response.data;
}

export function useVideosBySlugInfinite({
  slug,
  perPage = 10,
  enabled = true,
  filters = {},
}: {
  slug: string;
  perPage?: number;
  enabled?: boolean;
  filters?: AnnonceFilter;
}) {
  return useInfiniteQuery(
    [
      QueryKeys.annonces,
      "videos",
      "slug",
      slug,
      perPage,
      JSON.stringify(filters),
    ],
    ({ pageParam = 1 }) => fetchVideosBySlug(slug, pageParam, perPage, filters),
    {
      enabled: enabled && !!slug,
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.meta.current_page < lastPage.meta.last_page) {
          return lastPage.meta.current_page + 1;
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// useInfiniteQuery version of useVideos
export function useInfiniteVideos({
  perPage = 10,
  enabled = true,
  filters = {},
}: {
  perPage?: number;
  enabled?: boolean;
  filters?: AnnonceFilter;
}) {
  return useInfiniteQuery(
    [QueryKeys.annoncesInfinite, "videos", perPage],
    ({ pageParam = 1 }) => fetchVideos(pageParam, perPage, filters),
    {
      enabled: enabled,
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.current_page < lastPage.last_page) {
          return lastPage.current_page + 1;
        }
        return undefined;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}
