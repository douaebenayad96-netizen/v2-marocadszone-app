import { User } from "firebase/auth";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiLoaderAlt } from "react-icons/bi";
import { GoEye, GoEyeClosed } from "react-icons/go";
import PhoneInput from "react-phone-input-2";

import { useNavigate } from "react-router-dom";
import { useFirebaseAuth, useRegisterAuth } from "../../services/api/fetchAuth";
import { FirebaseUserData } from "../../services/firebase/authService";
import { useAuthStore } from "../../services/store/authStore";
import { useLoginModelStore } from "../../services/store/LoginModelStore";
import { AuthResponse, RegisterUser } from "../../services/types/auth";
import CustomToast from "../common/CustomToast";
import FirebaseOAuthButtons from "../FirebaseOAuthButtons";

type FormValues = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const RegisterForm = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormValues>();
  const { mutateAsync, isLoading, isError } = useRegisterAuth();
  const firebaseAuthMutation = useFirebaseAuth();
  const { setIsOpen } = useLoginModelStore();
  const { signIn } = useAuthStore();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showOldPassword1, setShowOldPassword1] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log("📝 Register form submitted with data:", data);
    mutateAsync(data as RegisterUser)
      .then((res: AuthResponse) => {
        // handle success
        CustomToast(t("compte_cree_avec_succes"), "success");
        reset();
        signIn(res, false);
        setIsOpen(false);
        navigate("/user/user-validation");
      })
      .catch((err) => {
        console.log("❌ Registration error:", err);
      });
  };

  // Firebase OAuth success handler - Use Firebase auth endpoint with fallback
  const handleFirebaseOAuthSuccess = async (
    _user: User,
    firebaseToken: string,
    userData: FirebaseUserData
  ) => {
    try {
      // Prepare data for the new Firebase auth endpoint
      const firebaseAuthData = {
        idToken: firebaseToken,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        providerId: userData.providerId,
      };

      // Use the new Firebase auth endpoint
      const firebaseResponse = await firebaseAuthMutation.mutateAsync(
        firebaseAuthData
      );

      // Sign in with Sanctum token
      reset();
      signIn(firebaseResponse.data, false);
      setIsOpen(false);
      navigate("/user/user-validation");
      CustomToast(t("compte_cree_avec_succes"), "success");
    } catch (exchangeError: unknown) {
      // For now, fall back to Firebase token, but show a warning
      CustomToast(
        "⚠️ Problème de validation Firebase sur le serveur. Utilisation du token Firebase local.",
        "warning"
      );

      // Fallback: Use Firebase token directly
      const authResponse: AuthResponse = {
        token: firebaseToken, // Use Firebase ID token directly
        user: {
          id: parseInt(userData.uid.slice(-10), 36), // Convert Firebase UID to number (rough conversion)
          email: userData.email || "",
          first_name: userData.displayName?.split(" ")[0] || "",
          last_name: userData.displayName?.split(" ").slice(1).join(" ") || "",
          phone_number: "", // Firebase doesn't provide phone by default
          roles: [],
        },
      };

      // Sign in with Firebase token
      reset();
      signIn(authResponse, false);
      setIsOpen(false);
      navigate("/user/user-validation");
      CustomToast(t("compte_cree_avec_succes") + " (Firebase)", "success");
    }
  };

  const handleFirebaseOAuthError = (error: string) => {
    console.error("Firebase OAuth error (register):", error);
    // Error is already shown by the FirebaseOAuthButtons component
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isError && (
          <div className="py-2 px-3 mb-3 w-full flex items-center gap-1 rounded-sm border border-red-400 bg-red-50">
            <span className="text-red-400 text-sm font-semibold">
              {t("email_deja_utilise")}
            </span>
          </div>
        )}
        {/* fullName */}
        <div>
          <div className="flex items-center gap-2">
            <input
              className={`input ${errors.first_name ? "border-red-500" : ""}`}
              type="text"
              id="firstname"
              placeholder={t("form.votre_prenom")}
              autoComplete="firstname"
              {...register("first_name", {
                required: t("form-err.prenom_obligatoire"),
                minLength: {
                  value: 2,
                  message: t("form-err.prenom_contenir_au_moins_2_caracteres"),
                },
              })}
            />

            <input
              className={`input ${errors.last_name ? "border-red-500" : ""}`}
              type="text"
              id="lastname"
              placeholder={t("form.votre_nom")}
              autoComplete="lastname"
              {...register("last_name", {
                required: t("form-err.nom_obligatoire"),
                minLength: {
                  value: 2,
                  message: t("form-err.nom_contenir_au_moins_2_caracteres"),
                },
              })}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* errors */}
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <div dir="ltr">
            <Controller
              control={control}
              name="phone_number"
              rules={{
                required: t("form-err.numero_telephone_obligatoire"),
                minLength: {
                  value: 10,
                  message: t(
                    "form-err.numero_telephone_contenir_au_moins_10_caracteres"
                  ),
                },
                validate: (value) => {
                  const phoneUtil = PhoneNumberUtil.getInstance();
                  const isValidPhone = phoneUtil.isValidNumber(
                    phoneUtil.parse(`+${value}`)
                  );
                  if (!isValidPhone) {
                    return t("form-err.numero_telephone_invalide");
                  } else {
                    return true;
                  }
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  country={"ma"}
                  placeholder="+212 123 456 789"
                  value={field.value as string}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  inputClass={`!w-full py-[6px] !border !border-gray-200 !rounded-md !text-gray-700 focus:!outline-none focus:!border-primary-blue-all-800 mt-3 ${
                    errors.phone_number ? "!border-red-500" : ""
                  }`}
                />
              )}
            />
          </div>

          {/* errors */}
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message}
            </p>
          )}
        </div>
        {/* email */}
        <input
          className={`input mt-3 ${errors.email ? "border-red-500" : ""}`}
          type="email"
          id="email"
          placeholder={t("form.votre_email")}
          autoComplete="email"
          {...register("email", {
            required: t("form-err.email_obligatoire"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("form-err.email_invalide"),
            },
          })}
        />
        {/* errors */}
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* password */}
        <div className="relative">
          <input
            className={`input mt-3 ${errors.password ? "border-red-500" : ""}`}
            type={showOldPassword ? "text" : "password"}
            id="password"
            placeholder={t("form.votre_mot_de_passe")}
            autoComplete="password"
            {...register("password", {
              required: t("form-err.mot_de_passe_obligatoire"),
              minLength: {
                value: 6,
                message: t(
                  "form-err.mot_de_passe_contenir_au_moins_6_caracteres"
                ),
              },
            })}
          />
          <div
            className={`absolute top-[62%] ${
              i18n.language === "ar" ? "left-4" : "right-4"
            }  transform -translate-y-1/2 text-primary-blue cursor-pointer`}
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? (
              <GoEyeClosed className="text-lg" />
            ) : (
              <GoEye className="text-lg" />
            )}
          </div>
        </div>
        <div className="relative">
          <input
            className={`input mt-3 ${
              errors.password_confirmation ? "border-red-500" : ""
            }`}
            type={showOldPassword1 ? "text" : "password"}
            id="password_confirmation"
            placeholder={t("Confirmer votre mot de passe")}
            autoComplete="password_confirmation"
            {...register("password_confirmation", {
              required: t("form-err.mot_de_passe_obligatoire"),
              minLength: {
                value: 6,
                message: t(
                  "form-err.mot_de_passe_contenir_au_moins_6_caracteres"
                ),
              },
            })}
          />
          <div
            className={`absolute top-[62%] ${
              i18n.language === "ar" ? "left-4" : "right-4"
            }  transform -translate-y-1/2 text-primary-blue cursor-pointer`}
            onClick={() => setShowOldPassword1(!showOldPassword1)}
          >
            {showOldPassword1 ? (
              <GoEyeClosed className="text-lg" />
            ) : (
              <GoEye className="text-lg" />
            )}
          </div>
        </div>
        {/* errors */}
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm">
            {errors.password_confirmation.message}
          </p>
        )}
        <div>
          <button
            className={`btn-primary w-full mt-3 ${isLoading ? "loading" : ""}`}
            type="submit"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <BiLoaderAlt className="animate-spin text-white text-xl" />
                <span className="ml-2">{t("chargement")}</span>
              </div>
            ) : (
              <span>{t("creer_un_compte")}</span>
            )}
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
          showFacebook={false} // Temporarily disabled until Firebase setup is complete
          showTwitter={false} // Temporarily disabled until Firebase setup is complete
        />
      </div>
    </div>
  );
};

export default RegisterForm;
