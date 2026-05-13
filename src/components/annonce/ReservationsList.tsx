import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useGetUserReservations } from '../../services/api/fetchReservation'
import { useAuthStore } from '../../services/store/authStore'
import EmptyPic from '../assets/img/Empty-bro.svg'
import { Prestataire } from '../../services/types/prestataire'
import PrestataireChatBox from '../chat/PrestataireChatBox'
import ReservationCard from './ReservationCard'
import ReservationCardSkeleton from '../ui/skeletons/ReservationCardSkeleton'

const ReservationsList = () => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const { data, isError, isLoading, refetch } = useGetUserReservations(token as string, false)
  const [selectedPrestataire, setSelectedPrestataire] = useState<Prestataire | null>(null)
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false)

  useEffect(() => {
    if (token) {
      refetch()
    }
  }, [token, refetch])

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8'>
        {
          (isLoading || isError) ? (
            Array.from({ length: 8 }, (_, i) => <ReservationCardSkeleton key={i} />)
          ) : (
            data?.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onContact={(pres) => {
                  setSelectedPrestataire(pres)
                  setIsChatBoxOpen(true)
                }}
              />
            ))
          )
        }
      </div>
      {/* empty list */}
      {
        !isLoading && !isError && data?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-8">
            <div
              className="w-48 h-48 flex items-center justify-center rounded-full bg-primary-gray-100"
            >
              <img
                draggable={false}
                src={EmptyPic}
                alt="empty"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary-blue-all-800 mt-2">
              {t('profile.reservations.aucune_reservation')}
            </h3>
            <div>
              <p className="text-sm font-medium text-primary-gray-500 mt-2 text-center">
                {t('profile.reservations.aucune_reservation_description')}
              </p>
            </div>
            <Link
              to="/services"
              className="text-sm font-bold text-center text-primary-blue-all-800 hover:underline mt-8">
              {t('profile.reservations.parcourir_tous_les_services')}
            </Link>
          </div>
        )
      }
      {
        selectedPrestataire && (
          <PrestataireChatBox
            prestataire={selectedPrestataire}
            isOpen={isChatBoxOpen}
            onClosed={() => {
              setIsChatBoxOpen(false)
            }}
          />
        )
      }
    </>
  )
}

export default ReservationsList