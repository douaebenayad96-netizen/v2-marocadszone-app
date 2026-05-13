import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { SelectType } from "../services/types/select";
import { useAuthStore } from "../services/store/authStore";
import { Category, Profession } from "../services/types/category";
import { usePostPrestation } from "../services/api/fetchService";
import CustomToast from "../components/common/CustomToast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NoUserStep from "../components/annonce/NoUserStep";
import InfoFormStep from "../components/annonce/InfoFormStep";
import PhotosSelectStep from "../components/annonce/PhotoUpdate";
import ContactStep from "../components/contact/ContactStep";
import { cn } from "../utils/helpers";
import { useFirebaseUpload } from "../hooks/useFirebaseUpload";
import { STORAGE_FOLDERS } from "../services/firebase/storageService";
import TypeAnnonceStep from "../components/annonce/TypeAnnonceStep";

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
  const [step, setStep] = useState<ProgressSteps>(0);
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
    if (step === 4 && form.getValues("email") && form.getValues("phone")) {
      if (isLoading) return;

      if (!user || (!user.id && !user.email)) {
        CustomToast(
          t(
            "Vous devez être connecté pour publier une annonce",
            "You must be logged in to publish an annonce"
          ),
          "error"
        );
        navigate("/login"); // Redirect to login page
        return;
      }

      if (!token) {
        CustomToast(
          t(
            "Session expirée. Veuillez vous reconnecter.",
            "Session expired. Please login again."
          ),
          "error"
        );

        navigate("/login");

        return;
      }

      // Check if token looks like a Firebase token (should not be used for Laravel API)
      if (token.startsWith("eyJ") && token.split(".").length === 3) {
        CustomToast(
          t(
            "Votre session doit être mise à jour. Reconnexion automatique...",
            "Your session needs to be updated. Automatic reconnection..."
          ),
          "info"
        );

        // Clear the invalid token and redirect to login
        const { logout } = useAuthStore.getState();
        logout();

        // Small delay to show the message, then redirect
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }

      const formValues = form.getValues();

      const formData = new FormData();

      const requiredFields = {
        title: formValues.title,
        description: formValues.description,
        email: formValues.email,
        phone: `+${formValues.phone}`,
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
          t(
            `Champs requis manquants: ${missingFields.join(", ")}`,
            `Missing required fields: ${missingFields.join(", ")}`
          ),
          "error"
        );

        return;
      }

      // Required fields for /announces endpoint
      formData.append("title", formValues.title || "");
      formData.append("description", formValues.description || "");
      formData.append("email", formValues.email || "");
      formData.append("phone_number", `+${formValues.phone}` || "");

      // Category and subcategory IDs (both required)
      if (formValues.category?.value) {
        formData.append("category_id", formValues.category.value);
      }
      if (formValues.subCategory?.value) {
        formData.append("subcategory_id", formValues.subCategory.value);
      }

      // Location data
      if (formValues.country?.value) {
        formData.append("country_id", formValues.country.value);
      }
      if (formValues.city?.value) {
        formData.append("city_id", formValues.city.value);
      }

      if (formValues.announcementType) {
        formData.append("announce_type", formValues.announcementType);
      }

      // Backend: item_condition n'existe que pour les annonces de type sale (new/used/good_condition)
      // Pour rental et service, on ne doit PAS envoyer item_condition.
      if (formValues.announcementType === "sale" && formValues.condition) {
        formData.append("item_condition", formValues.condition);
      }


      // Price
      if (formValues.price) {
        formData.append("price", formValues.price);
      }

      // Upload files to Firebase Storage
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

      try {
        await savePost(formData);
        CustomToast(
          t("annonce_creee_avec_succes", "Annonce créée avec succès!"),
          "success"
        );

        navigate("/user-account/annonces");
      } catch (error) {
        console.error("🚀 [StepsRegister] Post job error:", error);

        // Extract error message first
        let errorMessage = t("erreur_lors_de_la_creation_de_la_demande");

        // Check for specific authentication errors
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as {
            response?: {
              status?: number;
              data?: { message?: string; error?: string };
            };
          };

          if (axiosError.response?.status === 401) {
            CustomToast(
              t(
                "Session expirée. Veuillez vous reconnecter.",
                "Session expired. Please login again."
              ),
              "error"
            );
            navigate("/login");
            return;
          }

          // Extract error message from API response
          errorMessage =
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            t("erreur_lors_de_la_creation_de_la_demande");
        }

        // Check if the error is about reaching the annonce limit
        const limitErrorMessage =
          "Error icon Vous avez atteint la limite de 3 annonces. Veuillez créer une entreprise pour publier plus d'annonces.";

        if (
          errorMessage.includes("Vous avez atteint la limite de 3 annonces") ||
          errorMessage.includes("limite de 3 annonces") ||
          errorMessage === limitErrorMessage
        ) {
          // Show info toast with redirect message
          CustomToast(
            t(
              "You have reached the limit of 3 announcements. Redirecting to company creation...",
              "Vous avez atteint la limite de 3 annonces. Redirection vers la création d'entreprise..."
            ),
            "info"
          );

          // Redirect to company creation page after 3 seconds
          setTimeout(() => {
            navigate("/user-account/company");
          }, 3000);
        } else {
          // Show regular error toast for other errors
          CustomToast(errorMessage, "error");
        }
      }
    }
  };

  const handleStepValidation = (newStep: ProgressSteps) => {
    // handle back
    if (newStep < step) {
      setStep(newStep);
      window.scrollTo(0, 0);
      return;
    }

    // In handleStepValidation function:
    if (step === 0) {
      const formValues = form.getValues();

      if (!formValues.annonceType) {
        // Changed from announcementType
        return;
      }

      if (formValues.annonceType == "video") {
        navigate("/user-account/annonces-video?add=true");
        return;
      }

      // If user selected "entreprise", redirect to company page
      if (formValues.annonceType == "entreprise") {
        navigate('/user-account/company');
        return;
      }


      // Trigger validation for all required fields in step 0
      const validationResult = form.trigger(["annonceType"]); // Changed from announcementType

      validationResult.then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }

    if (step === 1) {
      // Trigger validation for all required fields in step 0
      const validationResult = form.trigger([
        "category",
        "subCategory",
        "country",
        "city",
      ]);

      // Wait for validation to complete before checking isValid
      validationResult.then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }

    if (step === 2) {
      const formValues = form.getValues();

      // Check if announcement type and condition are properly set
      if (!formValues.announcementType) {
        console.error("🚀 [StepsRegister] Announcement type is missing!");
      }
      if (!formValues.condition) {
        console.error("🚀 [StepsRegister] Condition is missing!");
      }
      if (!formValues.price) {
        console.error("🚀 [StepsRegister] Price is missing!");
      }

      const validationResult = form.trigger([
        "title",
        "description",
        "announcementType",
        "condition",
        "price",
      ]);
      validationResult.then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }

    if (step === 3) {
      const validationResult = form.trigger(["photos", "video"]);
      validationResult.then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }

    if (step === 4) {
      const validationResult = form.trigger(["email", "phone"]);
      validationResult.then((isValid) => {
        if (isValid) {
          setStep(newStep);
          window.scrollTo(0, 0);
        }
      });
    }
  };

  return (
    <div className="min-h-screen pt-nav pb-24">
      <h1 className="sr-only">Publier une annonce gratuite au Maroc</h1>
      {/* steps content */}
      <div className="container-post-page">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => (document.body.style.overflow = "auto")}
        >
          {step === 0 && <TypeAnnonceStep form={form} key="typeAnnonceStep" />}

          {step === 1 && <NoUserStep key="noUserStep" form={form} />}

          {step === 2 && <InfoFormStep key="infoForm" form={form} />}

          {step === 3 && <PhotosSelectStep key="photosSelect" form={form} />}

          {step === 4 && <ContactStep key="emailPhoneStep" form={form} />}
        </AnimatePresence>
      </div>

      {/* steps next & back - fixed at bottom */}
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
              {t("previous")}
            </button>
            <button
              onClick={() => {
                handleSubmit();
                if (step < LAST_STEP) {
                  handleStepValidation((step + 1) as ProgressSteps);
                }
              }}
              disabled={isLoading || isUploading}
              className={cn(
                "px-4 py-3 btn-primary text-white rounded-md",
                (isLoading || isUploading) && "notAllowed"
              )}
            >
              {isUploading
                ? t("Uploading...", "Téléchargement...")
                : step === LAST_STEP
                ? t("publish")
                : t("next")}
              {(isLoading || isUploading) && (
                <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsRegister;