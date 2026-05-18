import { User } from "firebase/auth";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiLoaderAlt } from "react-icons/bi";
import { GoEye, GoEyeClosed } from "react-icons/go";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

import {
  useFirebaseAuth,
  useRegisterAuth,
  useVerifyOtp,
} from "../../services/api/fetchAuth";
import { FirebaseUserData } from "../../services/firebase/authService";
import { useAuthStore } from "../../services/store/authStore";
import { useLoginModelStore } from "../../services/store/LoginModelStore";
import { AuthResponse, RegisterUser } from "../../services/types/auth";
import { getAuthErrorMessage, getOtpErrorMessage } from "../../utils/apiMessages";
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
    getValues,
  } = useForm<FormValues>();

  const { mutateAsync, isLoading, isError } = useRegisterAuth();
  const verifyOtpMutation = useVerifyOtp();

  const firebaseAuthMutation = useFirebaseAuth();
  const { setIsOpen, setIsLoginSelected } = useLoginModelStore();
  const { signIn } = useAuthStore();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showOldPassword1, setShowOldPassword1] = useState(false);

  const [showOtpStep, setShowOtpStep] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registerResponse, setRegisterResponse] = useState<AuthResponse | null>(null);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const res: any = await mutateAsync(data as RegisterUser);

      console.log("register response", res);

      const emailFromResponse = res?.email || data.email;

      const requiresEmailVerification =
        res?.requires_email_verification === true ||
        res?.requiresEmailVerification === true;

      if (requiresEmailVerification) {
        localStorage.setItem("otp_email", emailFromResponse);
        setRegisterResponse(null);
        setRegisteredEmail(emailFromResponse);
        setShowOtpStep(true);

        CustomToast(
          "Votre compte a été créé. Vérifiez votre email pour le code OTP.",
          "success"
        );
        return;
      }

      setRegisterResponse(res);
      setRegisteredEmail(emailFromResponse);
      setShowOtpStep(true);

      CustomToast(
        "Votre compte a été créé. Vérifiez votre email pour le code OTP.",
        "success"
      );
    } catch (err: any) {
      console.log("❌ Registration error:", err);
      CustomToast(getAuthErrorMessage(err), "error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const otpResponse: any = await verifyOtpMutation.mutateAsync({
        email: registeredEmail || getValues("email"),
        otp,
      });

      console.log("Full OTP response:", JSON.stringify(otpResponse));

      // Sign in with OTP response (contains token + user)
      if (otpResponse) {
        await signIn(otpResponse, true);
      }

      CustomToast("Email vérifié avec succès.", "success");

      reset();
      setOtp("");
      setRegisteredEmail("");
      setShowOtpStep(false);
      setIsOpen(false);

      setTimeout(() => {
        window.location.replace("/annonces/new");
      }, 300);

    } catch (err: any) {
      CustomToast(getOtpErrorMessage(err), "error");
    }
  };

  const handleFirebaseOAuthSuccess = async (
    _user: User,
    firebaseToken: string,
    userData: FirebaseUserData
  ) => {
    const firebaseAuthData = {
      idToken: firebaseToken,
      email: userData.email,
      providerId: userData.providerId || "google.com",
    };

    try {
      const firebaseResponse = await firebaseAuthMutation.mutateAsync(firebaseAuthData);

      reset();
      signIn(firebaseResponse, true);
      setIsOpen(false);
      navigate("/user-account/dashboard");
    } catch (err: any) {
      console.error("Firebase backend auth error:", err);
      CustomToast(getAuthErrorMessage(err), "error");
    }
  };

  const handleFirebaseOAuthError = (error: string) => {
    console.error("Firebase OAuth error (register):", error);
  };

  if (showOtpStep) {
    return (
      <div>
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Vérifiez votre email
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Entrez le code OTP envoyé à:
          </p>
          <p className="text-sm font-semibold text-gray-700">
            {registeredEmail}
          </p>
        </div>

        <input
          className="input mt-3 text-center tracking-widest"
          type="text"
          placeholder="Code OTP"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          className={`btn-primary w-full mt-3 ${
            verifyOtpMutation.isLoading ? "loading" : ""
          }`}
          type="button"
          onClick={handleVerifyOtp}
          disabled={verifyOtpMutation.isLoading || otp.length < 6}
        >
          {verifyOtpMutation.isLoading ? (
            <div className="flex justify-center items-center">
              <BiLoaderAlt className="animate-spin text-white text-xl" />
              <span className="ml-2">{t("chargement")}</span>
            </div>
          ) : (
            <span>Confirmer le code</span>
          )}
        </button>

        <button
          type="button"
          className="w-full mt-3 text-sm text-gray-500 hover:text-orange-500"
          onClick={() => setShowOtpStep(false)}
        >
          Retour
        </button>
      </div>
    );
  }

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

                  return isValidPhone
                    ? true
                    : t("form-err.numero_telephone_invalide");
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  country={"ma"}
                  placeholder="+212 123 456 789"
                  value={field.value as string}
                  onChange={(e) => field.onChange(e)}
                  inputClass={`!w-full py-[6px] !border !border-gray-200 !rounded-md !text-gray-700 focus:!outline-none focus:!border-primary-blue-all-800 mt-3 ${
                    errors.phone_number ? "!border-red-500" : ""
                  }`}
                />
              )}
            />
          </div>

          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message}
            </p>
          )}
        </div>

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

        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

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

        <div className="relative">
          <input
            className={`input mt-3 ${
              errors.password_confirmation ? "border-red-500" : ""
            }`}
            type={showOldPassword1 ? "text" : "password"}
            id="password_confirmation"
            placeholder="Confirmer votre mot de passe"
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
            } transform -translate-y-1/2 text-primary-blue cursor-pointer`}
            onClick={() => setShowOldPassword1(!showOldPassword1)}
          >
            {showOldPassword1 ? (
              <GoEyeClosed className="text-lg" />
            ) : (
              <GoEye className="text-lg" />
            )}
          </div>
        </div>

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
          showFacebook={false}
          showTwitter={false}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
