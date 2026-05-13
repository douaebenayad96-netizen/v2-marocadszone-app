import { useMutation, useQuery } from "react-query";

import { QueryKeys } from "../../utils/QueryKeys";
import axios, { apiClientV2 } from "../config/axiosConfig";
import { TCandidatures } from "../types/candidature";
import { UpdateDemande } from "../types/demandeType";
import { TJobOfferFilters, TJobOfferSingleResponse } from "../types/jobOffer";
import { TPostJobResponse } from "../types/postJobType";
import { TService } from "../types/serviceType";
import { mockJobOffers } from "./mockData";

// Create Annonce POST (Protected endpoint - requires authentication)
async function createAnnonce(postData: FormData) {
  // Retrieve token for authentication
  const {
    state: { token },
  } = JSON.parse(localStorage.getItem("auth-storage") as string);

  if (!token) {
    throw new Error("Authentication required. Please login first.");
  }

  // Check if token looks like a Firebase token (JWT format)
  if (token.startsWith("eyJ") && token.split(".").length === 3) {
    throw new Error("Invalid authentication token. Please login again.");
  }

  for (const pair of postData.entries()) {
    console.log("🚀 [CreateAnnonce] FormData -", pair[0] + ":", pair[1]);
  }
  try {
    const { data } = await apiClientV2.post("/announces", postData, {
      headers: {
        // Don't set Content-Type for FormData - let axios handle it automatically
        Authorization: `Bearer ${token}`,
      },
    });

    return data as TPostJobResponse;
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; statusText?: string; data?: unknown };
      };
    }

    throw error;
  }
}

/**
 * useCreateAnnonce is a custom hook that uses react-query's useMutation to create an annonce (protected endpoint)
 * @returns
 */
export function useCreateAnnonce() {
  return useMutation((postData: FormData) => createAnnonce(postData));
}

// Keep the old hook name for backward compatibility
export function usePostPrestation() {
  return useMutation((postData: FormData) => createAnnonce(postData));
}

