import { LuShare } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'

import SampleButton from '../ui/SampleButton'

type PrestataireShareBtnProps = {
  doMobile?: boolean
}

const PrestataireShareBtn = ({ doMobile }: PrestataireShareBtnProps) => {
  const { t } = useTranslation()

  const handleShare = () => {
    const shareData = {
      title: 'Prestataire',
      text: 'Découvrez ce prestataire',
      url: window.location.href
    }
    navigator.share(shareData)
  }

  if (doMobile) {
    return (
      <button
        onClick={handleShare}
        className="cursor-pointer px-4 text-primary-blue rounded-md py-2 bg-gray-50 font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
      >
        <LuShare className="text-2xl" />
      </button>
    )
  }
  return (
    <SampleButton
      text={t('share')}
      icon={<LuShare className="text-lg z-10" />}
      callback={handleShare}
    />
  )
}

export default PrestataireShareBtn