import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { UseFormReturn, Controller } from "react-hook-form"
import PhoneInput from 'react-phone-input-2'
import { PhoneNumberUtil } from 'google-libphonenumber'
import StepSectionHeader from "../common/StepSectionHeader"
import { FormValues } from "../../pages/StepsRegister"

type ContactStepProps = {
  form: UseFormReturn<FormValues>
}

const ContactStep = ({ form }: ContactStepProps) => {
  const { t } = useTranslation()
  const { register, control, formState: { errors } } = form

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.contact.title')}
        subtitle={t('post_job_form.contact.subtitle')}
      />
      <div className="flex flex-col gap-4 mt-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-base font-medium text-gray-600"
          >
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
              },
              onChange: () => form.trigger('email')
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Telephone */}
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-base font-medium text-gray-600"
          >
            {t("form.numero_telephone")}
          </label>
          <div dir="ltr">
            <Controller
              control={control}
              name="phone"
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
                },
                onChange: () => form.trigger('phone')
              }}
              render={({ field }) => (
                <PhoneInput
                  country={'ma'}
                  placeholder="+212 123 456 789"
                  value={field.value as string}
                  onChange={(e) => {
                    field.onChange(e)
                  }}

                  inputClass={`!w-full !h-[40px] !border !border-gray-200 !rounded-md !text-gray-700 focus:!outline-none focus:!border-primary-blue-all-800 ${errors.phone ? "!border-red-500" : ""}`}
                />
              )}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

     

      
      </div>
    </motion.div>
  )
}

export default ContactStep