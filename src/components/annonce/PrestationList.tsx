import { useEffect, useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { useGetFavorites } from "../../services/api/fetchLike"
import { useAuthStore } from "../../services/store/authStore"
import SampleButton from "../ui/SampleButton"
import EmptyPic from '../assets/img/Empty-bro.svg'
import { PrestataireCardV2 } from "./PrestataireCard"
import { Prestataire } from "../../services/types/prestataire"

const PrestationList = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [allPrestations, setAllPrestations] = useState<Prestataire[]>([]);
  const token = useAuthStore(state => state.token)
  const {
    data: favorites,
    isLoading,
    isError
  } = useGetFavorites(token as string, page, true)

  useEffect(() => {
    if (favorites && favorites.data && favorites.data.length > 0) {
      // add only new categories fetched
      setAllPrestations((prevPrestations) => {
        // check if categories already exist
        const alreadyExist = prevPrestations.find((prestation) => prestation.id === favorites.data[0].id)
        if (alreadyExist) {
          return prevPrestations
        }
        return [
          ...prevPrestations,
          ...favorites.data,
        ]
      });
    }
  }, [favorites, setAllPrestations, page])

  const handleLoadMore = () => {
    const totalPage = favorites?.last_page
    if (!totalPage) return
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8'>
        {
          allPrestations?.map((prestation: Prestataire) => (
            <PrestataireCardV2
              key={prestation.id}
              prestataire={prestation}
            />
          ))
        }
        {/*
          (isLoading || isError ) && (
            Array.from({ length: 8 }, (_, i) => <PrestataireCardSkeleton key={i} />)
          )
        */}
      </div>
      {/* empty list */}
      {
        !isLoading && !isError && allPrestations.length === 0 && (
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
              {t('profile.favoris-prestataire.aucune_favori')}
            </h3>
            <div>
              <p className="text-sm font-medium text-primary-gray-500 mt-2 text-center">
                {t('profile.favoris-prestataire.aucune_favori_description')}
              </p>
            </div>
            <Link
              to="/prestataires"
              className="text-sm font-bold text-center text-primary-blue-all-800 hover:underline mt-8">
              {t('profile.favoris-prestataire.decouvrir_prestataire')}
            </Link>
          </div>
        )
      }
      {
        favorites?.last_page !== page ? (
          <div className="flex justify-center mt-8 w-fit mx-auto">
            <SampleButton
              callback={handleLoadMore}
              text={t("voir_plus")}
              icon={isLoading && <RiLoader4Line className="animate-spin" />}
            />
          </div>
        ) : null
      }
    </>
  )
}

export default PrestationList