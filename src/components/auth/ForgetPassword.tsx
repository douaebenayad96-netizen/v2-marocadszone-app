"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { sendReset } from "../../services/api/fetchAuth";
import { getPasswordResetErrorMessage } from "../../utils/apiMessages";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = z.object({
    email: z.email("email est requis"),
  });
  type SchemaType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isLoading },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const { mutate: sendResetMutate } = useMutation({
    mutationFn: (email: string) => sendReset(email),
    onSuccess: () => {
      toast.success(
        "Un lien de réinitialisation a été envoyé à votre adresse e-mail."
      );
      reset();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(getPasswordResetErrorMessage(error));
    },
  });

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { email } = data;
    sendResetMutate(email);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Form Section */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mot de passe oublié?
              </h1>
              <p className="text-gray-600 text-sm">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-[#F36F24] bg-gray-50"
                  }`}
                  type="email"
                  id="email"
                  value={watch("email")}
                  placeholder={"votre@email.com"}
                  autoComplete="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message:
                        t("form-err.email_obligatoire") || "Email est requis",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("form-err.email_invalide") || "Email invalide",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#F36F24] hover:bg-[#E55A0A] active:scale-95"
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Envoi en cours...
                  </span>
                ) : (
                  "Envoyer le lien"
                )}
              </button>

              <div className="text-center">
                <Link
                  to={"/"}
                  className="text-sm text-[#F36F24] hover:text-[#E55A0A] font-medium"
                >
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br p-8">
            <img
              src="/forgot-password.svg"
              alt="Password reset illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
