import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { UseFormReturn } from "react-hook-form"
import StepSectionHeader from "../common/StepSectionHeader"
import { FormValues } from "../../pages/StepsRegister"
import { useAnnonceTypes } from "../../services/api/fetchAnnonceTypes"
import { useEffect } from "react"

type InfoFormStepProps = {
  form: UseFormReturn<FormValues>
}

const InfoFormStep = ({ form }: InfoFormStepProps) => {
  const { t, i18n } = useTranslation()
  const { register, formState: { errors }, watch } = form
  const { data: annonceTypesData } = useAnnonceTypes()

  const announcementType = watch('announcementType')
  const condition = watch('condition')
  const price = watch('price')

  const isService = announcementType === 'service'
  const isSale = announcementType === 'sale'
  const isRental = announcementType === 'rental'

  useEffect(() => {
    form.setValue('condition', '')
  }, [announcementType])

  // Fonction pour traduire le type d'annonce
  const translateAnnounceType = (typeValue: string, originalLabel: string) => {
    const lang = i18n.language
    
    const translations: Record<string, Record<string, string>> = {
      fr: {
        'sale': 'Vente',
        'rental': 'Location',
        'service': 'Service'
      },
      en: {
        'sale': 'Sale',
        'rental': 'Rental',
        'service': 'Service'
      },
      ar: {
        'sale': 'بيع',
        'rental': 'إيجار',
        'service': 'خدمة'
      }
    }
    
    return translations[lang]?.[typeValue] || originalLabel
  }

  // Helper to get condition label based on type
  const getConditionLabel = () => {
    if (isService) return t('info_form_step.pricing_label')
    if (isRental) return t('info_form_step.rental_period_label')
    return t('info_form_step.condition_label')
  }

  // Helper to get condition placeholder
  const getConditionPlaceholder = () => {
    if (isService) return t('info_form_step.pricing_placeholder')
    if (isRental) return t('info_form_step.rental_period_placeholder')
    return t('info_form_step.condition_placeholder')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('info_form_step.title')}
        subtitle={t('info_form_step.subtitle')}
      />
      <form>
        {/* Title */}
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            {t('info_form_step.title_label')}
          </label>
          <input
            type="text"
            id="title"
            className={`input ${errors.title ? "border-red-500" : ""}`}
            placeholder={t('info_form_step.title_placeholder')}
            {...register('title', {
              required: t('info_form_step.title_required'),
              onChange: () => form.trigger('title')
            })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        
        {/* Description */}
        <div className="mt-4">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            {t('info_form_step.description_label')}
          </label>
          <textarea
            id="description"
            className={`input ${errors.description ? "border-red-500" : ""}`}
            placeholder={t('info_form_step.description_placeholder')}
            rows={5}
            {...register('description', {
              required: t('info_form_step.description_required'),
              minLength: {
                value: 10,
                message: t('info_form_step.description_min_length')
              },
              onChange: () => form.trigger('description')
            })}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        
        {/* Vertical Layout for Type, Condition, Price */}
        <div className="space-y-4 mt-4 pb-32">
          {/* Announce Type */}
          <div>
            <label htmlFor="announcementType" className="block mb-2 text-base font-medium text-gray-600">
              {t('info_form_step.announcement_type_label')}
            </label>
            <select
              id="announcementType"
              className={`input w-full ${errors.announcementType ? "border-red-500" : ""}`}
              {...register('announcementType', { 
                required: t('info_form_step.announcement_type_required'),
                onChange: (e) => {
                  form.trigger('announcementType')
                }
              })}
            >
              <option value="">{t('info_form_step.announcement_type_placeholder')}</option>
              {annonceTypesData?.map((type) => (
                <option key={type.id} value={type.value}>
                  {translateAnnounceType(type.value, type.label)}
                </option>
              ))}
            </select>
            {errors.announcementType && <p className="text-red-500 text-sm">{errors.announcementType.message}</p>}
          </div>

          {/* Item Condition / Tarification (selon le type d'annonce) */}
          <div>
            <label htmlFor="condition" className="block mb-2 text-base font-medium text-gray-600">
              {getConditionLabel()}
            </label>

            <select
              id="condition"
              className={`input w-full ${errors.condition ? "border-red-500" : ""}`}
              {...register('condition', {
                required: isService ? false : t('info_form_step.condition_required'),
                onChange: (e) => {
                  form.trigger('condition')
                }
              })}
            >
              <option value="">{getConditionPlaceholder()}</option>

              {/* sale */}
              {announcementType === 'sale' && (
                <>
                  <option value="new">{t('info_form_step.condition_new')}</option>
                  <option value="used">{t('info_form_step.condition_used')}</option>
                  <option value="good_condition">{t('info_form_step.condition_good')}</option>
                </>
              )}

              {/* rental */}
              {announcementType === 'rental' && (
                <>
                  <option value="rental_day">{t('info_form_step.rental_day')}</option>
                  <option value="rental_week">{t('info_form_step.rental_week')}</option>
                  <option value="rental_month">{t('info_form_step.rental_month')}</option>
                </>
              )}

              {/* service */}
              {isService && (
                <>
                  <option value="service_hour">{t('info_form_step.service_hour')}</option>
                  <option value="service_day">{t('info_form_step.service_day')}</option>
                  <option value="service_mission">{t('info_form_step.service_mission')}</option>
                </>
              )}

              {/* fallback */}
              {(!isService && !isSale && !isRental) && (
                <>
                  <option value="new">{t('info_form_step.condition_new')}</option>
                  <option value="used">{t('info_form_step.condition_used')}</option>
                  <option value="good_condition">{t('info_form_step.condition_good')}</option>
                </>
              )}
            </select>

            {errors.condition && !isService && (
              <p className="text-red-500 text-sm">{errors.condition.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block mb-2 text-base font-medium text-gray-600">
              {t('info_form_step.price_label')}
            </label>
            <input
              type="number"
              step="0.01"
              id="price"
              className={`input w-full ${errors.price ? "border-red-500" : ""}`}
              placeholder={t('info_form_step.price_placeholder')}
              {...register('price', { 
                required: t('info_form_step.price_required'),
                onChange: (e) => {
                  form.trigger('price')
                }
              })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default InfoFormStep