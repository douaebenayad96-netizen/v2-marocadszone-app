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
import getLocalized from '../../utils/getLocalized'

interface FormProps {
  form: UseFormReturn<FormValues>
}

const NoUserStep = ({ form }: FormProps) => {
  const { t, i18n } = useTranslation()
  
  const { formState: { errors }, control, clearErrors, watch } = form
  const { data: citiesDataList, isLoading: isLoadingCities } = useFetchCity()
  const { data: countriesDataList, isLoading: isLoadingCountries } = useFetchCountries()
  const { data: categories, isLoading: isLoadingCategories } = useCategories1()
  
  const category = watch('category')
  const subCategory = watch('subCategory')
  const city = watch('city')
  const country = watch('country')
  
  const { data: subcategories, isLoading: isLoadingSubcategories } = useSubcategories(category?.value ? parseInt(category.value) : 0)

  // Clear errors when fields are filled correctly
  useEffect(() => {
    if (category?.value) clearErrors('category')
    if (subCategory?.value) clearErrors('subCategory')
    if (city?.value) clearErrors('city')
    if (country?.value) clearErrors('country')
  }, [category, subCategory, city, country, clearErrors])

  // Set Morocco as default country when countries data is loaded
  useEffect(() => {
    if (countriesDataList && countriesDataList.length > 0 && !country?.value) {
      const morocco = countriesDataList.find(
        (countryItem) => 
          countryItem.label?.toLowerCase().includes('morocco') || 
          countryItem.label?.toLowerCase().includes('maroc')
      )
      
      if (morocco) {
        form.setValue('country', {
          label: getLocalized(morocco, 'label') || morocco.label,
          value: morocco.id.toString()
        })
      }
    }
  }, [countriesDataList, country, form])

  // Helper function to get localized label
  const getLocalizedLabel = (item: any) => {
    return getLocalized(item, 'label') || item.label || ''
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('no_user_step.title')}
        subtitle={t('no_user_step.subtitle')}
      />
      <form className="pb-4">
        <div className="mt-4">
          <div className="space-y-4">
            {/* Category Selection */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('no_user_step.category_label')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="category"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('no_user_step.category_required')
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
                        label: getLocalizedLabel(item),
                        value: item.id.toString()
                      })) || []
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption)
                      form.setValue('subCategory', { label: '', value: '' })
                      if (selectedOption) clearErrors('category')
                    }}
                    placeholder={t('no_user_step.category_placeholder')}
                    noOptionsMessage={() => t('no_user_step.no_category')}
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
                  {t('no_user_step.subcategory_label')}
                  <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="subCategory"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: t('no_user_step.subcategory_required')
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
                          label: getLocalizedLabel(item),
                          value: item.id.toString()
                        })) || []
                      }
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption)
                        if (selectedOption) clearErrors('subCategory')
                      }}
                      placeholder={t('no_user_step.subcategory_placeholder')}
                      noOptionsMessage={() => t('no_user_step.no_subcategory')}
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
                {t('no_user_step.country_label')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('no_user_step.country_required')
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
                        label: getLocalizedLabel(item),
                        value: item.id.toString()
                      })) || []
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption)
                      form.setValue('city', { label: '', value: '' })
                      if (selectedOption) clearErrors('country')
                    }}
                    placeholder={t('no_user_step.country_placeholder')}
                    noOptionsMessage={() => t('no_user_step.no_country')}
                    isLoading={isLoadingCountries}
                    isDisabled={true}
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
                {t('no_user_step.city_label')}
                <span className="text-red-500">*</span>
              </label>
              <Controller
                name="city"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('no_user_step.city_required')
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
                        if (country?.value) {
                          return item.country_id === parseInt(country.value)
                        }
                        return true
                      }).map((item) => ({
                        label: getLocalizedLabel(item),
                        value: item.id.toString()
                      })) || []
                    }
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption)
                      if (selectedOption) clearErrors('city')
                    }}
                    placeholder={t('no_user_step.city_placeholder')}
                    noOptionsMessage={() => t('no_user_step.no_city')}
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