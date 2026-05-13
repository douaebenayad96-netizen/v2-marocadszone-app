import { FaAngellist } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

import { usePrestationById } from '../../services/api/fetchPrestation'
import { Prestataire } from '../../services/types/prestataire'
import ServiceCardSkeleton from '../ui/skeletons/ServiceCardSkeleton'
import ServiceCard from './ServiceCard'

type PrestataireServicesListProps = {
  prestataire?: Prestataire
}

const PrestataireServicesList = ({ prestataire }: PrestataireServicesListProps) => {
  const { t } = useTranslation()
  const { data: prestationData, isLoading, isError, refetch } = usePrestationById(prestataire?.id as unknown as number, false)

  useEffect(() => {
    if (prestataire?.id) {
      refetch()
    }
  }, [prestataire?.id, refetch])

  if (prestationData && prestationData.length === 0) {
    return (
      <div className='flex justify-center items-center h-[200px]'>
        <p className='text-gray-400 text-lg flex gap-2 items-center'>
          <span>
            {t('aucun_service_disponible_pour_le_moment')}
          </span>
          <FaAngellist className='inline-block' />
        </p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-8"
    >
      {
        (isLoading || isError || !prestataire) && (
          Array.from(Array(8).keys()).map((n) => (
            <ServiceCardSkeleton key={n} />
          ))
        )
      }
      {/* service cards */}
      {prestataire && prestationData?.map((service) => {
        service.prestataire = prestataire
        return (
          <ServiceCard key={service.id} prestation={service} />
        )
      })}
    </div>
  )
}

export default PrestataireServicesList