import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import Skeleton from "react-loading-skeleton"
import Select from 'react-select'
import { TCheckoutState } from "../../services/types/checkoutState"
import { SelectType } from "../../services/types/select"
import { Media } from "../../services/types/media"
import { useAuthStore } from "../../services/store/authStore"
import { useGetUserInfo, useUpdateUserAdresse } from "../../services/api/fetchAuth"
import { useFetchCity } from "../../services/api/fetchCity"
import ModalLayout from "../layouts/ModalLayout"
import { handleStylesWithErrors } from "../../utils/style"
import CustomToast from "../common/CustomToast"
import { UpdateUserInfo } from "../../services/types/auth"



const AdressSkeleton = () => (
  <div className="p-4 flex items-center gap-4">
    <div className="flex flex-col gap-2">
      <div>
        <Skeleton width={100} />
      </div>
      <div>
        <Skeleton width={200} />
      </div>
      <div>
        <Skeleton width={142} height={38} />
      </div>
    </div>
  </div>
)

type ChangeAddressProps = {
  setHaveAddress: React.Dispatch<React.SetStateAction<string | null>>
  haveAddress: string | null
  state: TCheckoutState
}

type FormValues = {
  adresse: string
  city: SelectType | null
  zip: string
  media: Media[]

}

const ChangeAddress = ({ setHaveAddress, haveAddress, state }: ChangeAddressProps) => {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const token = useAuthStore(state => state.token)
  const { data, refetch, isLoading, isError } = useGetUserInfo(token as string, false)
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormValues>()
  const { mutateAsync: updateUser, isLoading: isLoadingSave } = useUpdateUserAdresse()
  const { data: citiesDataList, isLoading: isLoadingCities } = useFetchCity()

  useEffect(() => {
    if (token) refetch()
  }, [refetch, token])

  useEffect(() => {
    setHaveAddress(`${state?.demande?.adresse}, ${state?.demande?.ville?.label}`)
    reset({
      adresse: state?.demande?.adresse,
      city: state?.demande?.ville ? { value: state?.demande?.ville?.id, label: state?.demande?.ville?.label } : null,
    })
  }, [state, reset, setHaveAddress])

  // fill the form with the data if there no state
  // useEffect(() => {
  //   reset({
  //     adresse: data?.adresse,
  //     city: data?.ville ? { value: data?.ville?.id, label: data?.ville?.label_fr } : null,
  //     zip: data?.zip
  //   })
  // }, [data, reset])

  // useEffect(() => {
  //   if (data?.adresse || data?.ville || data?.zip) {
  //     setHaveAddress(`${data?.adresse}, ${data?.ville?.label_fr}, ${data?.zip}`)
  //   } else {
  //     setHaveAddress(null)
  //   }
  // }, [data, setHaveAddress])

  const onSubmit = (formData: FormValues) => {
    if (!token) return CustomToast(t('une_erreur_est_survenue'), "error")
    if (!formData.city) return CustomToast(t('la_ville_est_obligatoire'), "error")

    const updateData: UpdateUserInfo = {
      media: formData.media,
      city_artisan: formData.city.value,
      adresse: formData.adresse,
      zip: formData.zip
    }

    // if no data was on the user address
    if (!data?.adresse || !data?.city || !data?.zip) {
      updateUser({ token: token as string, user: updateData })
        .then(() => {
          CustomToast(t('check_out_page.votre_adresse_a_ete_mise_a_jour'), "success")
          setHaveAddress(`${formData.adresse}, ${formData?.city?.label}, ${formData.zip}`)
          refetch()
          setIsOpen(false)
        })
        .catch((err) => {
          CustomToast(t('une_erreur_est_survenue'), "error")
          console.log(err)
        })
    } else {
      setHaveAddress(`${formData.adresse}, ${formData.city.label}, ${formData.zip}`)
      setIsOpen(false)
      CustomToast(t('check_out_page.votre_adresse_a_ete_changee'), "success")
    }
  }

  return (
    <section className="border border-gray-200 rounded-sm">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h4
          className="title-h4"
        >
          {t('check_out_page.adresse_de_livraison')}
        </h4>
      </div>
      {
        (isLoading || isError) ? (
          <AdressSkeleton />
        )
          :
          (
            <div className="p-4 flex items-center gap-4">
              <div className="flex flex-col gap-2">
                <h5 className="text-base font-semibold capitalize">
                  {data?.first_name} {data?.last_name}
                </h5>
                <p>
                  {haveAddress ? (
                    haveAddress
                  ) :
                    (
                      <span className="text-red-500">
                        {t('check_out_page.vous_n_avez_pas_encore_ajout_d_adresse')}
                      </span>
                    )}
                </p>
                {/* <small
                  className="text-primary-blue cursor-pointer"
                >
                  {t('check_out_page.vous_pouvez_changer_votre_adresse_de_livraison_a_tout_moment')}
                </small>
                <div>
                  <SampleButton
                    callback={() => setIsOpen(true)}
                    text={haveAddress ? t("check_out_page.changer_l_adresse") : t('check_out_page.ajouter_une_adresse')}
                  />
                </div> */}
              </div>
            </div>
          )
      }

      <ModalLayout
        defaultHeader={true}
        className="relative w-[calc(100vw-16px)] max-w-[400px] mx-auto bg-white rounded-lg overflow-x-hidden"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        headerText={t('changer_l_adresse_de_livraison')}
        headerClassName="text-start"
        rtl={i18n.language === 'ar'}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 py-5"
        >
          {/* city */}
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
              <p className="text-red-500 text-sm">{errors.city.message}</p>
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
            {/* errors */}
            {errors.adresse && (
              <p className="text-red-500 text-sm">{errors.adresse.message}</p>
            )}
          </div>

          {/* zip */}
          <div className="mt-4">
            <label
              htmlFor="zip"
              className="label"
            >
              {t('code_postal')}
            </label>
            <input
              className={`input ${errors.zip ? "border-red-500" : ""}`}
              type="text"
              id="zip"
              placeholder={t('votre_code_postal')}
              autoComplete="zip"
              {...register("zip", {
                required: t('le_code_postal_est_obligatoire'),
                minLength: {
                  value: 2,
                  message: t('le_code_postal_doit_contenir_au_moins_2_caracteres')
                }
              })}
            />
            {/* errors */}
            {errors.zip && (
              <p className="text-red-500 text-sm">{errors.zip.message}</p>
            )}
          </div>

          {/* submit */}
          <div className="mt-6">
            <button
              type="submit"
              className={`btn-primary mx-auto w-full ${isLoadingSave ? "loading" : ""}`}
            >
              {
                isLoadingSave ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span>
                      {t('chargement')}
                    </span>
                  </span>
                ) : (
                  <span>
                    {t('enregistrer')}
                  </span>
                )
              }
            </button>
          </div>

        </form>
      </ModalLayout>
    </section >
  )
}

export default ChangeAddress