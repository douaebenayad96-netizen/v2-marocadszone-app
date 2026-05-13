import { useQuery } from 'react-query';

import axios from '../config/axiosConfig';
import { QueryKeys } from '../../utils/QueryKeys';
import { Blog } from '../types/city';

// /cities is the endpoint to fetch all cities
export const fetchBlog = async () => {
  const { data } = await axios.get(`/blogs`);
  return data.Blogs as Blog[];
}

export const useFetchBlog = () => {
  return useQuery(QueryKeys.blogs, fetchBlog);
}


async function fetchBlogById(id: number) {
  const { data } = await axios.get(`/blogs/${id}`)
  return data.Blog as Blog
}
export function useBlogDetails(id: number, enabled = true) {
  return useQuery([QueryKeys.blogs + id, id], () => fetchBlogById(id), {
    enabled,
  })
}
