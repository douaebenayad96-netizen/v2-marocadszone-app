import { useForm } from "react-hook-form"
import { BiLoaderAlt } from "react-icons/bi"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { User } from 'firebase/auth';

import { useLoginAuth, useFirebaseAuth } from "../../services/api/fetchAuth"
import { AuthResponse, LoginUser } from "../../services/types/auth"
import { useAuthStore } from "../../services/store/authStore"
import { useLoginModelStore } from "../../services/store/LoginModelStore"
import CustomToast from "../common/CustomToast"
import FirebaseOAuthButtons from "../FirebaseOAuthButtons"
import { FirebaseUserData } from "../../services/firebase/authService"

type FormValues = {
  email: string
  password: string
}

const LoginForm = () => {
  const { t, i18n } = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
  const { mutateAsync, isLoading, isError } = useLoginAuth()
  const firebaseLoginMutation = useFirebaseAuth()
  const { setIsOpen } = useLoginModelStore()
  const { signIn } = useAuthStore()
  const [showOldPassword, setShowOldPassword] = useState(false)

  const onSubmit = (data: FormValues) => {
    mutateAsync(data as LoginUser)
      .then((res: AuthResponse) => {
        // handle success
        CustomToast(t('connexion_reussie'), 'success')
        reset()
        signIn(res, false)
        setIsOpen(false)
      }).catch((err) => {
        console.log(err);
        CustomToast(t('erreur_du_serveur'), 'error')
      })
  }

  // Firebase OAuth success handler
  const handleFirebaseOAuthSuccess = async (user: User, firebaseToken: string, userData: FirebaseUserData) => {
    try {
      console.log('🔥 Firebase OAuth Success - exchanging for Laravel token...');
      console.log('Firebase user data:', userData);
      console.log('Firebase token length:', firebaseToken.length);
      
      // Use the proper Firebase login API to exchange tokens
      const firebaseLoginData = {
        firebaseToken: firebaseToken,
        email: userData.email,
        name: userData.displayName,
        photoURL: userData.photoURL,
        providerId: userData.providerId
      };
      
      console.log('🚀 Sending Firebase data to Laravel:', firebaseLoginData);
      
      // Exchange Firebase token for Laravel token using the mutation
      const laravelAuthResponse = await firebaseLoginMutation.mutateAsync(firebaseLoginData);
      
      console.log('✅ Laravel auth response received:', laravelAuthResponse);
      
      // Sign in with Laravel token
      reset();
      signIn(laravelAuthResponse, false);
      setIsOpen(false);
      
      console.log('🎉 User successfully signed in with Laravel token');
      
    } catch (error) {
      console.error('❌ Firebase to Laravel token exchange failed:', error);
      
      // Enhanced error logging for Firebase
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; statusText?: string; data?: unknown } };
        console.error('📊 Detailed Firebase error:', {
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          url: '/login/firebase'
        });
        
        // Show specific error messages
        if (axiosError.response?.status === 404) {
          CustomToast('Endpoint Firebase non trouvé sur le serveur. Contactez le support technique.', 'error');
        } else if (axiosError.response?.status === 401) {
          CustomToast('Token Firebase invalide', 'error');
        } else if (axiosError.response?.status === 500) {
          CustomToast('Erreur interne du serveur', 'error');
        } else {
          CustomToast(`Erreur ${axiosError.response?.status}: ${axiosError.response?.statusText}`, 'error');
        }
      } else {
        CustomToast('Erreur lors de l\'échange de token Firebase', 'error');
      }
    }
  };

  const handleFirebaseOAuthError = (error: string) => {
    console.error('Firebase OAuth error:', error);
    CustomToast('Erreur d\'authentification Firebase: ' + error, 'error');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {
          isError && (
            <div
              className='py-2 px-3 mb-3 w-full flex items-center gap-1 rounded-sm border border-red-400 bg-red-50'
            >
              <span
                className='text-red-400 text-sm font-semibold'
              >
                {t('erreur_connexion')}
              </span>
            </div>
          )
        }
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="email"
          >
            {t("form.email")}
          </label>
          <input
            className={`input ${errors.email ? "border-red-500" : ""}`}
            type="email"
            id="email"
            placeholder={t("form.votre_email")}
            autoComplete="email"
            {...register("email", {
              required: { value: true, message: t("form-err.email_obligatoire") },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("form-err.email_invalide")
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-3">
          <label
            className="block mb-2 text-sm font-medium text-gray-600"
            htmlFor="password"
          >
            {t("form.mot_de_passe")}
          </label>
          <div className="relative">
            <input
              className={`input ${errors.password ? "border-red-500" : ""}`}
              type={showOldPassword ? "text" : "password"}
              id="password"
              placeholder={t("form.votre_mot_de_passe")}
              autoComplete="current-password"
              {...register("password", {
                required: { value: true, message: t("form-err.mot_de_passe_obligatoire") },
                minLength: { value: 6, message: t("form-err.mot_de_passe_contenir_au_moins_6_caracteres") }
              })}
            />
            <div
              className={`absolute top-1/2 ${i18n.language === 'ar' ? "left-4" : "right-4"} transform -translate-y-1/2 text-primary-blue cursor-pointer`}
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button
            className={`btn-primary w-full mt-3 ${isLoading ? "loading" : ""}`}
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
                  {t("se_connecter")}
                </span>
              )
            }
          </button>
        </div>
      </form>
      
      {/* Firebase OAuth */}
      <div className="py-2 relative mt-3">
        <div className="line"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[3px] bg-white px-2 text-sm text-gray-600">
          {t("ou")}
        </div>
      </div>
      
      <div className="w-full mt-3">
        <FirebaseOAuthButtons
          onSuccess={handleFirebaseOAuthSuccess}
          onError={handleFirebaseOAuthError}
          showGoogle={true}
          showFacebook={true}
          showTwitter={false}  // Keep disabled for now
        />
      </div>
    </div>
  )
}

export default LoginForm