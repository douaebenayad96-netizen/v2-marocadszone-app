import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { SelectType } from "../services/types/select";
import { useAuthStore } from "../services/store/authStore";
import { Category, Profession } from "../services/types/category";
import { usePostPrestation } from "../services/api/fetchService";
import CustomToast from "../components/common/CustomToast";
import NoUserStep from "../components/annonce/NoUserStep";
import InfoFormStep from "../components/annonce/InfoFormStep";
import PhotosSelectStep from "../components/annonce/PhotoUpdate";
import ContactStep from "../components/contact/ContactStep";
import TypeAnnonceStep from "../components/annonce/TypeAnnonceStep";
import { cn } from "../utils/helpers";
import { useFirebaseUpload } from "../hooks/useFirebaseUpload";
import { STORAGE_FOLDERS } from "../services/firebase/storageService";

export type ProgressSteps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type PostJobPageState = {
  selectedCategory: Category;
  selectedMetier: Profession;
};

export type AddressType = {
  address: string;
  zip: string;
  city: SelectType;
};

export type FormValues = {
  annonceType: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  latitude: string;
  longitude: string;
  adresse: string;
  password: string;
  city: {
    value: string;
    label: string;
  };
  country: {
    value: string;
    label: string;
  };
  zio: string;
  category: {
    label: string;
    value: string;
  };
  subCategory: {
    label: string;
    value: string;
  };
  isStepValid: boolean;
  title: string;
  description: string;
  photos: File[];
  announcementType: string;
  condition: string;
  price: string;
  video: File | undefined;
};

export type category = {
  label: string;
  value: string;
};

export type metier = {
  label: string;
  value: string;
};

const LAST_STEP: ProgressSteps = 4;

const StepsRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [companyRequired, setCompanyRequired] = useState(false);

  const [step, setStep] = useState<ProgressSteps>(() => {
    const shouldSkip =
      new URLSearchParams(window.location.search).get("skipType") === "1";
    return shouldSkip ? 1 : 0;
  });

  const { mutateAsync: savePost, isLoading } = usePostPrestation();
  const form = useForm<FormValues>();

  const { uploadFiles, uploadSingleFile, isUploading } = useFirebaseUpload(
    STORAGE_FOLDERS.ANNONCE_IMAGES
  );

  useEffect(() => {
    form.setValue("email", user?.email || "");
    form.setValue("phone", user?.phone_number || "");
  }, [user, form]);

  const handleSubmit = async () => {
    if (step !== LAST_STEP) return;

    if (!form.getValues("email") || !form.getValues("phone")) return;

    if (isLoading || isUploading) return;

    if (!user || (!user.id && !user.email)) {
      CustomToast(t("steps_register.login_required"), "error");
      navigate("/login");
      return;
    }

    if (!token) {
      CustomToast(t("steps_register.session_expired"), "error");
      navigate("/login");
      return;
    }

    if (token.startsWith("eyJ") && token.split(".").length === 3) {
      CustomToast(t("steps_register.session_update_needed"), "info");

      const { logout } = useAuthStore.getState();
      logout();

      setTimeout(() => {
        navigate("/");
      }, 2000);

      return;
    }

    const formValues = form.getValues();

    const requiredFields = {
      title: formValues.title,
      description: formValues.description,
      email: formValues.email,
      phone: formValues.phone,
      category_id: formValues.category?.value,
      subcategory_id: formValues.subCategory?.value,
      country_id: formValues.country?.value,
      city_id: formValues.city?.value,
      announcementType: formValues.announcementType,
      condition: formValues.condition,
      price: formValues.price,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      CustomToast(
        t("steps_register.missing_fields", {
          fields: missingFields.join(", "),
        }),
        "error"
      );
      return;
    }

    const formData = new FormData();

    formData.append("title", formValues.title || "");
    formData.append("description", formValues.description || "");
    formData.append("email", formValues.email || "");
    formData.append("phone_number", `+${formValues.phone}` || "");

    if (formValues.category?.value) {
      formData.append("category_id", formValues.category.value);
    }

    if (formValues.subCategory?.value) {
      formData.append("subcategory_id", formValues.subCategory.value);
    }

    if (formValues.country?.value) {
      formData.append("country_id", formValues.country.value);
    }

    if (formValues.city?.value) {
      formData.append("city_id", formValues.city.value);
    }

    if (formValues.announcementType) {
      formData.append("announce_type", formValues.announcementType);
    }

    if (formValues.condition) {
      formData.append("item_condition", formValues.condition);
    }

    if (formValues.price) {
      formData.append("price", formValues.price);
    }

    try {
      if (formValues.photos && formValues.photos.length > 0) {
        const imageResults = await uploadFiles(formValues.photos);
        const imageUrls = imageResults.map((result) => result.url);

        imageUrls.forEach((url, index) => {
          formData.append(`image_urls[${index}]`, url);
        });
      }

      if (formValues.video) {
        const videoResult = await uploadSingleFile(
          formValues.video,
          STORAGE_FOLDERS.ANNONCE_VIDEOS
        );

        formData.append("video_url", videoResult.url);
      }

      await savePost(formData);

      CustomToast(t("steps_register.create_success"), "success");
      navigate("/user-account/annonces");
    } catch (error) {
      console.error("🚀 [StepsRegister] Post job error:", error);

      const response =
        error && typeof error === "object" && "response" in error
          ? (error as {
              response?: {
                status?: number;
                data?: {
                  message?: string;
                  error?: string;
                  error_code?: string;
                };
              };
            }).response
          : undefined;

      const errorData = response?.data;

      if (response?.status === 401) {
        CustomToast(t("steps_register.session_expired"), "error");
        navigate("/login");
        return;
      }

      if (errorData?.error_code === "COMPANY_REQUIRED") {
        setCompanyRequired(true);
        window.scrollTo(0, 0);
        return;
      }

      if (errorData?.error_code === "UPGRADE_REQUIRED") {
        CustomToast(t("steps_register.announce_limit_reached"), "info");

        setTimeout(() => {
          navigate("/tarification");
        }, 1500);

        return;
      }

      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        t("steps_register.create_error");

      if (
        errorMessage.includes("limite de 3 annonces") ||
        errorMessage.includes("limit of 3 announcements")
      ) {
        CustomToast(t("steps_register.announce_limit_reached"), "info");

        setTimeout(() => {
          navigate("/user-account/company");
        }, 3000);

        return;
      }

      CustomToast(errorMessage, "error");
    }
  };

  const handleStepValidation = (newStep: ProgressSteps) => {
    if (newStep < step) {
      setStep(newStep);
      window.scrollTo(0, 0);
      return;
    }

    if (step === 0) {
      const formValues = form.getValues();

      if (!formValues.annonceType) return;

      if (formValues.annonceType === "video") {
        navigate("/user-account/annonces-video?add=true");
        return;
      }

      if (formValues.annonceType === "entreprise") {
        navigate("/user-account/company");
        return;
      }

      form.trigger(["annonceType"]).then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }

    if (step === 1) {
      form
        .trigger(["category", "subCategory", "country", "city"])
        .then((isValid) => {
          if (isValid) {
            setStep(newStep);
            window.scrollTo(0, 0);
          }
        });
    }

    if (step === 2) {
      form
        .trigger([
          "title",
          "description",
          "announcementType",
          "condition",
          "price",
        ])
        .then((isValid) => {
          if (isValid) {
            setStep(newStep);
            window.scrollTo(0, 0);
          }
        });
    }

    if (step === 3) {
      form.trigger(["photos", "video"]).then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }

    if (step === 4) {
      form.trigger(["email", "phone"]).then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }
  };

  return (
    <div className="min-h-screen pt-nav pb-24">
      <h1 className="sr-only">{t("steps_register.page_title")}</h1>

      <div className="container-post-page">
        {companyRequired && (
          <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50 p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {t("steps_register.company_required_title")}
            </h3>

            <p className="text-slate-600 max-w-xl mx-auto mb-6">
              {t("steps_register.company_required_description")}
            </p>

            <button
              type="button"
              onClick={() => navigate("/user-account/company")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition"
            >
              {t("steps_register.create_company")}
            </button>
          </div>
        )}

        {!companyRequired && (
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              document.body.style.overflow = "auto";
            }}
          >
            {step === 0 && <TypeAnnonceStep form={form} key="typeAnnonceStep" />}
            {step === 1 && <NoUserStep key="noUserStep" form={form} />}
            {step === 2 && <InfoFormStep key="infoForm" form={form} />}
            {step === 3 && <PhotosSelectStep key="photosSelect" form={form} />}
            {step === 4 && <ContactStep key="emailPhoneStep" form={form} />}
          </AnimatePresence>
        )}
      </div>

      {!companyRequired && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-[10000]">
          <div className="container-post-page">
            <div className="flex justify-between font-semibold">
              <button
                onClick={() => {
                  if (step > 0) {
                    setStep((step - 1) as ProgressSteps);
                  }
                }}
                className={`px-4 py-3 border rounded-md ${
                  step === 0
                    ? "cursor-not-allowed text-gray-500 border-gray-200"
                    : "text-primary-blue-all-800 border-gray-400"
                }`}
              >
                {t("steps_register.previous")}
              </button>

              <button
                onClick={() => {
                  if (step < LAST_STEP) {
                    handleStepValidation((step + 1) as ProgressSteps);
                    return;
                  }

                  handleSubmit();
                }}
                disabled={isLoading || isUploading}
                className={cn(
                  "px-4 py-3 btn-primary text-white rounded-md",
                  (isLoading || isUploading) && "notAllowed"
                )}
              >
                {isUploading
                  ? t("steps_register.uploading")
                  : step === LAST_STEP
                  ? t("steps_register.publish")
                  : t("steps_register.next")}

                {(isLoading || isUploading) && (
                  <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepsRegister;