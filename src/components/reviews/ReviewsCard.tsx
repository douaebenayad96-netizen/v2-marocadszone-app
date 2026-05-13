import { useTranslation } from 'react-i18next'

import { Review } from "../../services/types/review"
import StarIcon from "../ui/StarIcon"
import NoProfile from '../assets/img/no-profile.png'
import Skeleton from 'react-loading-skeleton'

type ReviewsCardProps = {
  review: Review
}

const ReviewsCard = ({ review }: ReviewsCardProps) => {
  const { t } = useTranslation()
  const reviewDate = new Date(review?.created_at);
  const currentDate = new Date();

  const differenceInMilliseconds = currentDate.getTime() - reviewDate.getTime();
  const differenceInYears = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30 * 12));
  const differenceInMonths = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30));
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

  let formattedDifference = '';

  if (differenceInYears > 0) {
    formattedDifference = `${differenceInYears} ${t('years')}`;
  } else if (differenceInMonths > 0) {
    formattedDifference = `${differenceInMonths} ${t('months')}`;
  } else if (differenceInDays > 0) {
    formattedDifference = `${differenceInDays} ${t('days')}`;
  } else if (differenceInHours > 0) {
    formattedDifference = `${differenceInHours} ${t('hours')}`;
  } else {
    formattedDifference = `${differenceInMinutes} ${t('minutes')}`;
  }

  return (
    <div
      className="shadow-card-sm rounded-md p-4"
    >
      <div
      >
        <div
          className="flex items-center"
        >
          <div
            className="flex items-center gap-3"
          >
            <div
              className="w-12 h-12 rounded-full bg-gray-300"
            >
              <img
                className="w-full h-full rounded-full object-cover"
                src={review?.clients?.media && review?.clients?.media[0]?.original_url ? review?.clients?.media[0].original_url : NoProfile}
                alt="avatar"
              />
            </div>
            <div
            >
              <div
                className="text-sm font-bold text-gray-900"
              >
                {review?.client?.firstname} {review?.client?.lastname}
              </div>
              <div
                className="flex items-center gap-2"
              >
                <div
                  className="text-sm text-gray-700"
                >
                  {formattedDifference}
                </div>
                <div
                  className="flex items-center gap-1"
                >
                  <StarIcon />
                  <div
                    className="text-sm text-gray-700"
                  >
                    {review?.rate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-4 text-gray-700"
        >
          <p>
            {(review?.comment && review?.comment.length > 0) ? review?.comment : 'Aucun commentaire'}
          </p>
        </div>
      </div>

    </div>
  )
}

ReviewsCard.Skeleton = () => {
  return (
    <div
      className="shadow-card-sm rounded-md p-4"
    >
      <div
      >
        <div
          className="flex items-center"
        >
          <div
            className="w-12 h-12 rounded-full bg-gray-300"
          >
            <Skeleton
              circle
              width={48}
              height={48}
            />
          </div>
          <div
            className="flex-1 ml-4"
          >
            <Skeleton
              width={100}
              height={20}
            />
            <div
              className="flex items-center gap-2"
            >
              <Skeleton
                width={100}
                height={20}
              />
              <Skeleton
                width={100}
                height={20}
              />
            </div>
          </div>
        </div>
        <div
          className="mt-4"
        >
          <Skeleton
            count={3}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewsCard