import { useTranslation } from "react-i18next"
import { useForm, Controller } from "react-hook-form"
import Select from 'react-select'
import { BiLoaderAlt } from "react-icons/bi"
import CustomToast from "../common/CustomToast"
import { handleStylesWithErrors } from "../../utils/style"
import { useContactMessage } from "../../services/api/fetchChat"
import { ContactMessage } from "../../services/types/chat"
import { SelectType } from "../../services/types/select"

type FormValues = {
  name: string
  email: string
  message: string
  type: SelectType
}

const ContactForm = () => {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormValues>()
  const { mutateAsync: contactMessage, isLoading } = useContactMessage()

  const onSubmit = (data: FormValues) => {
    const messageToSend: ContactMessage = {
      name: data.name,
      email: data.email,
      message: data.message,
      type: data.type.value.toString()
    }

    contactMessage(messageToSend)
      .then(() => {
        reset()
        CustomToast(t("contact_page.message_envoye_avec_succes"), 'success')
      }).catch((err) => {
        console.log(err)
        CustomToast(t("une_erreur_est_survenue"), 'error')
      })
  }

  return (
    <div>
      <h2 className="text-xl text-primary-blue-sky font-semibold">
        {t("contact_page.title")}
      </h2>
      <h3 className="title-h3">
        {t("contact_page.subtitle2")}
      </h3>
      <div className="mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-600">
              {t("form.nom_complet")}
            </label>
            <input
              type="text"
              id="name"
              className={`input ${errors.name ? "border-red-500" : ""}`}
              placeholder={t("form.votre_nom_complet")}
              {...register("name", {
                required: t("form-err.nom_complet_obligatoire"),
                minLength: {
                  value: 2,
                  message: t("form-err.nom_complet_contenir_au_moins_2_caracteres")
                }
              })}
            />
            {/* error */}
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-600">
              {t("form.email")}
            </label>
            <input
              type="email"
              id="email"
              className={`input ${errors.email ? "border-red-500" : ""}`}
              placeholder={t("form.votre_email")}
              {...register("email", {
                required: t("form-err.email_obligatoire"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("form-err.email_invalide")
                }
              })}
            />
            {/* error */}
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-600">
              {t("choisissez_le_type_de_votre_demande")}
            </label>
            <Controller
              name="type"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t("form-err.type_obligatoire")
                }
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={t('type_de_votre_demande')}
                  options={[
                    { value: 'Support commercial', label: 'Support commercial' },
                    { value: 'Support technique', label: 'Support technique' },
                    { value: 'Support client', label: 'Support client' },
                    { value: 'Autre', label: 'Autre' },
                  ]}
                  className='z-50'
                  {...handleStylesWithErrors(errors.type ? true : false)}
                />
              )}
            />
            {/* error */}
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="message" className="block mb-2 text-base font-medium text-gray-600">
              {t("form.message")}
            </label>
            <textarea
              id="message"
              rows={4}
              className={`input ${errors.message ? "border-red-500" : ""}`}
              placeholder={t("form.votre_message")}
              {...register("message", {
                required: t("form-err.message_obligatoire"),
                minLength: {
                  value: 10,
                  message: t("form-err.message_contenir_au_moins_10_caracteres")
                }
              })}
            />
            {/* error */}
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              className={`btn-primary mt-3 ${isLoading ? "loading" : ""}`}
              type="submit"
              disabled={isLoading}
            >
              {
                isLoading ? (
                  <div className="flex justify-center items-center">
                    <BiLoaderAlt className="animate-spin text-white text-xl" />
                    <span className="ml-2">{t('chargement')}</span>
                  </div>
                ) : (
                  <span>
                    {t("envoyer_le_message")}
                  </span>
                )
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm