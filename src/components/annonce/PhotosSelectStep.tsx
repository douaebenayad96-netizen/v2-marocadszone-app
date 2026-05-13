import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { BiImageAdd, BiSave } from "react-icons/bi"
import { IoMdClose } from "react-icons/io"
import { useTranslation } from "react-i18next"

import { useForm } from "react-hook-form"
import { FormValues } from "../../pages/StepsRegister"
import StepSectionHeader from "../common/StepSectionHeader"

type PhotoUploadCardProps = {
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>
}

type PhotosSelectStepProps = {
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>
  photos: File[]
  onSubmit: (data: FormValues) => void

}

const PhotosSelectStep = ({ setPhotos, photos, onSubmit }: PhotosSelectStepProps) => {
  const { t } = useTranslation()
  const { handleSubmit } = useForm<FormValues>();

  // max 3 photos
  const showUploadCardsBasedOnPhotos = (photos: File[]) => {
    if (photos.length === 0) {
      return [1, 2, 3, 4, 5]
    }
    if (photos.length === 1) {
      return [2, 3, 4, 5]
    }
    if (photos.length === 2) {
      return [3, 4, 5]
    }
    if (photos.length === 3) {
      return [4, 5]
    }
    if (photos.length === 4) {
      return [5]
    }
    return []
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title='upload images'
        subtitle={t('post_job_form.photos.subtitle')}
      />
      <div className="flex flex-wrap gap-4 mt-0">
        {
          photos.map((photo, index) => (
            <PhotoUploadCardPeview
              key={index}
              photo={photo}
              setPhotos={setPhotos}
            />
          ))
        }
        {
          showUploadCardsBasedOnPhotos(photos).map((_, index) => (
            <PhotoUploadCard
              key={index}
              setPhotos={setPhotos}
            />
          ))
        }     <br />
        <div className="flex justify-left py-2" style={{ marginRight: '40%' }}>

          <button className="flex items-center bg-orange-600 text-white py-2 px-2 rounded-md shadow-md focus:outline-none" onClick={handleSubmit(onSubmit)} ><BiSave className="" />Enregistrer</button>
        </div>
      </div>
    </motion.div>
  )
}

const PhotoUploadCard = ({ setPhotos }: PhotoUploadCardProps) => {
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
    e.target.value = ''
    setPhoto(file)
  }

  return (
    <div
      className="border-2 border-dashed w-[150px] h-[150px] z-0 cursor-pointer relative border-gray-300 rounded-md aspect-square flex items-center justify-center bg-gray-100 group hover:bg-gray-200 transition-colors duration-200 ease-in-out"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="w-full h-full opacity-0 cursor-pointer z-10 relative"
      />
      <div
        className="absolute top-1/2 left-1/2 transform z-0 -translate-x-1/2 -translate-y-1/2 bg-gray-200 group-hover:bg-gray-300 transition-all p-2 rounded-full text-gray-800 text-2xl"
      >
        <BiImageAdd />
      </div>
    </div>
  )
}

const PhotoUploadCardPeview = ({ photo, setPhotos }: { photo: File, setPhotos: React.Dispatch<React.SetStateAction<File[]>> }) => {

  const handlePhotoDelete = () => {
    setPhotos((prevPhotos) => {
      // Filter out the deleted photo
      const updatedPhotos = prevPhotos.filter((prevPhoto) => prevPhoto !== photo)

      // Revoke the object file to free up memory
      return updatedPhotos
    })
  }

  return (
    <div
      className="border-2 border-dashed w-[150px] h-[150px] z-0 cursor-pointer relative border-gray-300 rounded-md aspect-square flex items-center justify-center bg-gray-100 group hover:bg-gray-200 transition-colors duration-200 ease-in-out"
    >
      <div
        className="absolute top-0 left-0 w-full h-full z-20"
      >
        <img
          src={URL.createObjectURL(photo)}
          alt="uploaded photo"
          className="w-full h-full object-cover cursor-default"
        />
        {/* clear btn */}
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