import { PhoneNumberUtil } from "google-libphonenumber";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiLoaderAlt, BiMinus, BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      CustomToast(t("company_form.session_expired"), "error");
      return;
    }

    const formDataToSend = new FormData();

    if (formData.companyLogo?.[0]) {
      const logo = formData.companyLogo[0];

      if (!VALID_LOGO_TYPES.includes(logo.type)) {
        CustomToast(t("company_form.invalid_image"), "error");
        return;
      }

      if (logo.size > MAX_LOGO_SIZE) {
        CustomToast(t("company_form.image_too_large"), "error");
        return;
      }

      formDataToSend.append("logo", logo);
    }

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

    const validUrls = formData.urls
      .slice(0, urlCount)
      .filter((url) => url.trim() !== "");

    for (const url of validUrls) {
      try {
        new URL(url);
      } catch {
        CustomToast(t("company_form.invalid_url"), "error");
        return;
      }
    }

    validUrls.forEach((url) => {
      formDataToSend.append("url[]", url);
    });

    try {
      if (isNewCompany || !companyData) {
        await createCompany({ companyData: formDataToSend, token });
        CustomToast(t("company_form.create_success"), "success");
        setIsNewCompany(false);
        setShowPricing(true);
      } else {
        await updateCompany({ companyData: formDataToSend, token });
        CustomToast(t("company_form.update_success"), "success");
      }

      refetch();
    } catch (error) {
      const message = getCompanyErrorMessage(error);

      if (message.includes("company profile already exists")) {
        setIsNewCompany(false);
      }

      CustomToast(
        message === "company profile already exists" 
          ? t("company_form.already_exists") 
          : message,
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 md:gap-4">
              <div>
                <label htmlFor="companyLogo" className="label">
                  {t("company_form.logo_label")}
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
                          {t("company_form.file_selected")}:{" "}
                          {watch("companyLogo")?.[0]?.name || companyData?.logo
                            ? getLastRouteInUrl(companyData?.logo || "")
                            : t("company_form.no_file_selected")}
                        </p>
                      ) : companyData?.logo ? (
                        getLastRouteInUrl(companyData?.logo)
                      ) : (
                        t("company_form.no_file_selected")
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
                {t("company_form.address_label")}
              </label>
              <input
                type="text"
                id="address"
                className={`input ${errors.address ? "error" : ""}`}
                placeholder={t("company_form.address_placeholder")}
                {...register("address", { required: t("company_form.field_required") })}
              />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <label htmlFor="description" className="label">
                  {t("company_form.description_label")}
                </label>
                <span className="text-red-500">*</span>
              </div>
              <textarea
                id="description"
                className={`input ${errors.description ? "error" : ""}`}
                placeholder={t("company_form.description_placeholder")}
                rows={5}
                {...register("description", { required: t("company_form.field_required") })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex gap-1">
                <label htmlFor="companyName" className="label">
                  {t("company_form.company_name_label")}
                </label>
                <span className="text-sm text-red-500">*</span>
              </div>
              <input
                type="text"
                id="companyName"
                className={`input ${errors.companyName ? "error" : ""}`}
                placeholder={t("company_form.company_name_placeholder")}
                {...register("companyName", { required: t("company_form.field_required") })}
              />
            </div>

            <div>
              <div className="flex gap-1">
                <label htmlFor="phone" className="label">
                  {t("company_form.phone_label")}
                </label>
                <span className="text-sm text-red-500">*</span>
              </div>
              <div dir="ltr">
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: t("company_form.phone_required"),
                    minLength: {
                      value: 10,
                      message: t("company_form.phone_min_length"),
                    },
                    validate: (value) => {
                      const phoneUtil = PhoneNumberUtil.getInstance();
                      const isValidPhone = phoneUtil.isValidNumber(
                        phoneUtil.parse(`+${value}`)
                      );
                      if (!isValidPhone) {
                        return t("company_form.phone_invalid");
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      country={"ma"}
                      placeholder={t("company_form.phone_placeholder")}
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
                  {t("company_form.email_label")}
                </label>
                <span className="text-sm text-red-500">*</span>
              </div>
              <input
                type="email"
                id="email"
                className={`input ${errors.email ? "error" : ""}`}
                placeholder={t("company_form.email_placeholder")}
                {...register("email", {
                  required: t("company_form.email_required"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("company_form.email_invalid"),
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
                <label className="label">
                  {t("company_form.website_urls_label")}
                </label>
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
                    placeholder={`${t("company_form.url_placeholder")}/${index + 1}`}
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
                  {isNewCompany ? t("company_form.creating") : t("company_form.updating")}
                </span>
              </div>
            ) : (
              <span>
                {isNewCompany
                  ? t("company_form.create_button")
                  : t("company_form.update_button")}
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