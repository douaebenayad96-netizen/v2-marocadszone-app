import { FaHeart } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Prestation } from '../../services/types/prestation'
import { useAddOrRemoveFavorite, useCheckFavorite } from '../../services/api/fetchLike'
import { useAuthStore } from '../../services/store/authStore'
import CustomToast from '../common/CustomToast'

type LikeButtonProps = {
  prestation: Prestation
}

const LikeButton = ({ prestation }: LikeButtonProps) => {
  const { t } = useTranslation()
  const [totalLikes, setTotalLikes] = useState<number>(prestation?.favoris_count)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const token = useAuthStore(state => state.token)
  const { mutateAsync: addOrRemoveFavorite } = useAddOrRemoveFavorite()

  const {
    data: isFavoriteData,
    isError: isFavoriteError,
    isLoading: isFavoriteLoading,
    refetch: refetchFavorite
  } = useCheckFavorite(prestation.id, token as string, false)

  useEffect(() => {
    if (token) {
      refetchFavorite()
    }
  }, [token, refetchFavorite])

  useEffect(() => {
    if (isFavoriteData && isFavoriteData.is_favorited === true) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [isFavoriteData])

  const handleLike = () => {
    if (token) {
      if (isLiked) {
        setTotalLikes(totalLikes - 1)
      } else {
        setTotalLikes(totalLikes + 1)
      }
      setIsLiked(!isLiked)

      addOrRemoveFavorite({
        prestataire_id: prestation.id,
        token,
      })
        .catch(
          err => {
            console.log(err)
          })
    } else {
      CustomToast(t('vous_devez_vous_connecter_pour_ajouter_aux_favoris'), 'error')
    }
  }

  if (isFavoriteError || isFavoriteLoading) {
    return (
      <div className='text-primary-blue border flex items-center gap-1 border-gray-200 px-2 py-1 rounded-md cursor-pointer bg-gray-50 transition-all'>
        {/* loading */}
        <BiLoaderAlt className="animate-spin text-primary-blue-all-900 text-xl" />
      </div>
    )
  }

  return (
    <div
      onClick={handleLike}
      className='text-primary-blue border flex items-center gap-1 border-gray-200 px-2 py-1 rounded-md cursor-pointer bg-gray-50 transition-all hover:bg-primary-blue-all-500 hover:text-white'
    >
      <span className='text-sm'>
        {totalLikes}
      </span>
      {
        isLiked
          ? <FaHeart className='text-lg text-red-500' />
          : <FaHeart className='text-lg' />
      }
    </div>
  )
}

export default LikeButton