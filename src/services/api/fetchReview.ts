import { useQuery, useMutation } from 'react-query';

import axios from '../config/axiosConfig';
import { QueryKeys } from '../../utils/QueryKeys';
import { Pagination } from '../types/pagination';
import { Review } from '../types/review';

// /Avis_Prestation by id
async function fetchReviewsById(id: number, page: number) {
  const { data } = await axios.get(`/Avis_Prestation/${id}?page=${page}`);
  return data as Pagination<Review>;
}

/**
 * @description useReviewsById hook to get reviews by id prestation
 * @returns useQuery object
 * @param id // id prestataire
 * @param page // page number
 * @returns Pagination<Review>
 */
export function useReviewsById(id: number, page: number) {
  return useQuery([QueryKeys.reviewById + id + page, id, page], async () => await fetchReviewsById(id, page));
}

// /avis add review to prestation
async function addReview({ rate, comment, prestataire_id, token }: { rate: string, comment: string, prestataire_id: number, token: string }) {
  const { data } = await axios.post(`/avis`, { rate, comment, prestataire_id }, { headers: { Authorization: `Bearer ${token}` } });
  return data as Review;
}

/**
 * @description useAddReview hook to add review to prestation
 * @returns useMutation object
 * @param rate // rate
 * @param comment // comment
 * @param prestation_id // prestation id
 */

export function useAddReview() {
  return useMutation(addReview)
}
