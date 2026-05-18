import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { CloseEye } from "../../assets/icons/CloseEye";
import { Eye } from "../../assets/icons/IconEye";
import { resetPassword } from "../../services/api/fetchAuth";
import { PasswordReset } from "../../services/types/resetPassword";
import { getPasswordResetErrorMessage } from "../../utils/apiMessages";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const schema = z
    .object({
      password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Les mots de passe ne correspondent pas",
      path: ["password_confirmation"],
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
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: ResetPasswordMutate } = useMutation({
    mutationFn: ({
      password,
      password_confirmation,
      email,
      token,
    }: PasswordReset) =>
      resetPassword({ password, password_confirmation, email, token }),

    onSuccess: () => {
      toast.success("Le mot de passe a été changé avec succès.");
      reset();
      navigate("/");
    },
    onError: (error) => {
      toast.error(getPasswordResetErrorMessage(error));
    },
  });

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const { password, password_confirmation } = data;
    ResetPasswordMutate({ password, password_confirmation, email, token });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Form Section */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Réinitialiser le mot de passe
              </h1>
              <p className="text-gray-600 text-sm">
                Entrez votre nouveau mot de passe
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="password"
                >
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                      errors.password
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-200 focus:border-[#F36F24] bg-gray-50"
                    }`}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={watch("password")}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <CloseEye className="w-6 h-6 text-gray-500" />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-semibold text-gray-700"
                  htmlFor="password_confirmation"
                >
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                      errors.password_confirmation
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-200 focus:border-[#F36F24] bg-gray-50"
                    }`}
                    type={showConfirmPassword ? "text" : "password"}
                    id="password_confirmation"
                    value={watch("password_confirmation")}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...register("password_confirmation")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <CloseEye className="w-6 h-6 text-gray-500" />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>⚠</span> {errors.password_confirmation.message}
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
                  "Réinitialiser le mot de passe"
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

export default ResetPassword;
