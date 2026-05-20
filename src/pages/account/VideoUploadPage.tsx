import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

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

  const getVideoTitle = (): string => {
    return annonceData.title || t("video_page.default_title");
  };

  let ctaText = t("video_page.view_ad");
  let ctaHref: string | undefined = undefined;

  if (announcement.contact_type === "phone" && announcement.phone_number) {
    ctaText = t("video_page.contact");
    ctaHref = `tel:${announcement.phone_number}`;
  } else if (announcement.contact_type === "url" && announcement.url) {
    ctaText = t("video_page.view_ad");
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
    }
  };

  return (
    <div className={`relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer group ${isRTL ? "rtl" : ""}`}>
      <div className="absolute inset-0">
        {annonceData.video_url ? (
          <video
            src={annonceData.video_url}
            className="w-full h-full object-cover"
            poster={annonceData?.thumbnail_url}
            muted
            loop
            controls
            playsInline
            preload="metadata"
          >
            {t("video_page.video_not_supported")}
          </video>
        ) : (
          <img
            src={annonceData?.thumbnail_url}
            alt={t("video_page.short_video")}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      <button
        onClick={() => onAskDelete(announcement.id)}
        className={`absolute top-2 ${isRTL ? "left-2" : "right-2"} bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-50 opacity-0 group-hover:opacity-100`}
        aria-label={t("video_page.delete_video")}
      >
        <FaTrash size={12} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-sm mb-4 line-clamp-2">{getVideoTitle()}</p>

        {ctaHref ? (
          <a
            href={ctaHref}
            target={announcement.contact_type === "url" ? "_blank" : undefined}
            rel={announcement.contact_type === "url" ? "noopener noreferrer" : undefined}
            className="px-4 py-2 w-full inline-block text-center bg-orange-500 hover:bg-orange-600 relative text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md"
          >
            {ctaText}
            <div className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 transform -translate-y-1/2 transition-transform duration-200`}>
              <RiArrowRightLine className={`inline-block text-lg -mt-0.5 ${isRTL ? "rotate-180" : "-rotate-45"}`} />
            </div>
          </a>
        ) : (
          <button
            className="px-4 py-2 w-full bg-orange-500 hover:bg-orange-600 relative text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md"
            disabled
          >
            {ctaText}
            <div className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 transform -translate-y-1/2 transition-transform duration-200`}>
              <RiArrowRightLine className={`inline-block text-lg -mt-0.5 ${isRTL ? "rotate-180" : "-rotate-45"}`} />
            </div>
          </button>
        )}
      </div>

      <div className={`absolute ${isRTL ? "left-3" : "right-3"} bottom-24 flex flex-col items-center space-y-4`}>
        <div className="flex flex-col items-center">
          <button
            onClick={handleShare}
            className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
            aria-label={t("video_page.share_video")}
          >
            <RiShareLine className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoUploadPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchParams] = useSearchParams();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [videoAnnouncements, setVideoAnnouncements] = useState<VideoAnnouncement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { uploadSingleFile } = useFirebaseUpload(STORAGE_FOLDERS.ANNONCE_VIDEOS);

  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

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
        CustomToast(t("video_page.invalid_video"), "error");
        e.target.value = "";
        setValue("video", undefined);
        return;
      }

      const maxSizeInBytes = 100 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        CustomToast(t("video_page.video_too_large"), "error");
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

      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetAspectRatio = 9 / 16;
        const tolerance = 0.1;

        if (Math.abs(aspectRatio - targetAspectRatio) > tolerance) {
          CustomToast(t("video_page.invalid_thumbnail_ratio"), "error");
          e.target.value = "";
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
      CustomToast(t("video_page.delete_success"), "success");
    } catch (error) {
      console.error("Error deleting video announcement:", error);
      CustomToast(t("video_page.delete_error"), "error");
    } finally {
      setPendingDeleteId(null);
    }
  };

  const onSubmit = async (data: VideoFormValues) => {
    if (!data.video) {
      CustomToast(t("video_page.select_video"), "error");
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadStatus("uploading");
      setUploadPercent(0);

      let raf: number | null = null;
      let stopped = false;
      const start = () => {
        const tick = () => {
          if (stopped) return;
          setUploadPercent((p) => {
            const next = Math.min(95, Math.max(p + (p < 30 ? 4 : p < 70 ? 3 : 2), p + 1));
            return next;
          });
          raf = window.setTimeout(tick, 180);
        };
        tick();
      };
      start();

      try {
        const videoResult = await uploadSingleFile(data.video, STORAGE_FOLDERS.ANNONCE_VIDEOS);

        stopped = true;
        if (raf) window.clearTimeout(raf);

        setUploadPercent(100);
        setUploadStatus("success");

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("video_url", videoResult.url);

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

        await saveVideoAnnounce(formData);

        reset();
        setShowForm(false);
        setUploadPercent(0);
        setUploadStatus("idle");

        CustomToast(t("video_page.publish_success"), "success");
        await loadVideoAnnouncements();
      } catch (e) {
        stopped = true;
        if (raf) window.clearTimeout(raf);
        throw e;
      }

    } catch (error) {
      console.error("Error submitting video announcement:", error);

      setUploadStatus("error");

      let message = t("video_page.publish_error");

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: any; status?: number; statusText?: string } };
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
    <div className={`container mx-auto py-8 px-4 ${isRTL ? "rtl" : ""}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("video_page.title")}</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-primary-orange hover:bg-primary-orange-dark text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showForm ? (
            t("video_page.cancel")
          ) : (
            <>
              <AiOutlinePlus className="mr-2" />
              {t("video_page.add_video")}
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t("video_page.publish_video_ad")}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <div className="flex items-center gap-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("video_page.title_label")}
                </label>
                <span className="text-red-500">*</span>
              </div>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("title", { required: true })}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{t("video_page.title_required")}</p>}
            </div>

            <div className="mb-4">
              <div className="w-full flex items-center gap-1">
                <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                  {t("video_page.video_label")}
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
                  {t("video_page.video_selected")}: {videoFile.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                {t("video_page.thumbnail_label")}
                <span className="text-gray-500 text-xs"> ({t("video_page.thumbnail_ratio")})</span>
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
                  {t("video_page.thumbnail_selected")}: {videoMiniature.name}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">{t("video_page.thumbnail_ratio_hint")}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("video_page.contact_type_label")}
                </label>
                <span className="text-red-500">*</span>
              </div>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input type="radio" value="phone" className="form-radio" {...register("contactType", { required: true })} />
                  <span className="ml-2">{t("video_page.phone_number")}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="url" className="form-radio" {...register("contactType", { required: true })} />
                  <span className="ml-2">{t("video_page.ad_url")}</span>
                </label>
              </div>
              {errors.contactType && <p className="mt-1 text-sm text-red-600">{t("video_page.contact_type_required")}</p>}
            </div>

            {contactType === "phone" && (
              <div className="mb-4">
                <div className="flex gap-1 items-center w-full">
                  <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-1">
                    {t("video_page.phone_number_label")}
                  </label>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <span className="px-3 py-2 bg-gray-100 rounded-e-md">+212</span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="w-full px-3 py-2 outline-none"
                    placeholder="6********"
                    maxLength={9}
                    {...register("phoneNumber", { required: contactType === "phone" })}
                  />
                </div>
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{t("video_page.phone_required")}</p>}
              </div>
            )}

            {contactType === "url" && (
              <div className="mb-4">
                <div className="flex gap-1 items-center">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    {t("video_page.ad_url_label")}
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
                {errors.url && <p className="mt-1 text-sm text-red-600">{t("video_page.url_required")}</p>}
              </div>
            )}

            {(uploadStatus === "uploading" || uploadStatus === "success" || uploadStatus === "error") && (
              <div className="mb-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary-orange">
                    {uploadStatus === "uploading"
                      ? t("video_page.uploading")
                      : uploadStatus === "success"
                      ? t("video_page.upload_complete")
                      : t("video_page.upload_failed")}
                  </p>
                  <p className="text-xs text-gray-600 font-medium tabular-nums">{uploadPercent}%</p>
                </div>
                <div className="mt-2 h-2.5 w-full bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-orange rounded-full transition-all duration-150" style={{ width: `${uploadPercent}%` }} />
                  {uploadStatus === "uploading" && (
                    <div className="relative -mt-[2px]">
                      <div className="absolute top-0 left-0 h-[6px] w-[40%] bg-white/30 rounded-full animate-[shine_1.2s_ease-in-out_infinite]" />
                    </div>
                  )}
                </div>
                <style>{`@keyframes shine { 0%{ transform: translateX(-60%);} 60%{ transform: translateX(160%);} 100%{ transform: translateX(160%);} }`}</style>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || uploadStatus === "uploading"}
                className={cn(
                  "w-full py-2 px-4 bg-primary-orange hover:bg-primary-orange-dark text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                  (isSubmitting || uploadStatus === "uploading") && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting || uploadStatus === "uploading" ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    {t("video_page.publishing")}
                  </span>
                ) : (
                  t("video_page.publish_button")
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">{t("video_page.my_video_ads")}</h2>

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 aspect-[9/16] rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && videoAnnouncements.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {videoAnnouncements.map((announcement) => (
              <VideoCard key={announcement.id} announcement={announcement} onAskDelete={setPendingDeleteId} />
            ))}
          </div>
        )}

        {!isLoading && videoAnnouncements.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">{t("video_page.no_videos")}</p>
          </div>
        )}
      </div>

      {pendingDeleteId !== null && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-200" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ConfirmDeleteModal
              onConfirm={() => handleDeleteVideo(pendingDeleteId)}
              onCancel={() => setPendingDeleteId(null)}
              message={t("video_page.delete_confirm")}
              cancelLabel={t("video_page.cancel")}
              deleteLabel={t("video_page.delete")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoUploadPage;