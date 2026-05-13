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
  const { t } = useTranslation()
  const { register, formState: { errors }, watch } = form
  const { data: annonceTypesData } = useAnnonceTypes()

  // Watch form values for debugging
  const announcementType = watch('announcementType')
  const condition = watch('condition')
  const price = watch('price')

  console.log('🚀 [InfoFormStep] Current form values:')
  console.log('  - Announcement Type:', announcementType)
  console.log('  - Condition:', condition)
  console.log('  - Price:', price)
  console.log('🚀 [InfoFormStep] Form errors:', errors)
  console.log('🚀 [InfoFormStep] Announcement types data:', annonceTypesData)

  const isService = announcementType === 'service'
  const isSale = announcementType === 'sale'
  const isRental = announcementType === 'rental'


  useEffect(() => {
    // Lors du changement du type, on évite de garder une valeur "condition" incompatible
    if (!announcementType) {
      if (condition) form.setValue('condition', '')
      return
    }

    if (isService) {
      // service ne doit garder aucune valeur de vente/location
      if (condition === 'new' || condition === 'used' || condition === 'good_condition') {
        form.setValue('condition', '')
      }
      return
    }

    if (isSale) {
      // vente ne doit garder aucune valeur de service
      if (condition === 'hour' || condition === 'day' || condition === 'mission_ok') {
        form.setValue('condition', '')
      }
      return
    }
    if (isRental) {
      // location ne doit garder aucune valeur de service
      if (condition === 'hour' || condition === 'day' || condition === 'mission_ok') {
        form.setValue('condition', '')
      }
      return
    }




    // type inconnu: reset
    if (condition) form.setValue('condition', '')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [announcementType, isService, isSale, isRental])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.info.title')}
        subtitle={t('post_job_form.info.subtitle')}
      />
      <form>
        {/* Title */}
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            id="title"
            className={`input ${errors.title ? "border-red-500" : ""}`}
            placeholder='Titre'
            {...register('title', {
              required: t('post_job_form.info.title_required'),
              onChange: () => form.trigger('title')
            })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        
        {/* Description */}
        <div className="mt-4">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className={`input ${errors.description ? "border-red-500" : ""}`}
            placeholder={t('post_job_form.info.description_placeholder')}
            rows={5}
            {...register('description', {
              required: t('post_job_form.info.description_required'),
              minLength: {
                value: 10,
                message: t('Minimum 10 caractères') || 'Minimum 10 caractères'
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
            <label htmlFor="announcementType" className="block mb-2 text-base font-medium text-gray-600">Type d'annonce</label>
            <select
              id="announcementType"
              className={`input w-full ${errors.announcementType ? "border-red-500" : ""}`}
              {...register('announcementType', { 
                required: 'Type d\'annonce requis',
                onChange: (e) => {
                  const value = e.target.value
                  console.log('🚀 [InfoFormStep] Announcement type changed to:', value)
                  form.trigger('announcementType')
                }
              })}
            >
              <option value="">Choisir le type</option>
              {annonceTypesData?.map((type) => {
                console.log('🎯 [InfoFormStep] Rendering option:', type)
                return (
                  <option key={type.id} value={type.value}>
                    {type.label}
                  </option>
                )
              })}
            </select>
            {errors.announcementType && <p className="text-red-500 text-sm">{errors.announcementType.message}</p>}
          </div>

          {/* Item Condition / Tarification (selon le type d'annonce) */}
          <div>
              <label htmlFor="condition" className="block mb-2 text-base font-medium text-gray-600">
              {isService ? 'Choisir la tarification' : isRental ? 'Choisir la période de location' : "État de l'article"}
            </label>


            {/* Important: for service we keep tarification UI but we MUST NOT send it as item_condition.
                So we still write into 'condition' locally, but backend will ignore it for service. */}
            <select
              id="condition"
              className={`input w-full ${errors.condition ? "border-red-500" : ""}`}
              {...register('condition', {
                required: isService ? false : "État requis",
                onChange: (e) => {
                  const value = e.target.value
                  console.log('🚀 [InfoFormStep] Condition changed to:', value)
                  form.trigger('condition')
                }
              })}
            >
              <option value="">{isService ? 'Choisir la tarification' : isRental ? 'Choisir la période' : "Choisir l'état"}</option>

              {/* vente */}
              {announcementType === 'sale' && (
                <>
                  <option value="new">Neuf</option>
                  <option value="used">Usagé</option>
                  <option value="good_condition">Bon état</option>
                </>
              )}

              {/* location */}
              {announcementType === 'rental' && (
                <>
                  <option value="day">Jour</option>
                  <option value="week">Semaine</option>
                  <option value="month">Mois</option>
                </>
              )}



              {/* service */}
              {isService && (
                <>
                  <option value="hour">Heure</option>
                  <option value="day">Jour</option>
                  <option value="mission_ok">Mission</option>
                </>
              )}

              {/* fallback */}
              {(!isService && !isSale && !isRental) && (
                <>
                  <option value="new">Neuf</option>
                  <option value="used">Usagé</option>
                  <option value="good_condition">Bon état</option>
                </>
              )}

            </select>

            {errors.condition && !isService && (
              <p className="text-red-500 text-sm">{errors.condition.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block mb-2 text-base font-medium text-gray-600">Prix</label>
            <input
              type="number"
              step="0.01"
              id="price"
              className={`input w-full ${errors.price ? "border-red-500" : ""}`}
              placeholder="Prix en MAD"
              {...register('price', { 
                required: 'Prix requis',
                onChange: (e) => {
                  const value = e.target.value
                  console.log('🚀 [InfoFormStep] Price changed to:', value)
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