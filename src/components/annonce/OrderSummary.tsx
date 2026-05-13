import { IoLockClosed } from "react-icons/io5"
import { BiLoaderAlt } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import NoImage from "../../assets/img/no-image.png"
import { paymentMethod } from "../../services/types/checkout"
import { TCheckoutState } from "../../services/types/checkoutState"

type OrderSummaryProps = {
  paymentMethod: paymentMethod | null
  checkoutState: TCheckoutState
  onConfirmOrder: () => void
  isLoading: boolean
}

const OrderSummary = ({ paymentMethod, onConfirmOrder, isLoading, checkoutState }: OrderSummaryProps) => {
  const { demande, candidature } = checkoutState
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'ar' | 'en'
  const total = demande?.nbr * parseFloat(candidature?.price)

  return (
    <aside className="flex-[0.5] ">
      <div className="border border-gray-200 rounded-sm sticky top-5">
        <div className="bg-gray-50 p-4">
          <h4
            className="title-h4"
          >
            {t('check_out_page.recapitulatif_de_la_commande')}
          </h4>
          <div className="flex items-start gap-4 mt-5">
            <div
              className="aspect-video max-w-[120px] rounded-sm overflow-hidden"
            >
              <img
                className="w-full h-full object-cover"
                src={(demande?.media && demande?.media[0]?.original_url) ? demande?.media[0]?.original_url : NoImage}
                alt="order picture"
              />
            </div>
            <Link
              to={`/job/annonce/${demande?.id}`}
              target="_blank"
              className="text-base font-semibold text-gray-800 line-clamp-3 hover:underline">
              {demande?.title}
            </Link>
          </div>
        </div>
        {/* date livrasion */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-800">
              {t('check_out_page.date_de_livraison')}
            </p>
            <p className="text-base font-medium text-gray-800">
              {
                new Date(demande?.date + 'T' + demande?.hour).toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US',
                  {
                    weekday: 'short',
                    year: '2-digit',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
              }
            </p>
          </div>
        </div>
        {/* Détails du prix */}
        <div className="p-4 border-b border-gray-200">
          {/* <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-800">
              {t('check_out_page.prix_unitaire')}
            </p>
            <p className="text-base font-medium text-gray-800">
               {Number(prestation?.price).toFixed(2)} {t('MAD')}
            </p>
          </div> */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-base font-medium text-gray-800">
              {t('check_out_page.cout_de_la_commande')}
            </p>
            <p className="text-base font-medium text-gray-800">
              {/* {number + ' ' + (prestation?.tarification === 'Heures' ? number > 1 ? t('heures') : t('heure') : number > 1 ? t('jours') : t('jour'))} */}
              {
                demande?.nbr + ' ' + (demande?.nbr > 1 ? t('heures') : t('heure'))
              }
              {' '} x {' '}
              {
                candidature?.price + ' ' + t('MAD')
              }
            </p>
          </div>
        </div>
        {/* Total */}
        <div className="p-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">
            {t('check_out_page.total')}
          </p>
          <p className="text-lg font-bold text-gray-800">
            {Number(total).toFixed(2)} {t('MAD')}
          </p>
        </div>
        {/* confirm & pay */}
        <div className="px-4">
          <button
            onClick={onConfirmOrder}
            disabled={isLoading}
            className={`w-full h-12 flex items-center justify-center gap-2 transition-all text-primary-white rounded-md text-base font-bold ${paymentMethod === 'credit-card' ? 'hover:bg-primary-gray-500 bg-primary-blue' : paymentMethod === 'cash' ? 'hover:bg-primary-gray-500 bg-primary-blue' : 'bg-primary-gray-500'} ${isLoading ? 'cursor-not-allowed bg-primary-gray-500 hover:bg-primary-gray-500' : 'cursor-pointer'}`}
          >
            {
              paymentMethod === 'credit-card' ? <span>
                {t('check_out_page.confirmer_et_payer')}
              </span>
                :
                paymentMethod === 'cash' ? <div>
                  {t('check_out_page.confirmer_et_payer_a_la_livraison')}
                </div>
                  :
                  <div>
                    {t('check_out_page.choisi_une_methode_de_paiement')}
                  </div>
            }
            {isLoading && <BiLoaderAlt className="animate-spin text-white text-xl" />}
          </button>
          <div className="my-3 text-gray-400 gap-1 text-center flex items-center justify-center">
            <IoLockClosed />
            <small className="text-sm font-medium block -mb-[2px]">
              {t('check_out_page.vos_informations_sont_securisees')}
            </small>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default OrderSummary