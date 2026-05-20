import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

import CustomToast from '../common/CustomToast'
import { SelectType, villeSelect } from '../../services/types/select'
import { useCategories1, useSubcategories } from '../../services/api/fetchCategory'
import { useFetchCountries } from '../../services/api/fetchCountry'
import { useFetchCity } from '../../services/api/fetchCity'
import { useCreateAnnonce, CreateAnnonceData } from '../../services/api/fetchAnnonce'
import { useAnnonceTypes } from '../../services/api/fetchAnnonceTypes'
import { SelectStyles, CategorySelectStyles } from '../../utils/style'
import getLocalized from '../../utils/getLocalized'
import { useAuthStore } from '../../services/store/authStore'
import { useFirebaseUpload } from '../../hooks/useFirebaseUpload'
import { STORAGE_FOLDERS } from '../../services/firebase/storageService'

interface CreateAnnonceFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const CreateAnnonceForm: React.FC<CreateAnnonceFormProps> = ({ onSuccess, onCancel }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: categoriesData } = useCategories1()
  const { data: countriesData } = useFetchCountries()
  const { data: citiesData } = useFetchCity()
  const { data: annonceTypesData, isLoading: annonceTypesLoading, error: annonceTypesError } = useAnnonceTypes()
  const createAnnonceMutation = useCreateAnnonce()
  const { token } = useAuthStore()
  const { uploadFiles, uploadSingleFile, isUploading } = useFirebaseUpload(STORAGE_FOLDERS.ANNONCE_IMAGES)

  // Debug logging for announcement types
  useEffect(() => {
    console.log('🔍 Announcement types debug:', {
      data: annonceTypesData,
      loading: annonceTypesLoading,
      error: annonceTypesError
    })
  }, [annonceTypesData, annonceTypesLoading, annonceTypesError])

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    phone_number: '',
    announce_type: '',
    item_condition: '',
    price: '',
  })

  // Selection state
  const [selectedCategory, setSelectedCategory] = useState<SelectType | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<SelectType | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<SelectType | null>(null)
  const [selectedCity, setSelectedCity] = useState<villeSelect | null>(null)

  // Media state
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  // Fetch subcategories based on selected category
  const { data: subcategoriesData, isLoading: subcategoriesLoading } = useSubcategories(
    selectedCategory?.value ?? 0,
    !!selectedCategory
  )

  // Filter cities based on selected country
  const availableCities = Array.isArray(citiesData) ? citiesData.filter(city => 
    selectedCountry ? city.country_id === selectedCountry.value : true
  ) : []

  // Reset city when country changes
  useEffect(() => {
    setSelectedCity(null)
  }, [selectedCountry])

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory(null)
  }, [selectedCategory])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
      if (files.length + selectedImages.length > 5) {
      CustomToast(t('Maximum 5 images allowed', 'Maximum 5 images autorisées'), 'error')
      return
    }

    // Create previews
    const newPreviews: string[] = []
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string)
        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })

    setSelectedImages(prev => [...prev, ...files])
  }

  // Handle video selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        CustomToast(t('Video file too large (max 50MB)', 'Fichier vidéo trop volumineux (max 50MB)'), 'error')
        return
      }
      setSelectedVideo(file)
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // Remove video
  const removeVideo = () => {
    setSelectedVideo(null)
  }
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🔍 Form submission started...')
    console.log('📝 Form data:', formData)
    console.log('🏷️ Selected category:', selectedCategory)
    console.log('🏷️ Selected subcategory:', selectedSubcategory)
    console.log('🌍 Selected country:', selectedCountry)
    console.log('🏙️ Selected city:', selectedCity)
    console.log('🖼️ Selected images:', selectedImages)
    console.log('🎥 Selected video:', selectedVideo)// Validation
    if (!formData.title.trim()) {
      CustomToast(t('Title is required', 'Le titre est requis'), 'error')
      return
    }
    if (!formData.description.trim()) {
      CustomToast(t('Description is required', 'La description est requise'), 'error')
      return
    }
    if (!formData.email.trim()) {
      CustomToast(t('Email is required', 'L\'email est requis'), 'error')
      return
    }
    if (!formData.phone_number.trim()) {
      CustomToast(t('Phone number is required', 'Le numéro de téléphone est requis'), 'error')
      return
    }
    if (!selectedCategory) {
      CustomToast(t('Category is required', 'La catégorie est requise'), 'error')
      return
    }
    if (!selectedCountry) {
      CustomToast(t('Country is required', 'Le pays est requis'), 'error')
      return
    }
    if (!selectedCity) {
      CustomToast(t('City is required', 'La ville est requise'), 'error')
      return
    }

    const annonceData: CreateAnnonceData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      category_id: selectedCategory.value,
      city_id: selectedCity.value,
      country_id: selectedCountry.value,
      images: selectedImages.length > 0 ? selectedImages : undefined,
      video: selectedVideo || undefined,
      announce_type: formData.announce_type || undefined,
      item_condition: formData.item_condition || undefined,
      price: formData.price !== '' ? Number(formData.price) : undefined,
    }

    if (selectedSubcategory) {
      annonceData.subcategory_id = selectedSubcategory.value
    }    try {
      if (!token) {
        CustomToast(t('You must be logged in to create an annonce', 'Vous devez être connecté pour créer une annonce'), 'error')
        return
      }

      // Upload files to Firebase first
      let imageUrls: string[] = []
      let videoUrl: string | undefined

      if (selectedImages.length > 0) {
        const imageResults = await uploadFiles(selectedImages)
        imageUrls = imageResults.map(result => result.url)
      }

      if (selectedVideo) {
        const videoResult = await uploadSingleFile(selectedVideo, STORAGE_FOLDERS.ANNONCE_VIDEOS)
        videoUrl = videoResult.url
      }

      // Create payload with Firebase URLs instead of files
      const payload = new FormData();
      payload.append('title', annonceData.title);
      payload.append('description', annonceData.description);
      payload.append('email', annonceData.email);
      payload.append('phone_number', annonceData.phone_number);
      payload.append('category_id', String(annonceData.category_id));
      payload.append('city_id', String(annonceData.city_id));
      payload.append('country_id', String(annonceData.country_id));
      if (annonceData.subcategory_id) payload.append('subcategory_id', String(annonceData.subcategory_id));
      payload.append('announce_type', (annonceData.announce_type ?? ''));
      payload.append('item_condition', (annonceData.item_condition ?? ''));
      payload.append('price', annonceData.price !== undefined && annonceData.price !== null ? String(annonceData.price) : '');

      // ✅ By default, make the annonce active after publishing.
      // The backend appears to use `activation_status` and/or `is_active`.
      // We send BOTH to be safe.
      payload.append('activation_status', 'active');
      payload.append('is_active', '1');
      // Extra compatibility (in case backend expects boolean string)
      payload.append('is_active', 'true');
      
      // Send Firebase URLs in the format backend expects
      imageUrls.forEach((url, idx) => payload.append(`image_urls[${idx}]`, url));
      if (videoUrl) payload.append('video_url', videoUrl);

      await createAnnonceMutation.mutateAsync({ data: payload, token })
      CustomToast(t('Annonce created successfully!', 'Annonce créée avec succès !'), 'success')
      onSuccess?.()
    } catch (error: unknown) {
      console.error('💥 Mutation error caught in form:', error)
      
      let errorMessage = t('Failed to create annonce', 'Échec de la création de l\'annonce')
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        console.error('🔍 Detailed error response:', axiosError.response)
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message
        }
      }
      
      // Check if the error is about reaching the annonce limit
      const limitErrorMessage = "Error icon Vous avez atteint la limite de 3 annonces. Veuillez créer une entreprise pour publier plus d'annonces."
      
      if (errorMessage.includes("Vous avez atteint la limite de 3 annonces") || 
          errorMessage.includes("limite de 3 annonces") ||
          errorMessage === limitErrorMessage) {
        
        // Show info toast with immediate redirect option
        CustomToast(
          t('You have reached the limit of 3 announcements. Redirecting to company creation...', 
            'Vous avez atteint la limite de 3 annonces. Redirection vers la création d\'entreprise...'), 
          'info'
        )
        
        // Simple timeout redirect - more reliable
        setTimeout(() => {
          console.log('🔀 Redirecting to company creation page...')
          navigate('/user-account/company')
        }, 3000) // 3 seconds to read the message
        
      } else {
        // Show regular error toast for other errors
        CustomToast(errorMessage, 'error')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('Create New Annonce', 'Créer une nouvelle annonce')}
        </h2>
        <p className="text-gray-600">
          {t('Fill in the details to publish your annonce', 'Remplissez les détails pour publier votre annonce')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Title', 'Titre')} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('Enter annonce title', 'Entrez le titre de l\'annonce')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Email', 'Email')} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('Enter your email', 'Entrez votre email')}
              required
            />
          </div>
        </div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {t('Phone Number', 'Numéro de téléphone')} *
  </label>
  <input
    type="tel"
    name="phone_number"
    value={formData.phone_number}
    onChange={handleInputChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder={t('Enter your phone nuawaitmber', 'Entrez votre numéro de téléphone')}
    required
  />
</div>



       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("Type d'annonce", "Type d'annonce")}
            </label>
            <select
              name="announce_type"
              value={formData.announce_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('Select type', 'Sélectionnez le type')}</option>
              {annonceTypesLoading && (
                <option disabled>Loading types...</option>
              )}
              {annonceTypesData?.map((type) => {
                console.log('🎯 Rendering option:', type)
                return (
                  <option key={type.id} value={type.value}>
                    {getLocalized(type, 'label') || type.label}
                  </option>
                )
              })}
              {!annonceTypesLoading && (!annonceTypesData || annonceTypesData.length === 0) && (
                <option disabled>No types available</option>
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("État de l'article", "État de l'article")}
            </label>
            <select
              name="item_condition"
              value={formData.item_condition}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{t('Select condition', 'Sélectionnez l\'état')}</option>
              <option value="new">{t('Neuf', 'Neuf')}</option>
              <option value="used">{t('Occasion', 'Occasion')}</option>
              <option value="good_condition">{t('Bon état', 'Bon état')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Prix (DH)', 'Prix (DH)')}
            </label>
            <input
              type="number"
              name="price"
              min={0}
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('Prix (DH)', 'Prix (DH)')}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('Description', 'Description')} *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('Describe your service or product', 'Décrivez votre service ou produit')}
            required
          />
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Category', 'Catégorie')} *
            </label>
            <Select
              placeholder={t('Select a category', 'Sélectionnez une catégorie')}
                options={
                categoriesData?.map((category) => ({
                  label: getLocalized(category, 'label') || category.label || '',
                  value: category.id
                })) || []
              }
              {...CategorySelectStyles}
              isClearable
              onChange={(value) => setSelectedCategory(value as unknown as SelectType)}
              value={selectedCategory ? { label: selectedCategory.label, value: selectedCategory.value } : undefined}
            />
          </div>

          {selectedCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Subcategory', 'Sous-catégorie')}
              </label>
              <Select
                placeholder={
                  subcategoriesLoading
                    ? t('Loading subcategories...', 'Chargement des sous-catégories...')
                    : t('Select a subcategory', 'Sélectionnez une sous-catégorie')
                }
                options={
                  subcategoriesData?.map((subcategory) => ({
                    label: getLocalized(subcategory, 'label') || subcategory.label || '',
                    value: subcategory.id
                  })) || []
                }
                {...CategorySelectStyles}
                isClearable
                isLoading={subcategoriesLoading}
                isDisabled={subcategoriesLoading || !subcategoriesData?.length}
                onChange={(value) => setSelectedSubcategory(value as unknown as SelectType)}
                value={selectedSubcategory ? { label: selectedSubcategory.label, value: selectedSubcategory.value } : undefined}
              />
            </div>
          )}
        </div>

        {/* Location Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Country', 'Pays')} *
            </label>
            <Select
              placeholder={t('Select a country', 'Sélectionnez un pays')}
                options={
                (countriesData && Array.isArray(countriesData) ? countriesData : []).map((country) => ({
                  label: getLocalized(country, 'label') || country.label,
                  value: country.id
                }))
              }
              {...SelectStyles}
              isClearable
              onChange={(value) => setSelectedCountry(value as unknown as SelectType)}
              value={selectedCountry ? { label: selectedCountry.label, value: selectedCountry.value } : undefined}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('City', 'Ville')} *
            </label>
            <Select
              placeholder={
                !selectedCountry 
                  ? t('Select a country first', 'Sélectionnez d\'abord un pays')
                  : availableCities.length === 0
                  ? t('No cities available', 'Aucune ville disponible')
                  : t('Select a city', 'Sélectionnez une ville')
              }
                options={
                availableCities.map((city) => ({
                  label: getLocalized(city, 'label') || city.label,
                  value: city.id
                }))
              }
              {...SelectStyles}
              isClearable
              isDisabled={!selectedCountry || availableCities.length === 0}
              onChange={(value) => setSelectedCity(value as unknown as villeSelect)}
              value={selectedCity ? { label: selectedCity.label, value: selectedCity.value } : undefined}
            />
          </div>
        </div>

        {/* Media Upload */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Images', 'Images')} ({t('max 5', 'max 5')})
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('Video', 'Vidéo')} ({t('optional', 'optionnel')})
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {selectedVideo && (
              <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
                <span className="text-sm text-gray-700">{selectedVideo.name}</span>
                <button
                  type="button"
                  onClick={removeVideo}
                  className="text-red-500 hover:text-red-700"
                >
                  {t('Remove', 'Supprimer')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={createAnnonceMutation.isLoading || isUploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {isUploading 
              ? t('Uploading files...', 'Téléchargement des fichiers...') 
              : createAnnonceMutation.isLoading 
              ? t('Creating...', 'Création en cours...') 
              : t('Create Annonce', 'Créer l\'annonce')
            }
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('Cancel', 'Annuler')}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateAnnonceForm
