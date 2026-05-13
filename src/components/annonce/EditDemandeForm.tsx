import { Controller, useForm } from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import { PhoneNumberUtil } from "google-libphonenumber"
import { useTranslation } from "react-i18next"
import { BiLoaderAlt } from "react-icons/bi"

import { useEditPrestation } from "../../services/api/fetchService"
import { useAuthStore } from "../../services/store/authStore"
import { UpdateDemande } from "../../services/types/demandeType"
import CustomToast from "../common/CustomToast"

export type DemandeFormValues = {
  title: string
  tel: string
  address: string
  nbr: number
}

type EditDemandeFormProps = {
  defaultValues: DemandeFormValues
  demandId: number
  onCompleted?: () => void
}

const EditDemandeForm = ({ defaultValues, demandId, onCompleted }: EditDemandeFormProps) => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const { register, handleSubmit, formState: { errors }, control } = useForm<DemandeFormValues>({
    defaultValues
  })
  const {
    mutateAsync: updateDemande,
    isLoading,
  } = useEditPrestation(demandId?.toString(), token as string)

  const onSubmit = (data: DemandeFormValues) => {
    if (!token || isLoading) return
    const dataToSend: UpdateDemande = {
      nbr_heurs: data.nbr,
      tel: data.tel,
      adresse: data.address,
      titre: data.title
    }

    updateDemande(dataToSend)
      .then(() => {
        CustomToast(t('demande_modifiee_avec_succes'), "success")
        if (onCompleted) {
          onCompleted()
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="flex flex-col gap-4"
      >
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="title"
            className="text-sm text-gray-500"
          >
            {t("titre")}
          </label>
          <input
            type="text"
            id="title"
            className="input"
            placeholder={t("titre_de_la_demande")}
            {...register('title', { required: true })}
          />
          {/* errors */}
          {
            errors.title && (
              <span
                className="text-red-500 text-sm"
              >
                {t("titre_obligatoire")}
              </span>
            )
          }
        </div>
        {/* tel */}
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="tel"
            className="text-sm text-gray-500"
          >
            {t("form.numero_telephone")}
          </label>
          <div dir="ltr">
            <Controller
              control={control}
              name="tel"
              rules={{
                required: t("form-err.numero_telephone_obligatoire"),
                minLength: {
                  value: 10,
                  message: t("form-err.numero_telephone_contenir_au_moins_10_caracteres")
                },
                validate: (value) => {
                  const phoneUtil = PhoneNumberUtil.getInstance()
                  const isValidPhone = phoneUtil.isValidNumber(phoneUtil.parse(`+${value}`))
                  if (!isValidPhone) {
                    return t("form-err.numero_telephone_invalide")
                  } else {
                    return true
                  }
                }
              }}
              render={({ field }) => (
                <PhoneInput
                  country={'ma'}
                  placeholder="+212 123 456 789"
                  value={field.value as string}
                  onChange={(e) => {
                    field.onChange(e)
                  }}
                  inputClass={`!w-full py-[6px] !border !border-gray-200 !rounded-md !text-gray-700 focus:!outline-none focus:!border-primary-blue-all-800 mt-3 ${errors.tel ? "!border-red-500" : ""}`}
                />
              )}
            />
          </div>
          {/* errors */}
          {
            errors.tel && (
              <span
                className="text-red-500 text-sm"
              >
                {errors.tel.message}
              </span>
            )
          }
        </div>
        {/* address */}
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="address"
            className="text-sm text-gray-500"
          >
            {t("adresse")}
          </label>
          <input
            type="text"
            id="address"
            className="input"
            placeholder={t("adresse_de_la_demande")}
            {...register('address', {
              required: {
                value: true,
                message: t("adresse_obligatoire")
              },
              pattern: {
                value: /^[a-zA-Z0-9\s,.'-]{3,}$/,
                message: t("adresse_invalide")
              }
            })}
          />
          {/* errors */}
          {
            errors.address && (
              <span
                className="text-red-500 text-sm"
              >
                {errors.address.message}
              </span>
            )
          }
        </div>
        {/* nbr hours */}
        <div
          className="flex flex-col gap-2"
        >
          <label
            htmlFor="nbr"
            className="text-sm text-gray-500"
          >
            {
              t("nombre_d_heures")
            }
          </label>
          <input
            type="number"
            id="nbr"
            className="input"
            placeholder={t("nombre_d_heures")}
            {...register('nbr', {
              required: {
                value: true,
                message: t("nombre_d_heures_obligatoire")
              },
              min: {
                value: 1,
                message: t("nombre_d_heures_minimum_est_1")
              },
              max: {
                value: 248,
                message: t("nombre_d_heures_maximum_est_248")
              }
            })}
          />
          {/* errors */}
          {
            errors.nbr && (
              <span
                className="text-red-500 text-sm"
              >
                {errors.nbr.message}
              </span>
            )
          }
        </div>
      </div>
      <button
        type="submit"
        className={`btn-primary w-full mt-4 ${isLoading ? "loading" : ""}`}
      >
        {
          isLoading ? (
            <div className="flex justify-center items-center">
              <BiLoaderAlt className="animate-spin text-white text-xl" />
              <span className="ml-2">{t('chargement')}</span>
            </div>
          ) : (
            <span>
              {
                t("enregistrer_les_modifications")
              }
            </span>
          )
        }
      </button>
    </form>
  )
}

export default EditDemandeForm