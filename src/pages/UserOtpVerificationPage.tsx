import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CustomToast from "../components/common/CustomToast";
import OtpInput4 from "../components/auth/OtpInput4";
import { useResendOtp, useVerifyOtp } from "../utils/apiVerify";
import { useAuthStore } from "../services/store/authStore";

const OTP_EMAIL_KEY = "otp_email";

export default function UserOtpVerificationPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useAuthStore();

  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const canResend = timer <= 0;

  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  useEffect(() => {
    const storedEmail = localStorage.getItem(OTP_EMAIL_KEY);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!canResend) {
      const id = window.setInterval(() => {
        setTimer((s) => {
          if (s <= 1) return 0;
          return s - 1;
        });
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [canResend, resendCount]);

  const otpComplete = useMemo(() => otp.length === 6, [otp]);

  const handleVerify = async () => {
    if (!email) {
      CustomToast("Email OTP introuvable. Veuillez vous inscrire à nouveau.", "error");
      return;
    }

    if (!otpComplete) {
      CustomToast("Veuillez saisir le code OTP à 6 chiffres.", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await verifyMutation.mutateAsync({ email, otp });
      console.log("OTP verify response:", response);

      signIn(response, false);

      CustomToast(t("compte_cree_avec_succes"), "success");

      localStorage.removeItem(OTP_EMAIL_KEY);
    
      window.location.href = "/annonces/new";
    } catch (e) {
      CustomToast("Code OTP incorrect ou expiré. Réessayez.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    if (!canResend) return;

    try {
      await resendMutation.mutateAsync({ email });
      setResendCount((c) => c + 1);
      setTimer(30);
      CustomToast("Nouveau code envoyé.", "success");
    } catch {
      CustomToast("Impossible de renvoyer le code OTP.", "error");
    }
  };

  return (
    <div className="pt-nav pb-10" style={{ paddingTop: "160px" }}>
      <div className="app-container">
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">
            {t("Vérification OTP", "Vérification OTP")}
          </h1>

          <p className="text-gray-600 mb-6">
            {email
              ? t("Saisissez le code envoyé à {{email}}", `Saisissez le code envoyé à ${email}`)
              : t("Saisissez le code OTP envoyé", "Saisissez le code OTP envoyé")}
          </p>

          <div className="mb-4">
            <OtpInput4 value={otp} onChange={setOtp} autoFocus disabled={isSubmitting} />
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={!otpComplete || isSubmitting || !email}
            className={`btn-primary w-full ${
              !otpComplete || isSubmitting || !email ? "opacity-70" : ""
            }`}
          >
            {isSubmitting ? t("Vérification...", "Vérification...") : t("Vérifier", "Vérifier")}
          </button>

          <div className="mt-4 text-center text-sm text-gray-600">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={!email || isSubmitting}
                className="text-primary-orange underline disabled:opacity-60"
              >
                {t("Renvoyer le code", "Renvoyer le code")}
              </button>
            ) : (
              <span>{t("Renvoyer dans {{s}}s", `Renvoyer dans ${timer}s`)}</span>
            )}
          </div>

          {verifyMutation.isError && (
            <div className="mt-3 text-red-600 text-sm">
              {t("Erreur de vérification.", "Erreur de vérification.")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}