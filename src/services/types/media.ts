export type Media = {
  id: number
  model_type: string
  model_id: number
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: []
  custom_properties: []
  generated_conversions: []
  responsive_images: []
  order_column: number
  created_at: string
  original_url: string
  preview_url: string
}