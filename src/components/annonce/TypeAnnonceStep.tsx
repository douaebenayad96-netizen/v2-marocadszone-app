import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, UseFormReturn } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FormValues } from '../../pages/StepsRegister'
import StepSectionHeader from '../common/StepSectionHeader'
import { RiFileTextLine, RiVideoLine, RiBuildingLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'






interface FormProps {
  form: UseFormReturn<FormValues>
}

const TypeAnnonceStep = ({ form }: FormProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { control, watch, setValue, formState: { errors, isSubmitted }, clearErrors, trigger } = form
  const annonceType = watch('annonceType')
  const [touched, setTouched] = useState(false)

  const annonceTypes = [
    {
      id: 'normal',
      label: t('annonce_type.normal'),
      description: t('annonce_type.normal_description'),
      icon: <RiFileTextLine className="w-6 h-6" />,
      color: 'bg-primary-blue-all-100'
    },
    {
      id: 'video',
      label: t('annonce_type.video'),
      description: t('annonce_type.video_description'),
      icon: <RiVideoLine className="w-6 h-6" />,
      color: 'bg-primary-orange/10'
    },
    {
      id: 'entreprise',
      label: t('annonce_type.entreprise'),
      description: t('annonce_type.entreprise_description'),
      icon: <RiBuildingLine className="w-6 h-6" />,
      color: 'bg-green-500/10'
    }
  ]


  // Clear error when user selects an option
  useEffect(() => {
    if (annonceType) {
      clearErrors('annonceType')
    }
  }, [annonceType, clearErrors])

  const handleSelection = async (typeId: string) => {
    setTouched(true)
    setValue('annonceType', typeId, { shouldValidate: true })

    // Trigger validation immediately after selection
    setTimeout(() => {
      trigger('annonceType')
    }, 100)
  }

  // Do not redirect here.
  // Redirect is handled in StepsRegister when NEXT is clicked.





  // Check if we should show error - use a more reliable approach
  const hasError = Boolean(errors.annonceType)
  const shouldShowError = hasError && (touched || isSubmitted)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="pb-4 font-DM-Sans"
    >
      <StepSectionHeader
        title={t('annonce_type.title')}
        subtitle={t('annonce_type.subtitle')}
      />

      <div className="grid grid-cols-1 gap-6 mt-6">
        {annonceTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 border-2 ${annonceType === type.id
                ? 'border-primary-orange shadow-orange-bottom-right bg-white'
                : shouldShowError
                  ? 'border-red-500 shadow-card-shadow-border'
                  : 'border-primary-gray-200 hover:border-primary-orange/50 shadow-card-shadow-border'
              }`}
            onClick={() => handleSelection(type.id)}
          >
            {/* Selection indicator */}
            <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${annonceType === type.id
                ? 'bg-primary-orange text-white'
                : shouldShowError
                  ? 'bg-red-500'
                  : 'bg-primary-gray-200'
              }`}>
              {annonceType === type.id && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {shouldShowError && annonceType !== type.id && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            <div className="flex items-start space-x-4">
              {/* Icon container */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${annonceType === type.id
                  ? 'bg-primary-orange text-white'
                  : shouldShowError
                    ? 'bg-red-100 text-red-500'
                    : type.color
                }`}>
                {type.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${annonceType === type.id
                    ? 'text-primary-orange'
                    : shouldShowError
                      ? 'text-red-700'
                      : 'text-primary-blue-900'
                  }`}>
                  {type.label}
                </h3>
                <p className={`text-sm mt-2 ${shouldShowError ? 'text-red-600' : 'text-primary-gray-500'
                  }`}>
                  {type.description}
                </p>

                {/* Additional info based on selection */}
                {annonceType === type.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-primary-gray-200"
                  >
                    <p className="text-xs text-primary-orange font-medium">
                      {type.id === 'normal'
                        ? t('annonce_type.normal_selected')
                        : type.id === 'video'
                          ? t('annonce_type.video_selected')
                          : t('annonce_type.entreprise_selected')
                      }
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Error message */}
      {shouldShowError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2"
        >
          <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700 text-sm">
            {errors.annonceType?.message}
          </p>
        </motion.div>
      )}

      {/* Hidden controller for form validation */}
      <Controller
        name="annonceType"
        control={control}
        rules={{
          required: t('annonce_type.required')
        }}
        render={({ field }) => (
          <input type="hidden" {...field} />
        )}
      />
    </motion.div>
  )
}

export default TypeAnnonceStep