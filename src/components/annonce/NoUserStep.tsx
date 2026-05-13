import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { motion } from 'framer-motion'

import { useCategories1, useSubcategories } from '../../services/api/fetchCategory'
import { useFetchCity } from '../../services/api/fetchCity'
  import { useFetchCountries } from '../../services/api/fetchCountry'
import { Category } from '../../services/types/category'
import { FormValues } from '../../pages/StepsRegister'
import StepSectionHeader from '../common/StepSectionHeader'

interface FormProps {
  form: UseFormReturn<FormValues>
}

const NoUserStep = ({ form }: FormProps) => {
  const { t } = useTranslation()
  
  const { formState: { errors }, control, clearErrors, watch } = form
  const { data: citiesDataList, isLoading: isLoadingCities } = useFetchCity()
  const { data: countriesDataList, isLoading: isLoadingCountries } = useFetchCountries()
  const { data: categories, isLoading: isLoadingCategories } = useCategories1()
  
  const category = watch('category')
  const subCategory = watch('subCategory')
  const city = watch('city')
  const country = watch('country')
  
  const { data: subcategories, isLoading: isLoadingSubcategories } = useSubcategories(category?.value ? parseInt(category.value) : 0)

  // Debug logging for API data
  console.log('🚀 [NoUserStep] API Loading States:')
  console.log('  - Cities loading:', isLoadingCities)
  console.log('  - Countries loading:', isLoadingCountries)
  console.log('🚀 [NoUserStep] API Data:')
  console.log('  - Cities data:', citiesDataList)
  console.log('  - Countries data:', countriesDataList)
  console.log('  - Categories data:', categories)
  console.log('  - Subcategories data:', subcategories)
  console.log('🚀 [NoUserStep] Current form values:')
  console.log('  - Category:', category)
  console.log('  - Subcategory:', subCategory)
  console.log('  - Country:', country)
  console.log('  - City:', city)

  // Clear errors when fields are filled correctly
  useEffect(() => {
    if (category?.value) {
      clearErrors('category')
    }
    if (subCategory?.value) {
      clearErrors('subCategory')
    }
    if (city?.value) {
      clearErrors('city')
    }
    if (country?.value) {
      clearErrors('country')
    }
  }, [category, subCategory, city, country, clearErrors])

  // Set Morocco as default country when countries data is loaded
  useEffect(() => {
    if (countriesDataList && countriesDataList.length > 0 && !country?.value) {
      // Find Morocco in the countries list (assuming it's labeled as "Morocco" or "Maroc")
      const morocco = countriesDataList.find(
        (countryItem) => 
          countryItem.label?.toLowerCase().includes('morocco') || 
          countryItem.label?.toLowerCase().includes('maroc')
      )
      
      if (morocco) {
        form.setValue('country', {
          label: morocco.label,
          value: morocco.id.toString()
        })
        console.log('🚀 [NoUserStep] Set Morocco as default country:', morocco)
      }
    }
  }, [countriesDataList, country, form])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.category.title')}
        subtitle={t('post_job_form.category.subtitle')}
      />
      <form className="pb-4">
        <div className="mt-4">
          <div className="space-y-4">            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('Categorie')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('la_categorie_est_obligatoire')
                  }
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='w-full'
                    styles={{
                      loadingIndicator: (base) => ({
                        ...base,
                        '& svg': {
                          width: '24px',
                          height: '24px'
                        }
                      })
                    }}
                    options={
                      categories?.map((item: Category) => ({
                        label: item.label || '',
                        value: item.id.toString()
                      })) || []
                    }                    onChange={(selectedOption) => {
                      field.onChange(selectedOption)
                      // Clear subcategory when category changes
                      form.setValue('subCategory', { label: '', value: '' })
                      if (selectedOption) {
                        clearErrors('category')
                      }
                    }}
                    placeholder={t('Sélectionner une Catégorie')}
                    noOptionsMessage={() => t('Aucune catégorie trouvée')}
                    isLoading={isLoadingCategories}
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Subcategory Selection */}
            {category?.value && (
              <div>
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('Sous-Catégorie')}
                  <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="subCategory"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: t('La sous-catégorie est requise')
                    }
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className='w-full'
                      styles={{
                        loadingIndicator: (base) => ({
                          ...base,
                          '& svg': {
                            width: '24px',
                            height: '24px'
                          }
                        })
                      }}
                      options={
                        subcategories?.map((item) => ({
                          label: item.label || '',
                          value: item.id.toString()
                        })) || []
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption)
                        if (selectedOption) {
                          clearErrors('subCategory')
                        }
                      }}
                      placeholder={t('Sélectionner une sous-catégorie')}
                      noOptionsMessage={() => t('Aucune sous-catégorie trouvée')}
                      isLoading={isLoadingSubcategories}
                      isDisabled={!category?.value}
                    />
                  )}
                />
                {errors.subCategory && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subCategory.message}
                  </p>
                )}
              </div>
            )}

            {/* Country Selection */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('Pays')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('Le pays est requis')
                  }
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='w-full'
                    styles={{
                      loadingIndicator: (base) => ({
                        ...base,
                        '& svg': {
                          width: '24px',
                          height: '24px'
                        }
                      })
                    }}
                    options={
                      countriesDataList?.map((item) => ({
                        label: item.label || '',
                        value: item.id.toString()
                      })) || []
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption)
                      // Clear city when country changes
                      form.setValue('city', { label: '', value: '' })
                      if (selectedOption) {
                        clearErrors('country')
                      }
                    }}
                    placeholder={t('Sélectionner un pays')}
                    noOptionsMessage={() => t('Aucun pays trouvé')}
                    isLoading={isLoadingCountries}
                    isDisabled={true} // Disable country selection since Morocco is set as default
                  />
                )}
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* City Selection */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('Ville')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('La ville est requise', 'City is required')
                  }
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='w-full'
                    styles={{
                      loadingIndicator: (base) => ({
                        ...base,
                        '& svg': {
                          width: '24px',
                          height: '24px'
                        }
                      })
                    }}
                    options={
                      citiesDataList?.filter((item) => {
                        // Filter cities by selected country
                        if (country?.value) {
                          return item.country_id === parseInt(country.value)
                        }
                        return true
                      }).map((item) => ({
                        label: item.label || '',
                        value: item.id.toString()
                      })) || []
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption)
                      if (selectedOption) {
                        clearErrors('city')
                      }
                    }}
                    placeholder={t('Sélectionner une ville')}
                    noOptionsMessage={() => t('Aucune ville trouvée')}
                    isLoading={isLoadingCities}
                  />
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default NoUserStep