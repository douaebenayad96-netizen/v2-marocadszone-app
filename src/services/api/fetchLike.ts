import { useMutation, useQuery } from "react-query";

import { QueryKeys } from "../../utils/QueryKeys";
import {
  default as axios,
  default as axiosConfig,
} from "../config/axiosConfig";
import { Pagination } from "../types/pagination";
import { Prestataire } from "../types/prestataire";

// /check-favorite
async function fetchCheckFavorite(prestataire_id: number, token: string) {
  const { data } = await axios.get(`/check-favorite`, {
    params: {
      prestataire_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data as { is_favorited: true | false };
}

/**
 * @description useCheckFavorite hook to check if prestation is favorited
 * @returns useQuery object
 * @param prestataire_id
 * @param token
 */
export function useCheckFavorite(
  prestataire_id: number,
  token: string,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.checkFavorite + prestataire_id + token, prestataire_id],
    () => fetchCheckFavorite(prestataire_id, token),
    {
      enabled,
      // stop caching
      cacheTime: 0,
    }
  );
}

// /favoris - add prestation to favorites or remove it
async function fetchAddOrRemoveFavorite({
  prestataire_id,
  token,
}: {
  prestataire_id: number;
  token: string;
}) {
  const { data } = await axios.post(
    `/favoris`,
    {
      prestataire_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

/**
 * @description useAddOrRemoveFavorite hook to add or remove prestation from favorites
 * @returns useMutation object
 * @param token
 * @param prestataire_id
 */
export function useAddOrRemoveFavorite() {
  return useMutation(QueryKeys.addOrRemoveFavorite, fetchAddOrRemoveFavorite);
}

// /favoris - get user favorites prestation list
async function fetchGetFavorites({
  token,
  page,
}: {
  token: string;
  page: number;
}) {
  const { data } = await axios.get(`/favoris?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.favorited_prestations as Pagination<Prestataire>;
}

/**
 * @description useGetFavorites hook to get user favorites prestation list
 * @returns useQuery object
 * @param token
 * @param enabled - enable or disable the query
 */
export function useGetFavorites(
  token: string,
  page: number,
  enabled: boolean = true
) {
  return useQuery(
    [QueryKeys.getFavorites + page, token],
    () => fetchGetFavorites({ token, page }),
    {
      enabled,
      // stop caching
      cacheTime: 0,
    }
  );
}

export const likeVideo = async (videoId: number) => {
  const response = await axiosConfig.put(
    `announcements/${videoId}/toggle-like`
  );
  return response.data;
};
