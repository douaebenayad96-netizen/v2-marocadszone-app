import { BiLoaderAlt } from "react-icons/bi"
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { useChangePassword } from "../../services/api/fetchAuth"
import { ChangePassword } from "../../services/types/auth"
import { useAuthStore } from "../../services/store/authStore"
import CustomToast from "../common/CustomToast";

type FormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePasswordForm = () => {
  const { t, i18n } = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>()
  const { mutateAsync: changePassword, isLoading } = useChangePassword()
  const token = useAuthStore(state => state.token)
  const [showOldPassword, setShowOldPassword] = useState(false)

  const onSubmit = (data: FormValues) => {
    const updatePSW: ChangePassword = {
      current_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword
    }

    changePassword({ changePassword: updatePSW, token: token as string })
      .then(() => {
        CustomToast(t("profile.profile.mot_de_passe_mis_a_jour"), "success")
        reset()
      }).catch((err) => {
        console.log(err)
        CustomToast(t("profile.profile.erreur_lors_de_la_mise_a_jour_du_mot_de_passe"), "error")
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:pr-5 md:flex-row md:items-center">
        <div
          className="w-full md:w-1/2">
          <div className="mb-4">
            <label
              htmlFor="old-password"
              className="label"
            >
              {t("profile.profile.ancien_mot_de_passe")}
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="old-password"
                className={`input ${errors.oldPassword ? "error" : ""}`}
                placeholder="********"
                {...register("oldPassword", {
                  required: {
                    value: true,
                    message: t("profile.profile.veuillez_saisir_votre_mot_de_passe")
                  },
                  minLength: {
                    value: 8,
                    message: t("profile.profile.votre_mot_de_passe_doit_contenir_au_moins_8_caracteres")
                  }
                })}
              />
              <div
                className={`absolute top-1/2 ${i18n.dir() === 'rtl' ? 'left-4' : 'right-4'} transform -translate-y-1/2 text-primary-blue cursor-pointer`}
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {
                  showOldPassword ? (
                    <GoEyeClosed className="text-lg" />
                  ) : (
                    <GoEye className="text-lg" />
                  )
                }
              </div>
            </div>
            {/* errors */}
            {errors.oldPassword && (
              <span className="text-sm text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="label"
            >
              {t("profile.profile.nouveau_mot_de_passe")}
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="new-password"
              className={`input ${errors.newPassword ? "error" : ""}`}
              placeholder="********"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: t("profile.profile.veuillez_saisir_votre_nouveau_mot_de_passe")
                },
                minLength: {
                  value: 8,
                  message: t("profile.profile.votre_mot_de_passe_doit_contenir_au_moins_8_caracteres")
                }
              })}
            />
            {/* errors */}
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="label"
            >
              {t("profile.profile.confirmer_nouveau_mot_de_passe")}
            </label>
            <input
              type={showOldPassword ? "text" : "password"}
              id="confirm-password"
              className={`input ${errors.confirmPassword ? "error" : ""}`}
              placeholder="********"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: t("profile.profile.veuillez_confirmer_votre_nouveau_mot_de_passe")
                },
                minLength: {
                  value: 8,
                  message: t("profile.profile.votre_mot_de_passe_doit_contenir_au_moins_8_caracteres")
                },
                validate: value => value === watch("newPassword") || "Les mots de passe ne correspondent pas"
              })}
            />
            {/* errors */}
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className={`btn-primary ${isLoading ? "loading" : ""}`}
        >
          {
            isLoading ? (
              <div className="flex justify-center items-center">
                <BiLoaderAlt className="animate-spin text-white text-xl" />
                <span className="ml-2">
                  {t("chargement")}
                </span>
              </div>
            ) : (
              <span>
                {t("profile.profile.changer_le_mot_de_passe")}
              </span>
            )
          }
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordForm