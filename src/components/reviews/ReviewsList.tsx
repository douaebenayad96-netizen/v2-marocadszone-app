import { FaAngellist } from 'react-icons/fa'
import { RiLoader4Line } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useReviewsById } from '../../services/api/fetchReview'
import ReviewsCard from './ReviewsCard'
import { Review } from '../../services/types/review'

type ReviewsListProps = {
  idService: number
}

const ReviewsList = ({ idService }: ReviewsListProps) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const { data: reviewsData, isLoading: reviewsIsLoading, isError: reviewsIsError } = useReviewsById(idService, page)
  const [allReviews, setAllReviews] = useState<Review[]>([])

  useEffect(() => {
    if (reviewsData && reviewsData.data) {
      // add only new reviews fetched
      setAllReviews((prevReviews) => {
        // check if reviews already exist
        const alreadyExist = prevReviews.find((review) => review.id === reviewsData.data[0].id)
        if (alreadyExist) {
          return prevReviews
        }
        return [...prevReviews, ...reviewsData.data]
      });
    }
  }, [reviewsData, setAllReviews, page])

  const handleLoadMore = () => {
    const totalPage = reviewsData?.last_page
    if (totalPage && page < totalPage) {
      setPage(page + 1)
    }
  }

  return (
    <div
    >
      <h2
        className="text-xl font-bold text-gray-900"
      >
        {t('service_page.avis')}
      </h2>
      <div className='flex flex-col gap-4 mt-5'>
        {
          allReviews.map((review) => (
            <ReviewsCard key={review.id} review={review} />
          ))
        }
        {/* loading */}
        {
          reviewsIsLoading && (
            <>
              <div
                className="flex justify-center items-center p-4"
              >
                <RiLoader4Line className="animate-spin text-primary-blue-all-800 text-4xl" />
              </div>
            </>
          )
        }
        {/* error */}
        {
          reviewsIsError && (
            <p className='text-gray-500 text-lg flex gap-2 items-center'>
              <span>
                {t('une_erreur_est_survenue')}
              </span>
              <FaAngellist className='inline-block' />
            </p>
          )
        }
        {/* no reviews */}
        {
          // length
          allReviews?.length === 0 && (
            <p className='text-gray-500 text-lg flex gap-2 items-center'>
              <span>
                {t('service_page.aucun_avis')}
              </span>
              <FaAngellist className='inline-block' />
            </p>
          )
        }
      </div>
      {/* load more reviews btn */}
      <div
        className="mt-4"
      >
        {
          reviewsData?.last_page !== page && (
            <button
              onClick={() => handleLoadMore()}
              className="text-primary-blue font-bold hover:text-primary-blue-all-800 hover:underline transition-all"
            >
              {t('service_page.voir_plus_d_avis')}
            </button>
          )
        }
      </div>
    </div>
  )
}

export default ReviewsList