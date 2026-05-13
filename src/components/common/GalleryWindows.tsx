import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegImages } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SampleButton from "../ui/SampleButton";
// import PrestataireLikeButton from '../annonce/PrestataireLikeButton'
import NoImage from "../../assets/img/no-image.png";
import { Annonce } from "../../services/types/annonce";
import { Prestataire } from "../../services/types/prestataire";
import PrestataireShareBtn from "../annonce/PrestataireShareBtn";

type GalleryWindowsProps = {
  prestataire?: Prestataire;
  annonce?: Annonce;
};

const GalleryWindows = ({ prestataire, annonce }: GalleryWindowsProps) => {
  const data = annonce || prestataire;
  const [showGallery, setShowGallery] = useState(false);
  const [slideINDEX, setSlideINDEX] = useState(0);
  const { t } = useTranslation();

  // Handle Firebase URLs (array of strings) or old Spatie Media format
  const firebaseImages = data?.image_urls || [];
  const spatieImages = data?.images || data?.gallery || [];
  const allMedia = firebaseImages.length > 0 ? firebaseImages : spatieImages;

  return (
    <>
      {/* desktop */}
      <section className="hidden md:block app-container-max-xl py-4 relative">
        <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden relative">
          <div
            onClick={() => {
              setShowGallery(true);
              setSlideINDEX(0);
            }}
            className="aspect-video h-full w-full relative group cursor-pointer"
          >
            {allMedia[0] && (
              <img
                src={(() => {
                  const media = allMedia[0];
                  const url =
                    typeof media === "string"
                      ? media
                      : media?.original_url || media?.url || media?.path;
                  return url || NoImage;
                })()}
                alt={"media"}
                className="w-full h-full object-cover"
              />
            )}
            {/* hover shadow */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200" />
          </div>
          <div
            onClick={() => {
              setShowGallery(true);
              setSlideINDEX(1);
            }}
            className="aspect-video h-full w-full relative group cursor-pointer"
          >
            {allMedia[1] && (
              <img
                src={(() => {
                  const media = allMedia[1];
                  const url =
                    typeof media === "string"
                      ? media
                      : media?.original_url || media?.url || media?.path;
                  return url || NoImage;
                })()}
                alt={"media"}
                className="w-full h-full object-cover"
              />
            )}
            {/* hover shadow */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200" />
          </div>
          <div
            onClick={() => {
              setShowGallery(true);
              setSlideINDEX(2);
            }}
            className="aspect-video h-full w-full relative group cursor-pointer"
          >
            {allMedia[2] && (
              <img
                src={(() => {
                  const media = allMedia[2];
                  const url =
                    typeof media === "string"
                      ? media
                      : media?.original_url || media?.url || media?.path;
                  return url || NoImage;
                })()}
                alt={"media"}
                className="w-full h-full object-cover"
              />
            )}
            {/* hover shadow */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200" />
          </div>
          {/* show more btn */}
          <div className="absolute z-10 bottom-2 right-2">
            <SampleButton
              text={t("plus_de_photos")}
              icon={<FaRegImages className="text-lg" />}
              callback={() => {
                setShowGallery(true);
                setSlideINDEX(0);
              }}
            />
          </div>
        </div>

        {/* gallery slider */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGallery(false)}
              className="fixed top-0 left-0 right-0 bottom-0 z-[999] bg-black bg-opacity-90 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="select-none flex items-center justify-center aspect-video w-[700px]"
              >
                <Swiper
                  className="w-full h-full"
                  slidesPerView={1}
                  loop={true}
                  navigation={{
                    prevEl: ".slide-button-prev",
                    nextEl: ".slide-button-next",
                  }}
                  modules={[Navigation]}
                  initialSlide={slideINDEX}
                >
                  {allMedia.map((media, index) => (
                    <SwiperSlide
                      key={index}
                      className="w-full h-full object-cover flex items-center justify-center"
                    >
                      <img
                        src={
                          typeof media === "string"
                            ? media
                            : media?.original_url ||
                              media?.url ||
                              media?.path ||
                              NoImage
                        }
                        alt={"media"}
                        className="h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* slider navigation left */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1/2 left-2 m-4 p-2 hover:bg-gray-800 bg-opacity-50 cursor-pointer text-white text-3xl border border-white rounded-full transform -translate-y-1/2 slide-button-prev"
              >
                <IoIosArrowBack className="ml-[-1px]" />
              </button>
              {/* slider navigation right */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1/2 right-2 m-4 p-2 hover:bg-gray-800 bg-opacity-50 cursor-pointer text-white text-3xl border border-white rounded-full transform -translate-y-1/2 slide-button-next"
              >
                <IoIosArrowBack className="transform rotate-180 mr-[-1px]" />
              </button>
              {/* close btn */}
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-2 right-2 m-2 p-3 hover:bg-gray-800 bg-opacity-50 cursor-pointer text-white text-xl border border-white rounded-full"
              >
                <GrClose />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* share & like */}
        <div className="absolute z-10 top-6 left-6">
          <div className="flex items-center gap-2">
            <PrestataireShareBtn />
          </div>
        </div>
      </section>

      {/* mobile */}
      <section className="block md:hidden relative">
        <div className="aspect-video w-full relative group cursor-pointer">
          <Swiper
            className="w-full h-full"
            slidesPerView={1}
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
            }}
          >
            {allMedia.map((media, index) => (
              <SwiperSlide key={index} className="aspect-video">
                <img
                  src={
                    typeof media === "string"
                      ? media
                      : media?.original_url ||
                        media?.url ||
                        media?.path ||
                        NoImage
                  }
                  alt={"media"}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* share & like */}
        <div className="absolute z-10 top-2 left-2">
          <div className="flex items-center gap-2">
            <PrestataireShareBtn doMobile />
          </div>
        </div>
      </section>
    </>
  );
};

GalleryWindows.Skeleton = () => {
  return (
    <>
      <div className="app-container-max-xl py-4 relative hidden md:block">
        <div className="grid grid-cols-4 gap-2 rounded-lg overflow-hidden relative">
          <div className="aspect-video h-full w-full col-span-2 relative group cursor-pointer">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="col-span-1 relative grid grid-cols-1 gap-1.5">
            <div className="aspect-video h-full w-full relative group cursor-pointer">
              <Skeleton width="100%" height="100%" />
            </div>
            <div className="aspect-video h-full w-full relative group cursor-pointer">
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
          <div className="col-span-1 relative grid grid-cols-1 gap-1.5">
            <div className="aspect-video h-full w-full relative group cursor-pointer">
              <Skeleton width="100%" height="100%" />
            </div>
            <div className="aspect-video h-full w-full relative group cursor-pointer">
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
      <div className="block md:hidden relative">
        <div className="aspect-video w-full relative group cursor-pointer">
          <Skeleton height="100%" width="100%" />
        </div>
      </div>
    </>
  );
};

export default GalleryWindows;
