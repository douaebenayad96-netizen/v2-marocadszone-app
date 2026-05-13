import { User } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiLoaderAlt } from "react-icons/bi";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebaseAuth, useLoginAuth } from "../../services/api/fetchAuth";
import { FirebaseUserData } from "../../services/firebase/authService";
import { useAuthStore } from "../../services/store/authStore";
import { useLoginModelStore } from "../../services/store/LoginModelStore";
import { AuthResponse, LoginUser } from "../../services/types/auth";
import CustomToast from "../common/CustomToast";
import FirebaseOAuthButtons from "../FirebaseOAuthButtons";

type FormValues = {
  email: string;
  password: string;
};

const ACCOUNT_DASHBOARD_PATH = "/user-account/dashboard";

const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const { mutateAsync, isLoading, isError } = useLoginAuth();
  const navigate = useNavigate();
  const { mutateAsync: firebaseLoginAsync, isLoading: isFirebaseLoading } =
    useFirebaseAuth();
  const { setIsOpen } = useLoginModelStore();
  const { signIn } = useAuthStore();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const onSubmit = (data: FormValues) => {
    mutateAsync(data as LoginUser)
      .then((res: AuthResponse) => {
        // const { data } = res;
        CustomToast(t("connexion_reussie"), "success");

        signIn(res, true);
        setIsOpen(false);
        reset();

        window.location.href = ACCOUNT_DASHBOARD_PATH;
      })
      .catch((err: AxiosError<{ message: string }>) => {
        if (err.message === "Invalid input data") {
          toast.error("Email ou password incorrect");
          return;
        }
        CustomToast("Erreur. Veuillez réessayer plus tard.", "error");
      });
  };

  // Firebase OAuth success handler - Hybrid approach
  const handleFirebaseOAuthSuccess = async (
    _user: User,
    firebaseToken: string,
    userData: FirebaseUserData
  ) => {
    const firebaseData = {
  idToken: firebaseToken,
  email: userData.email,
  providerId: userData.providerId || "google.com",
};

    // Attempt to exchange Firebase token for Sanctum token
    const firebaseResponse = await firebaseLoginAsync(firebaseData).catch(
      () => null
    );

    // Common success flow
    reset();
    if (firebaseResponse) {
      signIn(firebaseResponse, true);
    }
    setIsOpen(false);
    CustomToast(
      t("connexion_reussie") + (firebaseResponse ? "" : " (Firebase)"),
      "success"
    );

    window.location.href = ACCOUNT_DASHBOARD_PATH;
  };

  const handleFirebaseOAuthError = (error: string) => {
    console.error("Firebase OAuth error:", error);
    // Error is already shown by the FirebaseOAuthButtons component
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isError && (
          <div className="py-2 px-3 mb-3 w-full flex items-center gap-1 rounded-sm border border-red-400 bg-red-50">
            <span className="text-red-400 text-sm font-semibold">
              {t("erreur_connexion")}
            </span>
          </div>
        )}
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
              required: {
                value: true,
                message: t("form-err.email_obligatoire"),
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("form-err.email_invalide"),
              },
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
                required: {
                  value: true,
                  message: t("form-err.mot_de_passe_obligatoire"),
                },
                minLength: {
                  value: 6,
                  message: t(
                    "form-err.mot_de_passe_contenir_au_moins_6_caracteres"
                  ),
                },
              })}
            />
            <div
              className={`absolute top-1/2 ${
                i18n.language === "ar" ? "left-4" : "right-4"
              } transform -translate-y-1/2 text-primary-blue cursor-pointer`}
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <GoEyeClosed className="text-lg" />
              ) : (
                <GoEye className="text-lg" />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button
            className={`btn-primary w-full mt-3 ${
              isLoading || isFirebaseLoading ? "loading" : ""
            }`}
            type="submit"
            disabled={isLoading || isFirebaseLoading}
          >
            {isLoading || isFirebaseLoading ? (
              <div className="flex justify-center items-center">
                <BiLoaderAlt className="animate-spin text-white text-xl" />
                <span className="ml-2">
                  {isFirebaseLoading ? t("chargement") : t("chargement")}
                </span>
              </div>
            ) : (
              <span>{t("se_connecter")}</span>
            )}
          </button>
        </div>
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="text-primary-orange text-sm mt-2 hover:underline"
            onClick={() => {
              setIsOpen(false);
              navigate("forgot-password");
            }}
          >
            Mot de passe oublié?
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

export default LoginForm;
