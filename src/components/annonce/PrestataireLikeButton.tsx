import { LuHeart } from "react-icons/lu"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Skeleton from "react-loading-skeleton"
import { FaHeart } from "react-icons/fa"

import SampleButton from ".././ui/SampleButton"
import { useAuthStore } from "../../services/store/authStore"
import { useAddOrRemoveFavorite, useCheckFavorite } from "../../services/api/fetchLike"
import CustomToast from "../common/CustomToast"

type PrestataireLikeButtonProps = {
  doMobile?: boolean
  idPrestataire: number
}

const PrestataireLikeButton = ({ doMobile, idPrestataire }: PrestataireLikeButtonProps) => {
  const { t } = useTranslation()
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const token = useAuthStore(state => state.token)
  const { mutateAsync: addOrRemoveFavorite } = useAddOrRemoveFavorite()
  const {
    data: isFavoriteData,
    isError: isFavoriteError,
    isLoading: isFavoriteLoading,
    refetch: refetchFavorite
  } = useCheckFavorite(idPrestataire, token as string, false)

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
      setIsLiked(!isLiked)

      addOrRemoveFavorite({
        prestataire_id: idPrestataire,
        token,
      })
        .catch(err => {
          console.log(err)
        })
    } else {
      CustomToast(t('vous_devez_vous_connecter_pour_ajouter_aux_favoris'), 'info')
    }
  }

  if (doMobile) {
    if (isFavoriteLoading || isFavoriteError) {
      return (
        <Skeleton width={40} height={40} />
      )
    }
    return (
      <button
        onClick={handleLike}
        className="cursor-pointer px-4 text-primary-blue rounded-md py-2 bg-gray-50 font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
      >
        {isLiked ? <FaHeart className="text-red-400 text-2xl" /> : <LuHeart className="text-2xl" />}
      </button>
    )
  }

  if (isFavoriteError || isFavoriteLoading) {
    return (
      <div
        className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1.5 cursor-pointer bg-white transition-all"
      >
        <Skeleton width="90px" height="100%" />
      </div>
    )
  }

  return (
    <SampleButton
      text={isLiked ? t("retirer") : t("favorite")}
      icon={isLiked ? <FaHeart className="text-lg text-red-400" /> : <LuHeart className="text-lg" />}
      callback={handleLike}
    />
  )
}

export default PrestataireLikeButton