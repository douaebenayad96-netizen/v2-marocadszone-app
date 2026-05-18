import { PhoneNumberUtil } from "google-libphonenumber";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiLoaderAlt, BiMinus, BiPlus } from "react-icons/bi";
import PhoneInput from "react-phone-input-2";
import {
  useCreateCompany,
  useGetCompany,
  useUpdateCompany,
} from "../../services/api/fetchCompany";
import { useAuthStore } from "../../services/store/authStore";
import { Company } from "../../services/types/company";
import { getCompanyErrorMessage } from "../../utils/apiMessages";
import { getLastRouteInUrl } from "../../utils/helpers";
import CustomToast from "../common/CustomToast";
import ModalLayout from "../layouts/ModalLayout";
import PricingPopUp from "../pricing/PricingPopUp";

type FormValues = {
  companyName: string;
  companyLogo: FileList | null;
  description: string;
  address: string;
  phone: string;
  email: string;
  urls: string[];
};

const MAX_LOGO_SIZE = 5 * 1024 * 1024;
const VALID_LOGO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UserCompanyInformationForm = () => {
  const token = useAuthStore((state) => state.token);
  const [urlCount, setUrlCount] = useState(1);
  const [isNewCompany, setIsNewCompany] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      urls: ["", "", ""],
    },
  });

  // API hooks
  const { data: company, refetch } = useGetCompany(
    token as string,
    undefined,
    !!token
  );
  const { mutateAsync: createCompany, isLoading: isCreating } =
    useCreateCompany();
  const { mutateAsync: updateCompany, isLoading: isUpdating } =
    useUpdateCompany();
  const [showPricing, setShowPricing] = useState(false);

  const companyData = company as Company | undefined;

  const isLoading = isCreating || isUpdating;
  // const { data, refetch, isLoading: isLoadingData } = useGetCompanyInfo(token as string)

  useEffect(() => {
    if (token && companyData) {
      setIsNewCompany(false);
      const urls = companyData.url || [""];
      setUrlCount(urls.length || 1);

      reset({
        companyName: companyData.name || "",
        description: companyData.description || "",
        address: companyData.address || "",
        phone: companyData.phone_number || "",
        email: companyData.email || "",
        urls: [...urls, ...Array(3 - urls.length).fill("")],
        companyLogo: null,
      });
    }
  }, [companyData, reset, token]);

  const onSubmit = async (formData: FormValues) => {
    if (!token) {
      CustomToast("Your session expired. Sign in and try again.", "error");
      return;
    }

    const formDataToSend = new FormData();

    // Add logo file if provided
    if (formData.companyLogo?.[0]) {
      const logo = formData.companyLogo[0];

      if (!VALID_LOGO_TYPES.includes(logo.type)) {
        CustomToast(
          "Invalid image. Please use a JPG, PNG, or WebP file.",
          "error"
        );
        return;
      }

      if (logo.size > MAX_LOGO_SIZE) {
        CustomToast("Image is too large. Maximum size: 5MB.", "error");
        return;
      }

      formDataToSend.append("logo", logo);
    }

    // Add company details
    formDataToSend.append("name", formData.companyName);
    formDataToSend.append("description", formData.description);

    if (formData.address) {
      formDataToSend.append("address", formData.address);
    }

    if (formData.phone) {
      formDataToSend.append("phone_number", formData.phone);
    }

    if (formData.email) {
      formDataToSend.append("email", formData.email);
    }

    // Add URLs (filter out empty ones)
    const validUrls = formData.urls
      .slice(0, urlCount)
      .filter((url) => url.trim() !== "");

    for (const url of validUrls) {
      try {
        new URL(url);
      } catch {
        CustomToast("Invalid URL. Example: https://example.com", "error");
        return;
      }
    }

    validUrls.forEach((url) => {
      formDataToSend.append("url[]", url);
    });

    try {
      if (isNewCompany || !companyData) {
        console.log("🏢 Creating new company...");
        await createCompany({ companyData: formDataToSend, token });
        CustomToast("Company profile created successfully.", "success");
        setIsNewCompany(false);
        setShowPricing(true); // Show pricing modal after creating a new company
      } else {
        console.log("🏢 Updating existing company...");
        await updateCompany({ companyData: formDataToSend, token });
        CustomToast("Company profile updated successfully.", "success");
      }

      refetch(); // Refresh the data
    } catch (error) {
      console.error("🏢 Error:", error);

      const message = getCompanyErrorMessage(error);

      if (message.includes("company profile already exists")) {
        setIsNewCompany(false);
      }

      CustomToast(
        message,
        message.includes("already exists") ? "warning" : "error"
      );
    }
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...(watch("urls") || ["", "", ""])];
    newUrls[index] = value;
    setValue("urls", newUrls);
  };

  const addUrlField = () => {
    if (urlCount < 3) setUrlCount(urlCount + 1);
  };

  const removeUrlField = () => {
    if (urlCount > 1) {
      const newUrls = [...(watch("urls") || ["", "", ""])];
      newUrls[urlCount - 1] = "";
      setValue("urls", newUrls);
      setUrlCount(urlCount - 1);
    }
  };

  // if (isLoadingData) {
  //   return (
  //     <div className="flex justify-center items-center py-10">
  //       <BiLoaderAlt className="animate-spin text-primary-blue text-4xl" />
  //     </div>
  //   )
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 md:gap-4">
              <div>
                <label htmlFor="companyLogo" className="label">
                  Logo de l'entreprise
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="companyLogo"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register("companyLogo")}
                  />
                  <div className="h-[38px] flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:border-blue-400 transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <span className="text-gray-500 truncate mr-2">
                      {watch("companyLogo")?.[0]?.name ? (
                        <p className="text-xs text-gray-500">
                          Fichier sélectionné:{" "}
                          {watch("companyLogo")?.[0]?.name || companyData?.logo
                            ? getLastRouteInUrl(companyData?.logo || "")
                            : "Aucun fichier sélectionné"}
                        </p>
                      ) : companyData?.logo ? (
                        getLastRouteInUrl(companyData?.logo)
                      ) : (
                        "Aucun fichier sélectionné"
                      )}
                    </span>
                    <div className="flex-shrink-0 text-gray-400">
                      {watch("companyLogo")?.[0]?.name ? (
                        <BiMinus size={18} />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="label">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                className={`input ${errors.address ? "error" : ""}`}
                placeholder="Adresse de l'entreprise"
                {...register("address", { required: true })}
              />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <span className="text-red-500">*</span>
              </div>
              <textarea
                id="description"
                className={`input ${errors.description ? "error" : ""}`}
                placeholder="Description de l'entreprise"
                rows={5}
                {...register("description", { required: true })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex gap-1">
                <label htmlFor="companyName" className="label">
                  Nom de l'entreprise
                </label>
                <span className="text-sm text-red-500">*</span>
              </div>
              <input
                type="text"
                id="companyName"
                className={`input ${errors.companyName ? "error" : ""}`}
                placeholder="Entrez le nom de l'entreprise"
                {...register("companyName", { required: true })}
              />
            </div>

            <div>
              <div className="flex gap-1">
                <label htmlFor="phone" className="label">
                  Téléphone
                </label>
                <span className="text-sm text-red-500">*</span>
              </div>
              <div dir="ltr">
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: "Ce champ est requis",
                    minLength: {
                      value: 10,
                      message:
                        "Le numéro de téléphone doit comporter au moins 10 chiffres",
                    },
                    validate: (value) => {
                      const phoneUtil = PhoneNumberUtil.getInstance();
                      const isValidPhone = phoneUtil.isValidNumber(
                        phoneUtil.parse(`+${value}`)
                      );
                      if (!isValidPhone) {
                        return "Numéro de téléphone invalide";
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
                        errors.phone ? "!border-red-500" : ""
                      }`}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <div className="flex gap-1">
                <label htmlFor="email" className="label">
                  Email de l'entreprise
                </label>
                <span className="text-sm text-red-500">*</span>
              </div>

              <input
                type="email"
                id="email"
                className={`input ${errors.email ? "error" : ""}`}
                placeholder="contact@entreprise.com"
                {...register("email", {
                  required: "L'email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Format d'email invalide",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="label">URLs du site web (max 3)</label>
                <div className="flex gap-1">
                  {urlCount > 1 && (
                    <button
                      type="button"
                      onClick={removeUrlField}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <BiMinus size={18} />
                    </button>
                  )}
                  {urlCount < 3 && (
                    <button
                      type="button"
                      onClick={addUrlField}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <BiPlus size={18} />
                    </button>
                  )}
                </div>
              </div>

              {Array.from({ length: urlCount }).map((_, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="url"
                    className="input"
                    placeholder={`https://exemple.com/${index + 1}`}
                    value={watch("urls")?.[index] || ""}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`btn-primary mt-2 ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <BiLoaderAlt className="animate-spin text-white text-xl" />
                <span className="ml-2">
                  {isNewCompany ? "Création..." : "Mise à jour..."}
                </span>
              </div>
            ) : (
              <span>
                {isNewCompany
                  ? "Créer mon entreprise"
                  : "Mettre à jour mon entreprise"}
              </span>
            )}
          </button>
        </div>
      </form>
      <ModalLayout isOpen={showPricing} setIsOpen={() => {}}>
        <div className="p-4 lg:p-12 bg-white overflow-y-auto rounded-lg max-h-[95vh] sm:max-h-[90vh] mx-4">
          <PricingPopUp
            onClose={() => {
              setShowPricing(false);
            }}
          />
        </div>
      </ModalLayout>
    </>
  );
};

export default UserCompanyInformationForm;
