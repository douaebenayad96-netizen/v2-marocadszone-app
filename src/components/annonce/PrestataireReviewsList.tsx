import { useTranslation } from 'react-i18next'
import { useEffect, useState } from "react"

import { useReviewsById } from "../../services/api/fetchReview"
import { Review } from '../../services/types/review'
import { FaAngellist } from 'react-icons/fa'
import ListView from '../common/ListView'
import ReviewsCard from '../reviews/ReviewsCard'

type PrestataireReviewsListProps = {
  id: number // id prestataire
}

const PrestataireReviewsList = ({ id }: PrestataireReviewsListProps) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [reviewsList, setReviews] = useState<Review[]>([])
  const {
    data: reviews,
    isLoading,
    isError,
  } = useReviewsById(id, page)

  useEffect(() => {
    if (reviews) {
      setReviews((prevReviews) => {
        // remove duplicate reviews
        const newReviews = reviews.data.filter((review) => {
          return !prevReviews.some((prevReview) => prevReview.id === review.id)
        })
        return [...prevReviews, ...newReviews]
      })
    }
  }, [reviews])

  const handleLoadMore = () => {
    if (reviews?.last_page && page < reviews.last_page) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <div>
      <ListView
        className='flex flex-col gap-4 mt-5'
        data={reviewsList}
        isLoading={isLoading || isError}
        renderItem={(review: Review) => (
          <ReviewsCard key={review.id} review={review} />
        )}
        skeletonItem={<ReviewsCard.Skeleton />}
        totalSkeletonItems={3}
      />
      {
        reviews?.last_page && page < reviews.last_page && (
          <div
            className="mt-4"
          >
            <button
              onClick={handleLoadMore}
              className="text-primary-blue font-bold hover:text-primary-blue-all-800 hover:underline transition-all"
            >
              {t('service_page.voir_plus_d_avis')}
            </button>
          </div>
        )
      }
      {
        reviewsList.length === 0 && !isLoading && !isError && (
          <p className='text-gray-500 text-lg flex gap-2 mt-12 items-center justify-center text-center'>
            <span>
              {t('service_page.aucun_avis')}
            </span>
            <FaAngellist className='inline-block' />
          </p>
        )
      }
    </div>
  )
}

export default PrestataireReviewsList