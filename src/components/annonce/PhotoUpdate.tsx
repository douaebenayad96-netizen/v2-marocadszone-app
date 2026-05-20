import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { BiImageAdd } from "react-icons/bi"
import { IoMdClose } from "react-icons/io"
import { useTranslation } from "react-i18next"
import { UseFormReturn } from "react-hook-form"
import { FormValues } from "../../pages/StepsRegister"
import { cn } from "../../utils/helpers"
import { RiVideoAddLine } from "react-icons/ri"
import StepSectionHeader from "../common/StepSectionHeader"

type PhotoUploadCardProps = {
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>
  isInvalid: boolean
}

type PhotosSelectStepProps = {
  form: UseFormReturn<FormValues>
}

const PhotosSelectStep = ({ form }: PhotosSelectStepProps) => {
  const { t } = useTranslation()
  const [photos, setPhotos] = useState<File[]>(form.getValues('photos') || [])

  useEffect(() => {
    form.register('photos', {
      required: t('photos_step.photos_required'),
      validate: (value) => value.length > 2 || t('photos_step.photos_min_count'),
    })
    form.register('video', {
      required: false,
    })
  }, [form, t])

  const showUploadCardsBasedOnPhotos = (photos: File[]) => {
    if (photos.length === 0) return [1, 2, 3, 4, 5]
    if (photos.length === 1) return [2, 3, 4, 5]
    if (photos.length === 2) return [3, 4, 5]
    if (photos.length === 3) return [4, 5]
    if (photos.length === 4) return [5]
    return []
  }

  useEffect(() => {
    form.setValue('photos', photos)
    if (photos.length !== 0) {
      form.clearErrors('photos')
    }
  }, [photos, form])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('photos_step.title')}
        subtitle={t('photos_step.subtitle')}
      />
      
      {/* Photos Section */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
          {t('photos_step.photos_label')}
          <div className="relative group">
            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              {t('photos_step.photos_tooltip')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </label>
        
        <div className="flex flex-wrap gap-4 mt-4">
          {(photos || []).map((photo: File, index: number) => (
            <div key={index}>
              <PhotoUploadCardPreview
                key={index}
                photo={photo}
                setPhotos={setPhotos}
              />
            </div>
          ))}
          {showUploadCardsBasedOnPhotos(photos).map((_, index) => (
            <PhotoUploadCard
              key={index}
              setPhotos={setPhotos}
              isInvalid={!!form.formState.errors.photos}
            />
          ))}
        </div>
        
        {form.formState.errors.photos && (
          <p className="text-red-500 text-sm mt-2">
            {form.formState.errors.photos.message}
          </p>
        )}
      </div>

      {/* Video Section */}
      <div className="my-6">
        <label className="block font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
          {t('photos_step.video_label')}
          <div className="relative group">
            <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              {t('photos_step.video_tooltip')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </label>

        {!form.watch('video') ? (
          <div className="border-2 border-dashed aspect-video cursor-pointer relative border-gray-300 rounded-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in-out">
            <input
              type="file"
              accept="video/mp4,video/quicktime"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return

                if (file.size > 20 * 1024 * 1024) {
                  alert(t('photos_step.video_max_size'))
                  e.target.value = ''
                  return
                }

                const allowedTypes = ['video/mp4', 'video/quicktime']
                if (!allowedTypes.includes(file.type)) {
                  alert(t('photos_step.video_invalid_format'))
                  e.target.value = ''
                  return
                }

                form.setValue('video', file)
              }}
              className="w-full h-full opacity-0 cursor-pointer absolute"
            />
            <div className="flex gap-2 items-center justify-center z-0">
              <RiVideoAddLine className="text-gray-800 text-2xl" />
              <p className="text-gray-500 z-0">{t('photos_step.video_placeholder')}</p>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video border rounded-md overflow-hidden">
            <video
              controls
              src={form.watch('video') ? URL.createObjectURL(form.watch('video') as File) : ''}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => form.setValue('video', undefined)}
              className="absolute top-1 right-1 p-1 text-white bg-black bg-opacity-70 rounded-full hover:bg-opacity-90"
            >
              <IoMdClose />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const PhotoUploadCard = ({ setPhotos, isInvalid }: PhotoUploadCardProps) => {
  const { t } = useTranslation()
  const [photo, setPhoto] = useState<File | undefined>()

  useEffect(() => {
    return () => {
      setPhoto(undefined)
    }
  }, [photo])

  useEffect(() => {
    if (photo) {
      setPhotos((prevPhotos) => {
        if (prevPhotos.length < 5) {
          return [...prevPhotos, photo]
        }
        return prevPhotos
      })
    }
  }, [photo, setPhotos])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert(t('photos_step.photo_max_size'))
      e.target.value = ''
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert(t('photos_step.photo_invalid_format'))
      e.target.value = ''
      return
    }

    e.target.value = ''
    setPhoto(file)
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed w-[150px] h-[150px] z-0 cursor-pointer relative border-gray-300 rounded-md aspect-square flex items-center justify-center bg-gray-100 group hover:bg-gray-200 transition-colors duration-200 ease-in-out",
        isInvalid && "border-red-500"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="w-full h-full opacity-0 cursor-pointer z-10 relative"
      />
      <div className="absolute top-1/2 left-1/2 transform z-0 -translate-x-1/2 -translate-y-1/2 bg-gray-200 group-hover:bg-gray-300 transition-all p-2 rounded-full text-gray-800 text-2xl">
        <BiImageAdd />
      </div>
    </div>
  )
}

const PhotoUploadCardPreview = ({ photo, setPhotos }: { photo: File, setPhotos: React.Dispatch<React.SetStateAction<File[]>> }) => {
  const handlePhotoDelete = () => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = prevPhotos.filter((prevPhoto) => prevPhoto !== photo)
      return updatedPhotos
    })
  }

  return (
    <div className="border-2 border-dashed w-[150px] h-[150px] z-0 cursor-pointer relative border-gray-300 rounded-md aspect-square flex items-center justify-center bg-gray-100 group hover:bg-gray-200 transition-colors duration-200 ease-in-out">
      <div className="absolute top-0 left-0 w-full h-full z-20">
        <img
          src={URL.createObjectURL(photo)}
          alt="uploaded photo"
          className="w-full h-full object-cover cursor-default"
        />
        <button
          onClick={handlePhotoDelete}
          className="absolute top-0.5 right-0.5 z-20 p-2 text-xl bg-black rounded-full text-white bg-opacity-80 hover:bg-opacity-100 transition-colors duration-200 ease-in-out"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  )
}

export default PhotosSelectStep