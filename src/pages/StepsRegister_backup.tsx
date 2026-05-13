import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import { SelectType } from "../services/types/select"
import { useAuthStore } from "../services/store/authStore"
import { Category, Profession } from "../services/types/category"
import { usePostPrestation } from "../services/api/fetchService"
import CustomToast from "../components/common/CustomToast"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import NoUserStep from "../components/annonce/NoUserStep"
import InfoFormStep from "../components/annonce/InfoFormStep"
import PhotosSelectStep from "../components/annonce/PhotoUpdate"
import ContactStep from "../components/contact/ContactStep"
import { cn } from "../utils/helpers"
import { useFirebaseUpload } from "../hooks/useFirebaseUpload"
import { STORAGE_FOLDERS } from "../services/firebase/storageService"
import { cleanupUploadedFiles } from "../utils/firebaseUtils"
import { getStorageConfig } from "../utils/firebaseStorageTest"

export type ProgressSteps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type PostJobPageState = {
  selectedCategory: Category
  selectedMetier: Profession
}

export type AddressType = {
  address: string
  zip: string
  city: SelectType

}

export type FormValues = {
  firstname: string
  lastname: string
  email: string
  phone: string
  latitude: string
  longitude: string
  adresse: string
  password: string
  city: {
    value: string;
    label: string;
  };
  country: {
    value: string;
    label: string;
  };
  zio: string
  category: {
    label: string;
    value: string;
  };
  subCategory: {
    label: string;
    value: string;
  };
  isStepValid: boolean;
  title: string;
  description: string;
  photos: File[];
  announcementType: string;
  condition: string;
  price: string;
  video: File | undefined;
  // Firebase Storage URLs
  photoUrls?: string[];
  videoUrl?: string;
}
export type category = {
  label: string
  value: string
}
export type metier = {
  label: string
  value: string
}

