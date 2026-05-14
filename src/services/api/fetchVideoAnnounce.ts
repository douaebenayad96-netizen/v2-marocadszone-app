import { useMutation, useQueryClient } from "react-query";
import CustomToast from "../../components/common/CustomToast";
import { QueryKeys } from "../../utils/QueryKeys";
import { apiClientV2 } from "../config/axiosConfig";

// Type for video announcement response
export interface VideoAnnounceResponse {
  message: string;
  data: {
    id: number;
    title: string;
    user_id: number;
    video_url: string;
    contact_type: "phone" | "url";
    phone_number?: string;
    url?: string;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Create a new video announcement
 * @param formData FormData containing video announcement details
 * @returns Promise with the response
 */
async function postVideoAnnounce(
  formData: FormData
): Promise<VideoAnnounceResponse> {
  try {
    for (const [key, value] of formData.entries()) {
      console.log(
        `  ${key}:`,
        value instanceof File ? `File: ${value.name}` : value
      );
    }

    const response = await apiClientV2.post("/video-announces", formData);

    return response.data as VideoAnnounceResponse;
  } catch (error) {
    console.error("❌ postVideoAnnounce error:", error);

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

/**
 * Hook to create a new video announcement
 * @returns useMutation object for creating video announcement
 */
export function usePostVideoAnnounce() {
  const queryClient = useQueryClient();

  return useMutation((data: FormData) => postVideoAnnounce(data), {
    onSuccess: () => {
      // Invalidate and refetch annonces list
      queryClient.invalidateQueries(QueryKeys.annonces);
    },
  });
}

/**
 * Fetch video announcements
 * @param userId User ID
 * @param page Page number
 * @returns Promise with the response
 */
export async function fetchVideoAnnounces(userId: number, page: number = 1) {
  try {
    console.log("🚀 Fetching video announcements");

    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime();

    // Use the correct endpoint for video announcements
    const response = await apiClientV2.get("/video-announces", {
      params: {
        _t: timestamp, // Cache busting parameter
      },
    });

    console.log("🎥 Video announcements response:", response.data);

    // Return the raw response for debugging
    return { data: response.data };
  } catch (error) {
    console.error("❌ fetchVideoAnnounces error:", error);
    // Return empty data on error
    return { data: [] };
  }
}

/**
 * Delete a video announcement
 * @param id Video announcement ID
 * @returns Promise with the response
 */
async function deleteVideoAnnounce(id: number) {
  try {
    console.log("🗑️ Deleting video announcement:", id);

    const response = await apiClientV2.delete(`/video-announces/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ deleteVideoAnnounce error:", error);
    throw error;
  }
}

/**
 * Hook to delete a video announcement
 * @returns useMutation object for deleting video announcement
 */
export function useDeleteVideoAnnounce() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteVideoAnnounce(id), {
    onSuccess: () => {
      // Invalidate and refetch annonces list
      queryClient.invalidateQueries(QueryKeys.annonces);
      CustomToast("Annonce vidéo supprimée avec succès", "success");
    },
    onError: () => {
      CustomToast("Erreur lors de la suppression de l'annonce vidéo", "error");
    },
  });
}
