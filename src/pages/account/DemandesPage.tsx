import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import ProfileDemandesList from '../../components/account/ProfileDemandesList'

const DemandesPage = () => {
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
          {t('mes_demandes.title')}
        </h1>
        <ProfileDemandesList />
      </div>
    </motion.div>
  )
}

export default DemandesPage