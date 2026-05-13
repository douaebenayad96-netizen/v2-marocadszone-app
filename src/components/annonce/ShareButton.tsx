import { FaShareAlt } from "react-icons/fa"

import CustomToast from "../common/CustomToast"
import { Prestation } from "../../services/types/prestation"

type ShareButtonProps = {
  prestation: Prestation
}

const ShareButton = ({ prestation }: ShareButtonProps) => {

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: prestation?.title,
        text: prestation?.description,
        url: window.location.href
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      CustomToast('Votre navigateur ne supporte pas le partage', 'warning')
    }
  }

  return (
    <div
      onClick={handleShare}
      className='text-primary-blue border flex items-center border-gray-200 px-2 py-1 rounded-md cursor-pointer bg-gray-50 transition-all hover:bg-primary-blue-all-500 hover:text-white'
    >
      <FaShareAlt className='text-lg' />
    </div>
  )
}

export default ShareButton