const StepsRegister = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)
  const [step, setStep] = useState<ProgressSteps>(0)
  const { mutateAsync: savePost, isLoading } = usePostPrestation()
  const form = useForm<FormValues>()
  
  // Firebase upload hooks
  const { uploadFiles: uploadImages, isUploading: isUploadingImages } = useFirebaseUpload(STORAGE_FOLDERS.ANNONCE_IMAGES)
  const { uploadSingleFile: uploadVideo, isUploading: isUploadingVideo } = useFirebaseUpload(STORAGE_FOLDERS.ANNONCE_VIDEOS)
  
  // Test Firebase Storage connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔥 [StepsRegister] Testing Firebase Storage connection...')
        getStorageConfig()
        
        // Create a simple test file for connection test
        const testContent = 'Firebase Storage Test';
        const testFile = new File([testContent], 'connection-test.txt', { type: 'text/plain' });
        
        console.log('🔥 [StepsRegister] Uploading test file...')
        const testResult = await uploadImages([testFile])
        
        console.log('🔥 [StepsRegister] Test upload successful:', testResult)
        console.log('🔥 [StepsRegister] Firebase Storage connection test passed!')
      } catch (error) {
        console.error('🔥 [StepsRegister] Firebase Storage connection test failed:', error)
        
        // Provide specific error messages
        if (error instanceof Error) {
          if (error.message.includes('storage/unauthorized')) {
            CustomToast(t('Erreur d\'autorisation Firebase Storage. Vérifiez les règles de sécurité.', 'Firebase Storage authorization error. Check security rules.'), 'error')
          } else if (error.message.includes('network')) {
            CustomToast(t('Erreur de réseau. Vérifiez votre connexion internet.', 'Network error. Check your internet connection.'), 'error')
          } else {
            CustomToast(t('Problème de connexion Firebase Storage', 'Firebase Storage connection issue'), 'error')
          }
        }
      }
    }
    
    // Only run test in development
    if (import.meta.env.DEV) {
      testConnection()
    }
  }, [t, uploadImages])
  // const coordinates = { latitude: form.getValues('latitude'), longitude: form.getValues('longitude') };
  // // Stringify coordinates object
  // const coordinatesString = JSON.stringify(coordinates);
  // console.log(coordinatesString)
  // default values
  useEffect(() => {
    form.setValue('email', user?.email || '')
    form.setValue('phone', user?.phone_number || '')
  }, [user, form])
    const handleSubmit = async () => {
    // Only handle actual submission on the final step (step 3)
    if (step !== 3 || !form.getValues('email') || !form.getValues('phone')) {
      return
    }

    if (isLoading || isUploadingImages || isUploadingVideo) return
        // Debug form submission
      console.log('🚀 [StepsRegister] Submitting annonce with Firebase Storage integration')
      console.log('🚀 [StepsRegister] User:', user)
      console.log('🚀 [StepsRegister] User ID:', user?.id)      // Check if user is authenticated
      if (!user || (!user.id && !user.email)) {
        console.error('🚀 [StepsRegister] User must be authenticated to create an annonce')
        console.error('🚀 [StepsRegister] Current user object:', user)
        CustomToast(t('Vous devez être connecté pour publier une annonce', 'You must be logged in to publish an annonce'), 'error')
        navigate('/login') // Redirect to login page
        return
      }
      
      // Log user details for debugging
      console.log('🚀 [StepsRegister] User authenticated successfully')
      console.log('🚀 [StepsRegister] User email:', user.email)
      console.log('🚀 [StepsRegister] User ID:', user.id || 'No ID field')
      console.log('🚀 [StepsRegister] User roles:', user.roles)
        // Check if token is available and valid
      if (!token) {
        console.error('🚀 [StepsRegister] No authentication token found')
        CustomToast(t('Session expirée. Veuillez vous reconnecter.', 'Session expired. Please login again.'), 'error')
        navigate('/login')
        return
      }
        // Check if token looks like a Firebase token (should not be used for Laravel API)
      if (token.startsWith('eyJ') && token.split('.').length === 3) {
        console.error('🚀 [StepsRegister] Firebase token detected - requires proper Laravel token exchange')
        CustomToast(t('Votre session doit être mise à jour. Reconnexion automatique...', 'Your session needs to be updated. Automatic reconnection...'), 'info')
        
        // Clear the invalid token and redirect to login
        const { logout } = useAuthStore.getState()
        logout()
        
        // Small delay to show the message, then redirect
        setTimeout(() => {
          navigate('/')
        }, 2000)
        return
      }
      
      console.log('🚀 [StepsRegister] Valid Laravel token found, length:', token.length)
      
      const formValues = form.getValues()
      console.log('🚀 [StepsRegister] Complete form values before submission:', formValues)
      
      // Initialize upload URLs for cleanup if needed
      let photoUrls: string[] = []
      let videoUrl: string | undefined = undefined
      
      try {
        // Step 1: Upload files to Firebase Storage
        
        // Upload photos to Firebase Storage
        if (formValues.photos && formValues.photos.length > 0) {
          console.log('🔥 [StepsRegister] Uploading photos to Firebase Storage...')
          console.log('🔥 [StepsRegister] Photos to upload:', formValues.photos.map(p => ({ name: p.name, size: p.size })))
          CustomToast(t('Téléchargement des images...', 'Uploading images...'), 'info')
          
          try {
            const imageResults = await uploadImages(formValues.photos)
            photoUrls = imageResults.map(result => result.url)
            
            console.log('🔥 [StepsRegister] Photos uploaded successfully:', photoUrls)
            console.log('🔥 [StepsRegister] Number of photo URLs received:', photoUrls.length)
          } catch (uploadError) {
            console.error('🔥 [StepsRegister] Photo upload failed:', uploadError)
            throw new Error(`Photo upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`)
          }
        } else {
          console.log('🔥 [StepsRegister] No photos to upload')
        }
        
        // Upload video to Firebase Storage
        if (formValues.video) {
          console.log('🔥 [StepsRegister] Uploading video to Firebase Storage...')
          console.log('🔥 [StepsRegister] Video to upload:', { name: formValues.video.name, size: formValues.video.size })
          CustomToast(t('Téléchargement de la vidéo...', 'Uploading video...'), 'info')
          
          try {
            const videoResult = await uploadVideo(formValues.video)
            videoUrl = videoResult.url
            
            console.log('🔥 [StepsRegister] Video uploaded successfully:', videoUrl)
          } catch (uploadError) {
            console.error('🔥 [StepsRegister] Video upload failed:', uploadError)
            throw new Error(`Video upload failed: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`)
          }
        } else {
          console.log('🔥 [StepsRegister] No video to upload')
        }
        
        // Step 2: Prepare form data for Laravel API (with Firebase URLs)
        console.log('🚀 [StepsRegister] Preparing data for Laravel API...')
        CustomToast(t('Création de l\'annonce...', 'Creating annonce...'), 'info')
        
        // Validate required fields
        const requiredFields = {
          title: formValues.title,
          description: formValues.description,
          email: formValues.email,
          phone: formValues.phone,
          category_id: formValues.category?.value,
          subcategory_id: formValues.subCategory?.value,
          country_id: formValues.country?.value,
          city_id: formValues.city?.value,
          announcementType: formValues.announcementType,
          condition: formValues.condition,
          price: formValues.price
        }
        
        const missingFields = Object.entries(requiredFields)
          .filter(([, value]) => !value)
          .map(([key]) => key)
        
        if (missingFields.length > 0) {
          console.error('🚀 [StepsRegister] Missing required fields:', missingFields)
          CustomToast(t(`Champs requis manquants: ${missingFields.join(', ')}`, `Missing required fields: ${missingFields.join(', ')}`), 'error')
          return
        }
        
        const formData = new FormData()
        
        // Add text fields
        formData.append('title', formValues.title || '')
        formData.append('description', formValues.description || '')
        formData.append('email', formValues.email || '')
        formData.append('phone_number', formValues.phone || '')
        
        // Category and subcategory IDs
        if (formValues.category?.value) {
          formData.append('category_id', formValues.category.value)
        }
        if (formValues.subCategory?.value) {
          formData.append('subcategory_id', formValues.subCategory.value)
        }
        
        // Location data
        if (formValues.country?.value) {
          formData.append('country_id', formValues.country.value)
        }
        if (formValues.city?.value) {
          formData.append('city_id', formValues.city.value)
        }
        
        // Announcement type and condition
        if (formValues.announcementType) {
          formData.append('announce_type', formValues.announcementType)
        }
        if (formValues.condition) {
          formData.append('item_condition', formValues.condition)
        }
        
        // Price
        if (formValues.price) {
          formData.append('price', formValues.price)
        }
        
        // Add Firebase Storage URLs instead of files
        if (photoUrls.length > 0) {
          console.log('� [StepsRegister] Adding Firebase photo URLs to form data')
          photoUrls.forEach((url, index) => {
            formData.append(`image_urls[]`, url)
            console.log(`� [StepsRegister] Added photo URL ${index}:`, url)
          })
        }
        
        if (videoUrl) {
          console.log('� [StepsRegister] Adding Firebase video URL to form data')
          formData.append('video_url', videoUrl)
          console.log('� [StepsRegister] Added video URL:', videoUrl)
        }
        
        // Debug: Log all FormData entries
        console.log('🚀 [StepsRegister] FormData contents for Laravel API:')
        console.log('==========================================')
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`)
        }
        console.log('==========================================')
        
        // Step 3: Submit to Laravel API
        console.log('🚀 [StepsRegister] Submitting to Laravel API with Firebase URLs...')
        
        await savePost(formData)
        
        CustomToast(t('annonce_creee_avec_succes', 'Annonce créée avec succès!'), 'success')
        console.log('🚀 [StepsRegister] Annonce created successfully!')
        navigate('/')
        
      } catch (error) {
        console.error('🚀 [StepsRegister] Error during submission process:', error)
        
        // Clean up uploaded files if submission failed
        const allUploadedUrls = [...photoUrls]
        if (videoUrl) allUploadedUrls.push(videoUrl)
        
        if (allUploadedUrls.length > 0) {
          console.log('🧹 [StepsRegister] Cleaning up uploaded files due to submission failure...')
          cleanupUploadedFiles(allUploadedUrls).catch(cleanupError => {
            console.error('🧹 [StepsRegister] Cleanup failed:', cleanupError)
          })
        }
        
        // Extract error message first
        let errorMessage = t('erreur_lors_de_la_creation_de_la_demande')
        
        // Check for specific authentication errors
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { status?: number, data?: { message?: string, error?: string } } }
          
          if (axiosError.response?.status === 401) {
            CustomToast(t('Session expirée. Veuillez vous reconnecter.', 'Session expired. Please login again.'), 'error')
            navigate('/login')
            return
          }
          
          // Extract error message from API response
          errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.error || 
                        t('erreur_lors_de_la_creation_de_la_demande')
          
          console.error('🚀 [StepsRegister] API error message:', errorMessage)
        }
        
        // Check if the error is about reaching the annonce limit
        const limitErrorMessage = "Error icon Vous avez atteint la limite de 3 annonces. Veuillez créer une entreprise pour publier plus d'annonces."
        
        if (errorMessage.includes("Vous avez atteint la limite de 3 annonces") || 
            errorMessage.includes("limite de 3 annonces") ||
            errorMessage === limitErrorMessage) {
          
          // Show info toast with redirect message
          CustomToast(
            t('You have reached the limit of 3 announcements. Redirecting to company creation...', 
              'Vous avez atteint la limite de 3 annonces. Redirection vers la création d\'entreprise...'), 
            'info'
          )
          
          // Redirect to company creation page after 3 seconds
          setTimeout(() => {
            console.log('🔀 [StepsRegister] Redirecting to company creation page...')
            navigate('/user-account/company')
          }, 3000)
          
        } else {
          // Show regular error toast for other errors
          CustomToast(errorMessage, 'error')
        }
      }
    }
  }

  const handleNextButtonClick = async () => {
    if (step === 3) {
      // Final step - submit the form
      await handleSubmit()
    } else {
      // Navigation steps - just validate and move to next step
      handleStepValidation(step + 1 as ProgressSteps)
    }
  }

  const handleStepValidation = (newStep: ProgressSteps) => {
    // handle back 
    if (newStep < step) {
      setStep(newStep)
      return
    }

    if (step === 0) {
      console.log('🚀 [StepsRegister] Validating step 0 (category, subcategory, country, city)')
      
      const formValues = form.getValues()
      console.log('🚀 [StepsRegister] Current form values for step 0:', {
        category: formValues.category,
        subCategory: formValues.subCategory,
        country: formValues.country,
        city: formValues.city
      })

      // Trigger validation for all required fields in step 0
      const validationResult = form.trigger(['category', 'subCategory', 'country', 'city'])

      // Wait for validation to complete before checking isValid
      validationResult.then((isValid: boolean) => {
        console.log('🚀 [StepsRegister] Step 0 validation result:', isValid)
        if (isValid) {
          console.log('🚀 [StepsRegister] Step 0 validation passed, moving to step', newStep)
          setStep(newStep)
        } else {
          console.log('🚀 [StepsRegister] Step 0 validation failed, staying on current step')
          console.log('🚀 [StepsRegister] Current errors:', form.formState.errors)
        }
      })
    }

    if (step === 1) {
      console.log('🚀 [StepsRegister] Validating step 1 (title, description, announcementType, condition, price)')
      
      const formValues = form.getValues()
      console.log('🚀 [StepsRegister] Current form values for step 1:', {
        title: formValues.title,
        description: formValues.description,
        announcementType: formValues.announcementType,
        condition: formValues.condition,
        price: formValues.price
      })

      // Check if announcement type and condition are properly set
      if (!formValues.announcementType) {
        console.error('🚀 [StepsRegister] Announcement type is missing!')
      }
      if (!formValues.condition) {
        console.error('🚀 [StepsRegister] Condition is missing!')
      }
      if (!formValues.price) {
        console.error('🚀 [StepsRegister] Price is missing!')
      }

      const validationResult = form.trigger(['title', 'description', 'announcementType', 'condition', 'price'])
      validationResult.then((isValid: boolean) => {
        console.log('🚀 [StepsRegister] Step 1 validation result:', isValid)
        if (isValid) {
          console.log('🚀 [StepsRegister] Step 1 validation passed, moving to step', newStep)
          setStep(newStep)
        } else {
          console.log('🚀 [StepsRegister] Step 1 validation failed, staying on current step')
          console.log('🚀 [StepsRegister] Current errors:', form.formState.errors)
        }
      })
    }

    if (step === 2) {
      const validationResult = form.trigger(['photos', 'video'])
      validationResult.then((isValid: boolean) => {
        if (isValid) {
          setStep(newStep)
        }
      })
    }

    if (step === 3) {
      const validationResult = form.trigger(['email', 'phone'])
      validationResult.then((isValid: boolean) => {
        if (isValid) {
          setStep(newStep)
        }
      })
    }
  }

  return (
    <div
      className="min-h-screen pt-nav pb-24"
    >

      {/* steps content */}
      <div className="container-post-page">
        <AnimatePresence
          mode='wait'
          initial={false}
          onExitComplete={() => document.body.style.overflow = 'auto'}
        > {
            step === 0 && (
              <NoUserStep
                key="noUserStep"
                form={form}
              />
            )
          }

          {step === 1 && (
            <InfoFormStep
              key="infoForm"
              form={form}
            />
          )}

          {step === 2 && (
            <PhotosSelectStep
              key="photosSelect"
              form={form}
            />
          )}

          {step === 3 && (
            <ContactStep
              key="emailPhoneStep"
              form={form}
            />
          )}

        </AnimatePresence>
      </div>

      {/* steps next & back - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
        <div className="container-post-page">
          <div className="flex justify-between font-semibold">
            <button
              onClick={() => {
                if (step > 0) {
                  setStep(step - 1 as ProgressSteps)
                }
              }}
              className={`px-4 py-3 border rounded-md ${step === 0 ? 'cursor-not-allowed text-gray-500 border-gray-200' : 'text-primary-blue-all-800 border-gray-400'}`}
            >
              {t('previous')}
            </button>
            <button
              onClick={handleNextButtonClick}
              disabled={isLoading || isUploadingImages || isUploadingVideo}
              className={cn(
                'px-4 py-3 btn-primary text-white rounded-md',
                (isLoading || isUploadingImages || isUploadingVideo) && 'notAllowed'
              )}
            >
              {step === 3 ? t('publish') : t('next')}
              {
                (isLoading || isUploadingImages || isUploadingVideo) && (
                  <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2" />
                )
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepsRegister