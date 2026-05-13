import { GoArrowUpRight } from 'react-icons/go'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import Skeleton from 'react-loading-skeleton'

import { TDemande } from '../../services/types/demandeType'
import SampleButton from '../ui/SampleButton'
import Badge from '../ui/Badge'

type TDemandCardProps = {
  demande: TDemande
}

const DemandCard = ({ demande }: TDemandCardProps) => {
  const { t, i18n } = useTranslation()

  return (
    <div className='bg-white shadow-card-sm p-4 rounded-md'>
      <div>
        {/* status */}
        <div className="flex items-center gap-2">
          <Badge
            text={demande?.Active === 1 ? t('en_direct_et_actif') : t('demande_cloturee')}
            type={demande?.Active === 1 ? 'success' : 'danger'}
          />
          <Badge
            text={demande?.status}
            type='light'
          />
        </div>
      </div>
      <div className="line mt-4 mb-3"></div>
      {/* service details */}
      <div>
        <span
          className="text-sm font-bold text-primary-gray-500 line-clamp-2">
          {
            demande?.title
          }
        </span>
      </div>
      {/* service date */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('checkin')}
        </span>
        <span className="text-sm font-bold text-primary-blue">
          {
            format(new Date(demande?.date), 'dd MMMM yyyy', { locale: fr }) + ' à ' + format(parseISO(`1970-01-01T${demande?.hour}Z`), 'hh:mm a')
          }
        </span>
      </div>
      {/* price */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('reference')}
        </span>
        <span className="text-sm font-bold text-primary-blue">
          {
            demande?.reference
          }
        </span>
      </div>
      {/* address */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm font-bold text-gray-500">
          {t('adresse')}
        </span>
        <span className="text-sm font-bold text-primary-blue line-clamp-1">
          {
            demande?.adresse
          }
        </span>
      </div>
      {/* contact */}
      <div className="mt-4">
        <SampleButton
          text={demande?.Active === 1 ? t('voir_lannonce') : t('annonce_non_active')}
          callback={() => {
            if (demande?.Active != 1) {
              return
            }
            window.open(`/job/annonce/${demande?.id}`, '_blank')
          }}
          icon={demande?.Active === 1 && <GoArrowUpRight className={`text-xl -mb-[2px] ${i18n.language === 'ar' ? '-rotate-90' : '0'}`} />}
          iconPosition='right'
        />
      </div>
    </div>
  )
}

DemandCard.Skeleton = () => {
  return (
    <div className='bg-white shadow-card-sm p-4 rounded-md'>
      <div>
        {/* status */}
        <div className="flex items-center gap-2">
          <Skeleton width={100} height={20} />
          <Skeleton width={100} height={20} />
        </div>
      </div>
      <div className="line mt-4 mb-2"></div>
      {/* service details */}
      <div>
        <Skeleton width={150} height={17} />
      </div>
      {/* service date */}
      <div className="flex items-center gap-2 mt-1.5">
        <Skeleton width={100} height={15} />
        <Skeleton width={150} height={15} />
      </div>
      {/* price */}
      <div className="flex items-center gap-2 mt-1.5">
        <Skeleton width={100} height={15} />
        <Skeleton width={150} height={15} />
      </div>
      {/* address */}
      <div className="flex items-center gap-2 mt-1.5">
        <Skeleton width={100} height={15} />
        <Skeleton width={150} height={15} />
      </div>
      {/* contact */}
      <div className="mt-2">
        <button className='btn-secondary-white w-full'>
          <Skeleton width={100} height={20} />
        </button>
      </div>
    </div>
  )
}

export default DemandCard