// /Prestations/{id} GET
async function getPrestation(id: string, token: string) {
  const { data } = await axios.get(`/Prestations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as TService;
}

/**
 * useGetPrestation is a custom hook that uses react-query's useQuery to get a job
 * @param id
 * @param token
 * @returns
 */
export function useGetPrestation(id: string, token: string, enabled = true) {
  return useQuery(
    [QueryKeys.PRESTATIONOFEERS + id],
    () => getPrestation(id, token),
    {
      enabled,
    }
  );
}

// /Candidatures-By-prestation/84 GET Conidatures by demande id
async function getCandidaturesByPrestation(id: string, token: string) {
  const { data } = await axios.get(`/Candidatures-By-prestation/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as TCandidatures[];
}

/**
 * useGetCandidaturesByPrestation is a custom hook that uses react-query's useQuery to get candidatures by prestation
 * @param id
 * @param token
 * @returns
 */
export function useGetCandidaturesByPrestation(
  id: string,
  token: string,
  enabled = true
) {
  return useQuery(
    [QueryKeys.CANDIDATURES + id],
    () => getCandidaturesByPrestation(id, token),
    {
      enabled,
    }
  );
}

// edit /Prestations/{id} PUT id demand
async function editPrestation(
  id: string,
  postData: UpdateDemande,
  token: string
) {
  const { data } = await axios.put(`/Prestations/${id}`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as TPostJobResponse;
}

/**
 * useEditPrestation is a custom hook that uses react-query's useMutation to edit a job
 * @param token
 * @param id // id demand
 * @returns
 */
export function useEditPrestation(id: string, token: string) {
  return useMutation((postData: UpdateDemande) =>
    editPrestation(id, postData, token)
  );
}

// /desactiverPrestation/96 POST
async function desactiverPrestation(id: string, token: string) {
  const { data } = await axios.post(`/desactiverPrestation/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * useDesactiverPrestation is a custom hook that uses react-query's useMutation to desactiver a job
 * @param token
 * @returns
 */
export function useDesactiverPrestation(token: string) {
  return useMutation((id: string) => desactiverPrestation(id, token));
}

// Job Offers API Functions (Backend: /job-offers, Frontend: /emploi)

// GET /job-offers - Get all job offers with optional filters
async function getJobOffers(filters?: TJobOfferFilters) {
  const params = new URLSearchParams();
  // Use ville parameter instead of city_id and city_name
  if (filters?.ville) params.append("ville", filters.ville);
  if (filters?.type) params.append("type", filters.type);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.sort_by) params.append("sort_by", filters.sort_by);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.per_page) params.append("per_page", filters.per_page.toString());

  const queryString = params.toString();
  const url = queryString ? `/job-offers?${queryString}` : "/job-offers";

  try {
    const { data } = await axios.get(url);
    console.log("new data", data);

    return data;
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; statusText?: string; data?: unknown };
      };
      console.error(
        "🚀 [GetJobOffers] HTTP Status:",
        axiosError.response?.status
      );
      console.error(
        "🚀 [GetJobOffers] Status Text:",
        axiosError.response?.statusText
      );
      console.error(
        "🚀 [GetJobOffers] Response Data:",
        axiosError.response?.data
      );

      if (axiosError.response?.status === 404) {
        console.error(
          "🚀 [GetJobOffers] Endpoint not found - check if /job-offers endpoint exists on server"
        );
      } else if (axiosError.response?.status === 500) {
        console.error("🚀 [GetJobOffers] Server error - check server logs");
      }
    }

    throw error;
  }
}

/**
 * useGetJobOffers is a custom hook that uses react-query's useQuery to get job offers
 * @param filters - Optional filters for job offers
 * @param enabled - Whether the query should be enabled
 * @returns
 */
export function useGetJobOffers(filters?: TJobOfferFilters) {
  const queryKey = [QueryKeys.emploi, filters];
  const { data, isLoading, isError } = useQuery(queryKey, () =>
    getJobOffers(filters)
  );

  return { data, isLoading, isError };
}

// GET /job-offers/{id} - Get a specific job offer by ID
async function getJobOffer(
  id: string | number
): Promise<TJobOfferSingleResponse> {
  // Check if mock data should be used
  if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const jobOffer = mockJobOffers.find((job) => job.id === Number(id));
    if (!jobOffer) {
      throw new Error(`Job offer with ID ${id} not found`);
    }

    // Return in the same format as the API
    return {
      message: "Job offer retrieved successfully",
      data: jobOffer,
    };
  }

  try {
    const { data } = await axios.get(`/job-offers/${id}`);

    // The API returns {message: "...", data: TJobOffer}
    // We need to return the entire response to maintain consistency
    return data as TJobOfferSingleResponse;
  } catch (error) {
    console.error("🚀 [GetJobOffer] Error details:", error);
    throw error;
  }
}

/**
 * useGetJobOffer is a custom hook that uses react-query's useQuery to get a specific job offer
 * @param id - Job offer ID
 * @param enabled - Whether the query should be enabled
 * @returns
 */
export function useGetJobOffer(id: string | number, enabled = true) {
  return useQuery<TJobOfferSingleResponse>(
    [QueryKeys.emploiDetails, id],
    () => getJobOffer(id),
    { enabled }
  );
}

// GET /job-offers/slug/{slug} - Get a specific job offer by slug
async function getJobOfferBySlug(
  slug: string
): Promise<TJobOfferSingleResponse> {
  try {
    const { data } = await axios.get(`/job-offers/slug/${slug}`);

    return data as TJobOfferSingleResponse;
  } catch (error) {
    console.error("🚀 [GetJobOfferBySlug] Error details:", error);
    throw error;
  }
}

/**
 * useGetJobOfferBySlug is a custom hook that uses react-query's useQuery to get a specific job offer by slug
 * @param slug - Job offer slug
 * @param enabled - Whether the query should be enabled
 * @returns
 */
export function useGetJobOfferBySlug(slug: string, enabled = true) {
  return useQuery<TJobOfferSingleResponse>(
    [QueryKeys.emploiSlug, slug],
    () => getJobOfferBySlug(slug),
    { enabled: enabled && !!slug }
  );
}
