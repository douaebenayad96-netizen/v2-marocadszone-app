import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Controller, UseFormReturn } from "react-hook-form"
import Select from 'react-select'
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { Autocomplete, useLoadScript } from '@react-google-maps/api'

import { useFetchCity } from "../../services/api/fetchCity"
import { useGetUserInfo } from "../../services/api/fetchAuth"
import { useAuthStore } from "../../services/store/authStore"
import { FormValues } from "../../pages/StepsRegister"
import StepSectionHeader from "../common/StepSectionHeader"
import { handleStylesWithErrors } from "../../utils/style"



type LocationSelectStepProps = {

  form: UseFormReturn<FormValues>
}

const LocationSelectStep = ({ form }: LocationSelectStepProps) => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const { register, formState: { errors }, control } = form
  const { data: citiesDataList, isLoading: isLoadingCities } = useFetchCity()
  const { refetch, isLoading, isError } = useGetUserInfo(token as string, false)
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete>()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS_KEY as string,
    libraries: ['places']
  })

  useEffect(() => {

    if (token) refetch()
  }, [refetch, token])



  const onPlaceChanged = () => {
    console.log(autoComplete)
    if (autoComplete) {
      const place = autoComplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const geometryLocation = place.geometry.location;
        const lat = geometryLocation.lat().toString();
        const lng = geometryLocation.lng().toString();
        console.log('Latitude:', lat);
        console.log('Longitude:', lng);
        form.setValue('latitude', lat);
        form.setValue('longitude', lng);

        // Optionally, you can register latitude and longitude as hidden inputs
        register('latitude');
        register('longitude');

        // setLatitude(lat);
        // setLongitude(lng);
      } else {
        console.error('Place geometry or location is undefined.');
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.adresse_de_la_prestation.title')}
        subtitle={t('post_job_form.adresse_de_la_prestation.subtitle')}
      />

      <div>
        {
          (isLoading || isError) ? (
            <AdressSkeleton />
          )
            :
            (
              <div className="flex items-center gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <label
                      htmlFor="city"
                      className="label"
                    >
                      {t('ville')}
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{
                        required: t('la_ville_est_obligatoire'),
                        minLength: {
                          value: 2,
                          message: t('la_ville_doit_contenir_au_moins_2_caracteres')
                        }
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          placeholder={t('votre_ville')}
                          options={citiesDataList?.map((city) => ({ value: city.id, label: city.label }))}
                          isLoading={isLoadingCities}
                          {...handleStylesWithErrors(errors.city ? true : false)}
                        />
                      )}
                    />
                    {/* errors */}
                    {errors.city && (
                      <p className="text-red-500 text-sm">error city</p>
                    )}
                  </div>

                  {/* address */}
                  <div className="mt-4">
                    <label
                      htmlFor="adresse"
                      className="label"
                    >
                      {t('adresse')}
                    </label>
                    {
                      isLoaded && (
                        <Autocomplete
                          onLoad={(autoC) => setAutoComplete(autoC)}
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            className={`input ${errors.adresse ? "border-red-500" : ""}`}
                            type="text"
                            id="adresse"
                            placeholder={t('votre_adresse')}
                            autoComplete="adresse"
                            {...register("adresse", {
                              required: t('l_adresse_est_obligatoire'),
                              minLength: {
                                value: 2,
                                message: t('l_adresse_doit_contenir_au_moins_2_caracteres')
                              }
                            })}
                          />
                        </Autocomplete>
                      )
                    }
                    {/* errors */}
                    {errors.adresse && (
                      <p className="text-red-500 text-sm">errors adresse</p>
                    )}
                  </div>

                </div>
              </div>
            )
        }
      </div>

    </motion.div>
  )
}

const AdressSkeleton = () => (
  <div className="flex items-center gap-4 w-full">
    <div className="flex flex-col gap-2 w-full">
      <div>
        <Skeleton width={100} />
      </div>
      <div>
        <Skeleton width={200} />
      </div>
      <div>
        <Skeleton width={200} height={15} />
      </div>
      <div>
        <Skeleton className="w-full" height={38} />
      </div>
    </div>
  </div>
)

export default LocationSelectStep