import { FcGoogle } from "react-icons/fc"
import { BiLoaderAlt } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import SampleButton from "../components/ui/SampleButton"
import SellerBg from "../assets/img/become-seller-pic.png"
import { useRegisterSeller } from "../services/api/fetchAuth"
import { AuthResponse, RegisterUser } from "../services/types/auth"
import CustomToast from "../components/common/CustomToast"
import { useAuthStore } from "../services/store/authStore"

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

const BecomeSellerPage = () => {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const { mutateAsync: registerSeller, isLoading } = useRegisterSeller()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { signIn } = useAuthStore()
  const navigate = useNavigate()

  // submit form
  const onSubmit = (data: FormValues) => {
    const userSeller: RegisterUser = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_number: data.phone,
      password: data.password,
      password_confirmation: data.password
    }
    // save seller
    registerSeller(userSeller).then((res) => {
      // TODO: handle success
      const response: AuthResponse = {
        token: res.token,
        user: res.prestataire
      }
      signIn(response, false)
      CustomToast(t('compte_cree_avec_succes'))
      navigate("/")
      reset()
    }).catch((err) => {
     // console.log(err)
      if (axios.isAxiosError(err)) {
        if ((err as unknown as { response: { status: number } }).response.status === 400) {
          setSubmitError(t('email_deja_utilise'))
        } else if ((err as unknown as { response: { status: number } }).response.status === 500) {
          setSubmitError(t('erreur_du_serveur'))
        } else if ((err as unknown as { response: { status: number } }).response.status === 404) {
          setSubmitError(t('register_non_trouvee'))
        } else if ((err as unknown as { response: { status: number } }).response.status === 403) {
          setSubmitError(t('acces_interdit'))
        } else if ((err as unknown as { response: { status: number } }).response.status === 401) {
          setSubmitError(t('non_autorise'))
        }
      }
    })
  }

  return (
    <div className="pt-nav min-h-screen bg-cover bg-center bg-no-repeat bg-black bg-opacity-50 bg-blend-darken"
      style={{ backgroundImage: `url(${SellerBg})` }}
    >
      <div className="flex justify-start gap-10"
      >
        <div className="bg-transparent md:bg-white flex justify-center items-center p-2 min-h-[calc(100vh-64px)] w-full md:w-[60%] lg:w-[45%]">
          <div className="flex flex-col gap-5 w-full max-w-[400px]">
            <div className="flex flex-col gap-5 bg-white p-6 rounded-md overflow-hidden">
              <h1 className="title-h3 text-center mb-3">
                {t('devenir_prestataire')}
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* error */}
                {
                  submitError && (
                    <div
                      className='py-2 px-3 mb-3 w-full flex items-center gap-1 rounded-sm border border-red-400 bg-red-50'
                    >
                      <span
                        className='text-red-400 text-sm font-semibold'
                      >
                        {submitError}
                      </span>
                    </div>
                  )
                }
                {/* first name */}
                <div className="mb-2">
                  <label
                    className="block mb-2 text-base font-medium text-gray-600"
                    htmlFor="firstName"
                  >
                    {t("form.prenom")}:
                  </label>
                  <input
                    className={`input ${errors.firstName ? "error" : ""}`}
                    type="text"
                    id="firstName"
                    {...register("firstName", { required: true })}
                    placeholder={t("form.votre_prenom")}
                  />
                  {/* errors */}
                  {errors.firstName && <p className="text-red-500 text-sm">{t("form-err.prenom_obligatoire")}</p>}
                </div>

                {/* last name */}
                <div className="my-2">
                  <label
                    className="block mb-2 text-base font-medium text-gray-600"
                    htmlFor="lastName"
                  >
                    {t("form.nom")}:
                  </label>
                  <input
                    className={`input ${errors.lastName ? "error" : ""}`}
                    type="text"
                    id="lastName"
                    placeholder={t("form.votre_nom")}
                    {...register("lastName", { required: true })}
                  />
                  {/* errors */}
                  {errors.lastName && <p className="text-red-500 text-sm">
                    {t("form-err.nom_obligatoire")}
                  </p>}
                </div>

                {/* email */}
                <div className="my-2">
                  <label
                    className="block mb-2 text-base font-medium text-gray-600"
                    htmlFor="email"
                  >
                    {t("form.email")}:
                  </label>
                  <input
                    className={`input ${errors.email ? "error" : ""}`}
                    type="email"
                    id="email"
                    placeholder={t("form.votre_email")}
                    {...register("email", { required: true })}
                  />
                  {/* errors */}
                  {errors.email && <p className="text-red-500 text-sm">
                    {t("form-err.email_obligatoire")}
                  </p>}
                </div>

                {/* telephone */}
                <div>
                  <label
                    className="block my-2 text-base font-medium text-gray-600"
                    htmlFor="phone"
                  >
                    {t("form.numero_telephone")}:
                  </label>
                  <input
                    className={`input ${errors.phone ? "error" : ""}`}
                    type="tel"
                    id="phone"
                    placeholder={t("form.votre_numero_telephone")}
                    {...register("phone", {
                      required: {
                        value: true,
                        message: t("form-err.numero_telephone_obligatoire")
                      },
                      minLength: {
                        value: 10,
                        message: t("form-err.numero_telephone_contenir_au_moins_10_caracteres")
                      },
                      maxLength: {
                        value: 13,
                        message: t("form-err.numero_telephone_contenir_au_plus_13_caracteres")
                      },
                    })}
                  />
                  {/* errors */}
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                {/* password */}
                <div className="my-2">
                  <label
                    className="block mb-2 text-base font-medium text-gray-600"
                    htmlFor="password"
                  >
                    {t("form.mot_de_passe")}:
                  </label>
                  <input
                    className={`input ${errors.password ? "error" : ""}`}
                    type="password"
                    id="password"
                    placeholder={t("form.votre_mot_de_passe")}
                    {...register("password", {
                      required: {
                        value: true,
                        message: t("form-err.mot_de_passe_obligatoire")
                      },
                      minLength: {
                        value: 8,
                        message: t("form-err.mot_de_passe_contenir_au_moins_8_caracteres")
                      },
                      maxLength: {
                        value: 20,
                        message: t("form-err.mot_de_passe_contenir_au_plus_20_caracteres")
                      },
                    })}
                  />
                  {/* errors */}
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                {/* submit */}
                <div>
                  <button
                    className={`btn-primary w-full mt-3 ${isLoading ? "loading" : ""}`}
                    type="submit"
                  >
                    {
                      isLoading ? (
                        <div className="flex justify-center items-center">
                          <BiLoaderAlt className="animate-spin text-white text-xl" />
                          <span className="ml-2">
                            {t('chargement')}
                          </span>
                        </div>
                      ) : (
                        <span>
                          {t('devenir_prestataire')}
                        </span>
                      )
                    }
                  </button>
                </div>
              </form>
              {/* or google */}
              <div className="py-2 relative">
                <div className="line"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[3px] bg-white px-2 text-sm text-gray-600">
                  ou
                </div>
              </div>
              <div className="w-full">
                <SampleButton text={t("se_connecter_google")} icon={<FcGoogle className="text-xl" />} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BecomeSellerPage