import { useState } from "react"
import { Location, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

// import PaypalSVG from "../components/ui/PaypalSVG"
import usePageDirection from "../hooks/usePageDirection"
import CheckoutHeader from "../components/payment/CheckoutHeader"
import CheckoutFooter from "../components/payment/CheckoutFooter"
import ChangeAddress from "../components/account/ChangeAddress"
import { paymentMethod } from "../services/types/checkout"
import CustomToast from "../components/common/CustomToast"
import { useSaveReservation } from "../services/api/fetchReservation"
import { SaveReservationRequest } from "../services/types/reservation"
import { useAuthStore } from "../services/store/authStore"
import CreditCardForm from "../components/payment/CreditCardForm"
import { TCheckoutState } from "../services/types/checkoutState"
import OrderSummary from "../components/annonce/OrderSummary"

const CheckoutPage = () => {
  usePageDirection()
  const { t } = useTranslation()
  // get data from the previous page
  const { state } = useLocation() as Location<TCheckoutState>
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState<paymentMethod | null>(null)
  const [haveAddress, setHaveAddress] = useState<string | null>(null)
  const { mutateAsync: saveReservation, isLoading } = useSaveReservation()
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)

  // if no state is passed from the previous page
  if (!state) {
    navigate('/404')
    return null
  }

  const handleConfirmOrder = () => {
    // check if the user is logged in
    if (!user || !token || isLoading) return

    // check if the data is passed from the previous page
    if (!state) {
      navigate('/404')
      CustomToast(t('une_erreur_est_survenue'), 'error')
      return
    }

    // check if the payment method is selected
    if (!paymentMethod) {
      CustomToast(t('check_out_page.vous_devez_choisir_une_methode_de_paiement'), 'error')
      return
    }

    // check if there is a address
    if (!haveAddress || haveAddress.length === 0) {
      CustomToast(t('check_out_page.vous_devez_ajouter_une_adresse'), 'error')
      return
    }

    // handle save order
    if (paymentMethod === 'cash') {
      const reservation: SaveReservationRequest = {
        payment_method: 1,
        idDemande: state?.demande?.id,
        idPrestataire: state?.prestataire?.id
      }

      // save reservation
      saveReservation({ reservation, token: token })
        .then(() => {
          navigate('/thank-you')
        }).catch(() => {
          CustomToast(t('une_erreur_est_survenue'), 'error')
        })

      return
    } else if (paymentMethod === 'credit-card') {
      CustomToast('TODO: payment with credit card', 'info')
      return
    } else {
      CustomToast(t('une_erreur_est_survenue'), 'error')
      return
    }
  }

  return (
    <div>
      <CheckoutHeader to={`/job/annonce/${state?.demande?.id}`} />
      <main className="app-container-max-xl flex gap-6 xl:gap-24 py-8 min-h-[calc(100vh-72px)] lg:flex-row flex-col">
        {/* address & payment methods */}
        <div className="flex-1">
          {/* address */}
          <ChangeAddress setHaveAddress={setHaveAddress} haveAddress={haveAddress} state={state} />
          {/* payment methods */}
          <section className="border border-gray-200 rounded-sm mt-5">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h4
                className="title-h4"
              >
                {t('check_out_page.methodes_de_paiement')}
              </h4>
            </div>
            <div>
              {/* a la livraison */}
              <div className="p-4 flex items-center gap-3">
                <label htmlFor="payment-method-2" className="flex items-center gap-3 cursor-pointer w-full">
                  <input
                    onChange={() => setPaymentMethod('cash')}
                    checked={paymentMethod === 'cash'}
                    type="radio"
                    name="payment-method"
                    id="payment-method-2"
                    className="hidden opacity-0 peer" />
                  <span className="rounded-full border-[5px] border-white outline outline-1 outline-gray-200 flex items-center gap-2 peer-checked:border-primary-gray-800 peer-hover:outline-primary-gray-500 peer-checked:outline-primary-gray-500">
                    <span className="w-2 h-2 rounded-full bg-primary-white flex items-center justify-center">
                    </span>
                  </span>
                  <div className="cursor-pointer peer text-base -mb-[2px] font-medium text-gray-800 flex items-center gap-2">
                    <div>
                      {t('check_out_page.a_la_livraison')}
                    </div>
                  </div>
                </label>
              </div>
              {/* Credit & Debit Cards */}
              <div className="p-4">
                <label htmlFor="payment-method-1" className="flex items-center gap-3 cursor-pointer">
                  <input
                    onChange={() => setPaymentMethod('credit-card')}
                    checked={paymentMethod === 'credit-card'}
                    type="radio"
                    name="payment-method"
                    id="payment-method-1"
                    className="hidden opacity-0 peer" />
                  <span className="rounded-full border-[5px] border-white outline outline-1 outline-gray-200 flex items-center gap-2 peer-checked:border-primary-gray-800 peer-hover:outline-primary-gray-500 peer-checked:outline-primary-gray-500">
                    <span className="w-2 h-2 rounded-full bg-primary-white flex items-center justify-center">
                    </span>
                  </span>
                  <div className="cursor-pointer peer text-base -mb-[2px] font-medium text-gray-800 flex items-center gap-2">
                    <div>
                      {t('check_out_page.credit_&_debit_cards')}
                    </div>
                    <div
                      className="flex gap-1"
                    >
                      <div
                        className="w-7 h-7"
                      >
                        <svg
                          className="w-full h-full"
                          xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                          <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"></path><path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"></path>
                        </svg>
                      </div>
                      <div className="w-7 h-7">
                        <svg
                          className="w-full h-full"
                          xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                          <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"></path><path fill="#FFC107" d="M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"></path><path fill="#FF3D00" d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h5.325c0.278-0.636,0.496-1.304,0.637-2h-6.598C20.07,25.354,20,24.686,20,24h7c0-0.686-0.07-1.354-0.201-2h-6.598c0.142-0.696,0.359-1.364,0.637-2h5.325c-0.313-0.716-0.711-1.383-1.176-2h-2.973c0.437-0.58,0.93-1.122,1.481-1.595C21.747,14.909,19.481,14,17,14c-5.523,0-10,4.477-10,10s4.477,10,10,10c3.269,0,6.162-1.575,7.986-4H22.014z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              {/* card form */}
              {
                paymentMethod === 'credit-card' && (
                  <CreditCardForm />
                )
              }
            </div>
          </section>
        </div>
        {/* order summary */}
        <OrderSummary
          paymentMethod={paymentMethod}
          checkoutState={state}
          onConfirmOrder={handleConfirmOrder}
          isLoading={isLoading}
        />
      </main>
      {/* footer */}
      <CheckoutFooter />
    </div>
  )
}

export default CheckoutPage