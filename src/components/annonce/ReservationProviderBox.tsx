import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NoImage from "../../assets/img/no-image.png";
import { Prestataire } from "../../services/types/prestataire";
import SampleButton from "../ui/SampleButton";

type GalleryWindowsProps = {
  prestataire: Prestataire;
};

const ReservationProviderBox = ({ prestataire }: GalleryWindowsProps) => {
  const [showGallery, setShowGallery] = useState(false);
  const [slideINDEX, setSlideINDEX] = useState(0);

  /* const { i18n } = useTranslation()
   const lang = i18n.language as 'ar' | 'fr' | 'en'
   const today = startOfToday()
   const [selectedDay, setSelectedDay] = useState(today)
   const [selectHours, setSelectHours] = useState(false)
   const [hour, setHour] = useState(2)
   const availableDays = useMemo(() => {
     return prestataire?.availability_days?.map(day => parseInt(day)) || [];
   }, [prestataire])
 
   useEffect(() => {
     if (availableDays.length > 0) {
       let nextAvailableDay = selectedDay;
 
       // Find the next available day
       while (!availableDays.includes((getDay(nextAvailableDay) + 6) % 7)) {
         nextAvailableDay = add(nextAvailableDay, { days: 1 });
       }
 
       // Set the next available day as the selected day only if it has changed
       if (!isSameDay(nextAvailableDay, selectedDay)) {
         setSelectedDay(nextAvailableDay);
       }
     }
   }, [availableDays, selectedDay])*/

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div
          onClick={() => {
            setShowGallery(true);
            setSlideINDEX(0);
          }}
          className=" h-500 inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"
        >
          <img
            className="w-40 h-40 object-cover"
            src={(prestataire?.gallery && prestataire?.gallery[0]) || NoImage}
            alt={prestataire?.profession?.label}
          />
          {/* hover shadow */}
          <div className=" inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"></div>
        </div>

        <div
          onClick={() => {
            setShowGallery(true);
            setSlideINDEX(1);
          }}
          className=" inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"
        >
          <img
            className="w-40 h-40 object-cover"
            src={(prestataire?.gallery && prestataire.gallery[1]) || NoImage}
            alt={prestataire?.profession?.label}
          />
          {/* hover shadow */}
          <div className=" inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"></div>
        </div>

        <div
          onClick={() => {
            setShowGallery(true);
            setSlideINDEX(2);
          }}
          className=" inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"
        >
          <img
            className="w-40 h-40 object-cover"
            src={(prestataire?.gallery && prestataire.gallery[2]) || NoImage}
            alt={prestataire?.profession?.label}
          />
          {/* hover shadow */}
          <div className=" inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"></div>
        </div>
        <div
          onClick={() => {
            setShowGallery(true);
            setSlideINDEX(3);
          }}
          className=" inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"
        >
          <img
            className="w-40 h-40 object-cover"
            src={(prestataire?.gallery && prestataire.gallery[3]) || NoImage}
            alt={prestataire?.profession?.label}
          />
          {/* hover shadow */}
          <div className="inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="mt-1"></div>

        <div className="mt-1 butt">
          <SampleButton
            text="plus_de_photos"
            icon={<FaRegImages className="text-lg" />}
            callback={() => {
              setShowGallery(true);
              setSlideINDEX(0);
            }}
          />
        </div>
      </div>
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
                {prestataire?.gallery?.map((imageUrl, index) => (
                  <SwiperSlide
                    key={index}
                    className="w-full h-full object-cover flex items-center justify-center"
                  >
                    <img
                      src={imageUrl}
                      alt={prestataire?.profession?.label}
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
              className="absolute top-2 right-2 m-2 p-3 hover:bg-gray-800 bg-opacity-50 cursor-pointer text-white text-xl border border-white rounded-full "
            >
              <GrClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReservationProviderBox;
