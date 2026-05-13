import { useMutation } from 'react-query'
import axiosConfig from '../config/axiosConfig'

// Type for the publish annonce form data
export type PublishAnnonceData = {
  title: string
  description: string
  email: string
  phone_number: string
  category_id: number
  subcategory_id?: number
  city_id: number
  country_id: number
  images: File[]
  video?: File
}

// Response type
export type PublishAnnonceResponse = {
  message: string
  data: {
    id: number
    title: string
    description: string
    email: string
    phone_number: string
    category_id: number
    subcategory_id?: number
    city_id: number
    country_id: number
    created_at: string
    updated_at: string
  }
}

// Function to publish annonce
async function publishAnnonce(data: PublishAnnonceData, token: string): Promise<PublishAnnonceResponse> {
  const formData = new FormData()
  
  // Add basic fields
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('email', data.email)
  formData.append('phone_number', data.phone_number)
  formData.append('category_id', data.category_id.toString())
  formData.append('city_id', data.city_id.toString())
  formData.append('country_id', data.country_id.toString())
  
  // Add subcategory if provided
  if (data.subcategory_id) {
    formData.append('subcategory_id', data.subcategory_id.toString())
  }
  
  // Add images (required)
  data.images.forEach((image, index) => {
    formData.append(`images[${index}]`, image)
  })
  
  // Add video if provided (optional)
  if (data.video) {
    formData.append('video', data.video)
  }

  const response = await axiosConfig.post('/announces', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

/**
 * Hook to publish an annonce
 * @returns useMutation object for publishing annonce
 */
export function usePublishAnnonce() {
  return useMutation(
    ({ data, token }: { data: PublishAnnonceData; token: string }) => 
      publishAnnonce(data, token)
  )
}
