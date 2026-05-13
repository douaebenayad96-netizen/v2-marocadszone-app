import { FaArrowLeftLong } from "react-icons/fa6"
import { RiBrush4Line } from "react-icons/ri"
import { FaWalking } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import NoImage from "../../assets/img/no-image.png"
import { TCandidatures } from "../../services/types/candidature"
import { TService } from "../../services/types/serviceType"
import Badge from "../ui/Badge"
import { cn } from "../../utils/helpers"
import { TCheckoutState } from "../../services/types/checkoutState"

type PressetataireMapCardProps = {
  candidature: TCandidatures
  demand?: TService | undefined
}

const PressetataireMapCard = ({ candidature, demand }: PressetataireMapCardProps) => {
  const { prestataire, price } = candidature
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const specialite = i18n.language === 'fr' ? prestataire?.speciality?.label : i18n.language === 'en' ? prestataire?.speciality?.label : prestataire?.speciality?.label

  const handleContinue = () => {
    if (!demand) return
    const state: TCheckoutState = {
      prestataire: candidature.prestataire,
      demande: demand,
      candidature: candidature
    }
    navigate('/payments', { state })
  }

  return (
    <div
      className="bg-white p-4 rounded-md w-[250px] md:w-[300px]"
    >
      <div
        className="aspect-video w-full rounded-md overflow-hidden"
      >
        <img
          src={(prestataire?.media && prestataire?.media[0]) && prestataire?.media[0].original_url || NoImage}
          alt="Prestataire image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="line my-2"></div>

      {/* info card */}
      <div
        className="bg-gray-50 rounded-md py-2"
      >
        <div className="pb-2 px-2">
          {/* badges */}
          <div className="flex gap-2">
            <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 bg-blue-100 rounded-full px-2 py-0.5">
              <RiBrush4Line />
              {
                specialite
              }
            </p>
            <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 bg-blue-100 rounded-full px-2 py-0.5">
              <FaWalking />
              {prestataire?.availability === 0 ? (
                <span>Offline</span>
              ) : prestataire?.availability === 1 ? (
                <span>Online</span>
              ) : (
                <span>Unknown</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <div className="line mb-2"></div>
          <div
            className="flex justify-between items-center px-2"
          >
            <div>
              <p
                className="text-sm font-bold text-gray-500"
              >
                {
                  prestataire?.reservation_count && prestataire?.reservation_count > 0 ? (
                    <>
                      <span
                        className="text-blue-500"
                      >
                        {prestataire?.reservation_count}
                      </span>
                      <span>
                        {t('prestations_realisees')}
                      </span>
                    </>
                  ) : (
                    <Badge text={t("nouveau")} type="info" />
                  )
                }
              </p>
            </div>
            <div
              className="flex gap-1 items-center"
            >
              <p
                className="text-base font-bold text-blue-500"
              >
                {price} {t('MAD')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* contact btns */}
      <div
        className="mt-2"
      >
        <button
          onClick={handleContinue}
          className="flex items-center justify-center gap-2 bg-primary-blue-all-500 hover:bg-primary-blue-all-800 transition-all text-white w-full py-2 rounded-md mt-2"
        >
          <span>
            {t('continuer_avec')} {' '} {prestataire?.first_name}
          </span>
          <FaArrowLeftLong
            className={
              cn(
                "text-xl transform",
                i18n.language != 'ar' && '-rotate-180'
              )
            }
          />
        </button>
      </div>
    </div>
  )
}

export default PressetataireMapCard