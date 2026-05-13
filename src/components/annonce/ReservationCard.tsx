import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import SampleButton from '../ui/SampleButton'
import { Reservation } from '../../services/types/reservation'
import { Prestataire } from '../../services/types/prestataire'
import UserInfoBox from '../account/UserInfoBox'
import ReviewForm from '../reviews/ReviewForm'
import ModalLayout from '../layouts/ModalLayout'

type ReservationCardProps = {
  reservation: Reservation
  onContact: (pres: Prestataire) => void
}

const ReservationCard = ({ reservation, onContact }: ReservationCardProps) => {
  const { t, i18n } = useTranslation()
  const [showReviewsModal, setShowReviewsModal] = useState(false)

  return (
    <div className='bg-white shadow-card-sm p-4 rounded-md'>
      <div>
        <UserInfoBox prestataire={reservation.prestataire} />
        {/* status */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs font-bold text-gray-500">
            {t('profile.reservations.status')}:
          </span>
          <span className="text-xs font-bold text-primary-blue-all-500">
            {reservation.status}
          </span>
        </div>
      </div>
      <div className="line my-4"></div>
      {/* service details */}
      <div>
        <span
          className="text-sm font-bold text-primary-gray-500 line-clamp-2">
          {reservation.prestation.title}
        </span>
      </div>
      {/* service date */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('profile.reservations.date')}:
        </span>
        <span className="text-sm font-bold text-primary-blue">
          {reservation.date}
        </span>
      </div>
      {/* price */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('profile.reservations.price')}:
        </span>
        <span className="text-sm font-bold text-primary-blue">
          {reservation.prestation.price} {t('MAD')}
        </span>
      </div>
      {/* price */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('number_of_hours')}:
        </span>
        <span className="text-sm font-bold text-primary-blue">
          {reservation.nbr} {reservation.nbr > 1 ? t('heures') : t('heure')}
        </span>
      </div>
      {/* address */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('adresse')}:
        </span>
        <span className="text-sm font-bold text-primary-blue line-clamp-1">
          {reservation.adresse}
        </span>
      </div>
      {/* actions */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setShowReviewsModal(true)}
          className="text-sm font-bold text-primary-blue-all-800 hover:underline"
        >
          {t('profile.reservations.leaveReview')}
        </button>
        {/* <button
          className="text-sm font-bold text-primary-blue-all-800 hover:underline">
          Voir plus
        </button> */}
      </div>
      {/* contact */}
      <div className="mt-4">
        <SampleButton
          text={t('profile.reservations.contact_prestataire')}
          callback={() => onContact(reservation.prestataire)}
        />
      </div>

      {/* reviews model */}
      <ModalLayout
        isOpen={showReviewsModal}
        setIsOpen={setShowReviewsModal}
        className="relative w-[calc(100vw-16px)] max-w-[400px] mx-auto bg-white rounded-lg overflow-x-hidden"
        defaultHeader
        headerText={t('profile.reservations.leaveReview')}
        headerClassName="text-start"
        rtl={i18n.dir() === 'rtl'}
      >
        <ReviewForm
          idPrestataire={reservation.prestataire_id}
          onSend={() => setShowReviewsModal(false)}
        />
      </ModalLayout>
    </div>
  )
}

export default ReservationCard