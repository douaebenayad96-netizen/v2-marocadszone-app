import { motion } from 'framer-motion'

import { useTranslation } from 'react-i18next'
import ReservationsList from '../../components/annonce/ReservationsList'

const ReservationsPage = () => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .15 }}
      className="app-container"
    >
      <div className="py-4 md:p-12">
        <h1 className="title-h2">
          {t('profile.reservations.mes_reservations')}
        </h1>
        <ReservationsList />
      </div>
    </motion.div>
  )
}

export default ReservationsPage