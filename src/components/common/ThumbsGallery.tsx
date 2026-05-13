import { TbCircleChevronLeft, TbCircleChevronRight } from 'react-icons/tb';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules';
import ThumbsOptions from 'swiper';
import { useState } from 'react';

import NoImage from '../assets/img/no-image.png'
import { Media } from '../../services/types/media';

type ThumbsGalleryProps = {
  media: Media[]
}

const ThumbsGallery = ({ media }: ThumbsGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<ThumbsOptions | null>(null);
  const [position, setPosition] = useState(0)

  return (
    <div>
      <div
        className="relative"
      >
        <Swiper
          dir='ltr'
          modules={[Navigation, Thumbs]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }}
          onSlideChange={(swiper) => setPosition(swiper.activeIndex)}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="aspect-video"

        >
          {
            media?.length === 0 && (
              <SwiperSlide>
                <img
                  className='object-cover w-full h-full select-none'
                  src={NoImage}
                  alt="Prestation image"
                />
              </SwiperSlide>
            )
          }
          {
            media?.map((m, i) => (
              <SwiperSlide
                key={i}
              >
                <img
                  className='object-cover w-full h-full select-none'
                  src={m.original_url}
                  alt="Prestation image"
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
        {/* controls */}
        <div
          className={`prev-btn ${position === 0 ? 'opacity-20' : ''}`}
        >
          <button
            className="bg-white bg-opacity-90 rounded-full p-2 focus:outline-none"
          >
            <TbCircleChevronLeft className="text-primary-blue text-2xl" />
          </button>
        </div>
        <div
          className={`next-btn ${position === media.length - 1 ? 'opacity-20' : ''}`}
        >
          <button
            className="bg-white bg-opacity-90 rounded-full p-2 focus:outline-none"
          >
            <TbCircleChevronRight className="text-primary-blue text-2xl" />
          </button>
        </div>
      </div>
      {/* thumb */}
      <Swiper
        spaceBetween={4}
        slidesPerView={3.9}
        breakpoints={{
          640: {
            slidesPerView: 4.4,
          },
          1024: {
            slidesPerView: 5.4,
          },
        }}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        // loop={false}
        navigation={{
          prevEl: '.next-category-btn',
          nextEl: '.prev-category-btn',
        }}
        className="mt-1"
        modules={[Navigation, Thumbs]}
      >
        {
          media?.length === 0 && (
            <SwiperSlide className="p-[1px]">
              <img
                className='object-cover aspect-video cursor-pointer select-none'
                src={NoImage}
                alt="Prestation image"
              />
            </SwiperSlide>
          )
        }
        {
          media?.map((m, i) => (
            <SwiperSlide className="p-[1px]" key={i}>
              <img
                className='object-cover aspect-video cursor-pointer select-none'
                src={m.original_url}
                alt="Prestation image"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ThumbsGallery