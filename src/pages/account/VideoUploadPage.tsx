import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { RiArrowRightLine, RiShareLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import CustomToast from "../../components/common/CustomToast";
import { useFirebaseUpload } from "../../hooks/useFirebaseUpload";
import {
  fetchVideoAnnounces,
  useDeleteVideoAnnounce,
  usePostVideoAnnounce,
} from "../../services/api/fetchVideoAnnounce";
import { STORAGE_FOLDERS } from "../../services/firebase/storageService";
import { Annonce } from "../../services/types/annonce";
import { cn } from "../../utils/helpers";

type VideoFormValues = {
  title: string;
  thumbnail: File | null;
  video: File | undefined;
  contactType: "phone" | "url" | "";
  phoneNumber: string;
  url: string;
};

type VideoAnnouncement = {
  id: number;
  title: string;
  user_id: number;
  video_url: string;
  contact_type: "phone" | "url";
  phone_number?: string;
  url?: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  thumbnail_url?: string;
};

interface VideoCardProps {
  announcement: VideoAnnouncement;
  onAskDelete: (id: number) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ announcement, onAskDelete }) => {
  // Convert VideoAnnouncement to Annonce format for compatibility
  const annonceData: Annonce = {
    id: announcement.id,
    title: announcement.title,
    slug: `video-${announcement.id}`,
    description: "",
    email: "",
    phone_number: announcement.phone_number || "",
    formatted_phone_number: announcement.phone_number || "",
    location: "",
    status: "active",
    status_label: "Active",
    created_at: announcement.created_at,
    updated_at: announcement.updated_at,
    user: {
      id: announcement.user.id,
      first_name: announcement.user.first_name,
      last_name: announcement.user.last_name,
      email: "",
    },
    city: {
      id: 1,
      label: "",
      country_id: 1,
      media: [],
    },
    country: {
      id: 1,
      label: "",
    },
    subcategory: {
      id: 1,
      label: "",
      category: {
        id: 1,
        label: "",
        picture: "",
        artisan_specialite_count: 0,
        prestations_count: 0,
        media: [],
        sub_categories: [],
        percentage: 0,
        created_at: "",
        updated_at: "",
        prestataires_count: 0,
      },
    },
    images: [],
    video: null,
    video_url: announcement.video_url,
    thumbnail_url: announcement.thumbnail_url,
  };

  // const getVideoThumbnail = (): string => {
  //   if (
  //     annonceData.image_urls &&
  //     Array.isArray(annonceData.image_urls) &&
  //     annonceData.image_urls.length > 0
  //   ) {
  //     return annonceData.image_urls[0];
  //   }

  //   if (annonceData.images && annonceData.images.length > 0) {
  //     return (
  //       annonceData.images[0]?.original_url ||
  //       annonceData.images[0]?.url ||
  //       annonceData.images[0]?.preview_url
  //     );
  //   }

  //   return annonceData?.thumbnail_url;
  // };

  const getVideoTitle = (): string => {
    return (
      annonceData.title || "Regardez cette vidéo incroyable ! 🔥 #tendance"
    );
  };

  // Determine CTA button properties
  let ctaText = "Voir l'annonce";
  let ctaHref: string | undefined = undefined;

  if (announcement.contact_type === "phone" && announcement.phone_number) {
    ctaText = "Contacter";
    ctaHref = `tel:${announcement.phone_number}`;
  } else if (announcement.contact_type === "url" && announcement.url) {
    ctaText = "Voir l'annonce";
    ctaHref = announcement.url;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getVideoTitle(),
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.warn("Share not supported");
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
      {/* Video / Thumbnail */}
      <div className="absolute inset-0">
        {annonceData.video_url ? (
          <video
            src={annonceData.video_url}
            className="w-full h-full object-cover"
            poster={annonceData?.thumbnail_url}
            muted
            loop
            controls
            // autoPlay
            playsInline
            preload="metadata"
          >
            Désolé, votre navigateur ne supporte pas les vidéos intégrées.
          </video>
        ) : (
          <img
            src={annonceData?.thumbnail_url}
            alt="Vidéo courte"
            className="w-full h-full object-cover"
          />
        )}
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onAskDelete(announcement.id)}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-50 opacity-0 group-hover:opacity-100"
        aria-label="Supprimer la vidéo"
      >
        <FaTrash size={12} />
      </button>

      {/* Video Information */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-sm mb-4 line-clamp-2">{getVideoTitle()}</p>

        {/* CTA Button */}
        {ctaHref ? (
          <a
            href={ctaHref}
            target={announcement.contact_type === "url" ? "_blank" : undefined}
            rel={
              announcement.contact_type === "url"
                ? "noopener noreferrer"
                : undefined
            }
            className="px-4 py-2 w-full inline-block text-center bg-orange-500 hover:bg-orange-600 relative text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md"
          >
            {ctaText}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200">
              <RiArrowRightLine className="inline-block text-lg -mt-0.5 -rotate-45" />
            </div>
          </a>
        ) : (
          <button
            className="px-4 py-2 w-full bg-orange-500 hover:bg-orange-600 relative text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md"
            disabled
          >
            {ctaText}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200">
              <RiArrowRightLine className="inline-block text-lg -mt-0.5 -rotate-45" />
            </div>
          </button>
        )}
      </div>

      {/* Interaction Buttons (right side) */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center">
          <button
            onClick={handleShare}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            aria-label="Partager la vidéo"
          >
            <RiShareLine className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoUploadPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [videoAnnouncements, setVideoAnnouncements] = useState<
    VideoAnnouncement[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const { uploadSingleFile, isUploading } = useFirebaseUpload(
    STORAGE_FOLDERS.ANNONCE_VIDEOS
  );
  const { mutateAsync: saveVideoAnnounce } = usePostVideoAnnounce();
  const { mutateAsync: deleteVideoAnnounce } = useDeleteVideoAnnounce();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<VideoFormValues>({
    defaultValues: {
      title: "",
      thumbnail: null,
      video: undefined,
      contactType: "",
      phoneNumber: "",
      url: "",
    },
  });

  const contactType = watch("contactType");
  const videoFile = watch("video");
  const videoMiniature = watch("thumbnail");

  useEffect(() => {
    const addParam = searchParams.get("add");
    if (addParam) {
      setShowForm(true);
    }
  }, [searchParams]);

  useEffect(() => {
    loadVideoAnnouncements();
  }, []);

  const loadVideoAnnouncements = async () => {
    try {
      setIsLoading(true);
      const response = await fetchVideoAnnounces(1);

      if (response && response.data) {
        if (response.data.data && Array.isArray(response.data.data)) {
          setVideoAnnouncements(response.data.data);
        } else if (Array.isArray(response.data)) {
          setVideoAnnouncements(response.data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching video announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!file.type.startsWith("video/")) {
        CustomToast("Veuillez sélectionner un fichier vidéo valide", "error");
        e.target.value = "";
        setValue("video", undefined);
        return;
      }

      const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
      if (file.size > maxSizeInBytes) {
        CustomToast(
          "Le fichier vidéo est trop volumineux (max 100MB)",
          "error"
        );
        e.target.value = "";
        setValue("video", undefined);
        return;
      }

      setValue("video", file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validate image aspect ratio (9:16 for vertical video)
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetAspectRatio = 9 / 16;
        const tolerance = 0.1; // 10% tolerance

        if (Math.abs(aspectRatio - targetAspectRatio) > tolerance) {
          CustomToast(
            "La miniature doit avoir un ratio de 9:16 (vertical, comme la vidéo)",
            "error"
          );
          e.target.value = ""; // Clear the input
          return;
        }

        setValue("thumbnail", file);
      };

      img.src = URL.createObjectURL(file);
    }
  };

  const handleDeleteVideo = async (id: number) => {
    try {
      await deleteVideoAnnounce(id);
      setVideoAnnouncements((prev) => prev.filter((a) => a.id !== id));
      CustomToast("Vidéo supprimée avec succès", "success");
    } catch (error) {
      console.error("Error deleting video announcement:", error);
      CustomToast("Erreur lors de la suppression", "error");
    } finally {
      setPendingDeleteId(null);
    }
  };

  const onSubmit = async (data: VideoFormValues) => {
    if (!data.video) {
      CustomToast("Veuillez sélectionner une vidéo", "error");
      return;
    }

    try {
      setIsSubmitting(true);

      // Upload video to Firebase
      const videoResult = await uploadSingleFile(
        data.video,
        STORAGE_FOLDERS.ANNONCE_VIDEOS
      );

      // Prepare form data
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("video_url", videoResult.url);

      // Add thumbnail directly to FormData (not uploading to Firebase)
      if (data.thumbnail) {
        formData.append("thumbnail", data.thumbnail);
      }

      if (data.contactType === "phone") {
        formData.append("contact_type", "phone");
        formData.append("phone_number", data.phoneNumber);
      } else if (data.contactType === "url") {
        formData.append("contact_type", "url");
        formData.append("url", data.url);
      }

      // Submit to API
      await saveVideoAnnounce(formData);

      // Reset form and hide it
      reset();
      setShowForm(false);

      CustomToast("Annonce vidéo publiée avec succès", "success");

      // Refresh the video announcements list
      await loadVideoAnnouncements();
    } catch (error) {
      console.error("Error submitting video announcement:", error);

      let message = "Une erreur est survenue lors de la publication";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: any; status?: number; statusText?: string };
        };
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        } else if (axiosError.response?.statusText) {
          message = axiosError.response.statusText;
        }
      }

      CustomToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Annonces Vidéo</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-primary-orange hover:bg-primary-orange-dark text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showForm ? (
            "Annuler"
          ) : (
            <>
              <AiOutlinePlus className="mr-2" />
              Ajouter une vidéo
            </>
          )}
        </button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Publier une annonce vidéo
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-md p-6"
          >
            {/* Title Field */}
            <div className="mb-4">
              <div className="flex items-center gap-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Titre
                </label>
                <span className="text-red-500">*</span>
              </div>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">Le titre est requis</p>
              )}
            </div>

            {/* Video Field */}
            <div className="mb-4">
              <div className="w-full flex items-center gap-1">
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Vidéo
                </label>
                <span className="text-red-500">*</span>
              </div>
              <input
                id="video"
                type="file"
                accept="video/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleVideoChange}
                required
              />
              {videoFile && (
                <p className="mt-1 text-sm text-green-600">
                  Vidéo sélectionnée: {videoFile.name}
                </p>
              )}
            </div>

            {/* Thumbnail Field */}
            <div className="mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Video miniature{" "}
                <span className="text-gray-500 text-xs">
                  (ratio 9:16 recommandé)
                </span>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleThumbnailChange}
              />
              {videoMiniature && (
                <p className="mt-1 text-sm text-green-600">
                  Miniature sélectionnée: {videoMiniature.name}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Format vertical (9:16) pour correspondre au ratio de la vidéo
              </p>
            </div>

            {/* Contact Type Field */}
            <div className="mb-4">
              <div className="flex items-center gap-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de contact
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="phone"
                    className="form-radio"
                    {...register("contactType", { required: true })}
                  />
                  <span className="ml-2">Numéro de téléphone</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="url"
                    className="form-radio"
                    {...register("contactType", { required: true })}
                  />
                  <span className="ml-2">URL de l'annonce</span>
                </label>
              </div>
              {errors.contactType && (
                <p className="mt-1 text-sm text-red-600">
                  Veuillez sélectionner un type de contact
                </p>
              )}
            </div>

            {/* Phone Number Field (Conditional) */}
            {contactType === "phone" && (
              <div className="mb-4">
                <div className="flex gap-1 items-center w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Numéro de téléphone
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <span className="px-3 py-2 bg-gray-100 rounded-e-md">
                    +212
                  </span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="w-full px-3 py-2 outline-none"
                    placeholder="6********"
                    maxLength={9}
                    {...register("phoneNumber", {
                      required: contactType === "phone",
                    })}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    Le numéro de téléphone est requis
                  </p>
                )}
              </div>
            )}

            {/* URL Field (Conditional) */}
            {contactType === "url" && (
              <div className="mb-4">
                <div className="flex gap-1 items-center">
                  <label
                    htmlFor="url"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    URL de l'annonce
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  id="url"
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/annonce"
                  {...register("url", { required: contactType === "url" })}
                />
                {errors.url && (
                  <p className="mt-1 text-sm text-red-600">L'URL est requise</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className={cn(
                  "w-full py-2 px-4 bg-primary-orange hover:bg-primary-orange-dark text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  (isSubmitting || isUploading) &&
                    "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting || isUploading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Publication en cours...
                  </span>
                ) : (
                  "Publier l'annonce vidéo"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Video Announcements Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Mes annonces vidéo</h2>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 aspect-[9/16] rounded-xl"
              />
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {!isLoading && videoAnnouncements.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {videoAnnouncements.map((announcement) => (
              <VideoCard
                key={announcement.id}
                announcement={announcement}
                onAskDelete={setPendingDeleteId}
              />
            ))}
          </div>
        )}

        {/* No Videos Message */}
        {!isLoading && videoAnnouncements.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore publié d'annonces vidéo
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {pendingDeleteId !== null && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-200" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ConfirmDeleteModal
              onConfirm={() => handleDeleteVideo(pendingDeleteId)}
              onCancel={() => setPendingDeleteId(null)}
              message="Êtes-vous sûr de vouloir supprimer cette vidéo ?"
              cancelLabel="Annuler"
              deleteLabel="Supprimer"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoUploadPage;
