import { useTranslation } from 'react-i18next'
import { GoArrowUpRight } from 'react-icons/go'
import { LuPlus, LuMinus } from 'react-icons/lu'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { add, getDay, isSameDay, startOfToday } from 'date-fns'

import { Prestation } from '../../services/types/prestation'
import { useAuthStore } from '../../services/store/authStore'
import { useLoginModelStore } from '../../services/store/LoginModelStore'
import CustomToast from '../common/CustomToast'
import { CheckoutState } from '../../services/types/checkout'
import SampleButton from '../ui/SampleButton'
import Calendar from '../common/Calendar'

type OrderBoxProps = {
  prestation: Prestation
}

const OrderBox = ({ prestation }: OrderBoxProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'ar' | 'fr' | 'en'
  const calendarRef = useRef<HTMLDivElement>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const openLoginModel = useLoginModelStore(state => state.openLoginModel)
  const [count, setCount] = useState(1)
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const availableDays = useMemo(() => {
    return prestation?.prestataire?.availability_days?.map(day => parseInt(day)) || [];
  }, [prestation])

  useEffect(() => {
    if (availableDays.length > 0) {
      let nextAvailableDay = selectedDay;

      // Find the next available day
      while (!availableDays.includes((getDay(nextAvailableDay) + 6) % 7)) {
        nextAvailableDay = add(nextAvailableDay, { days: 1 });
      }

      // Set the next available day as the selected day only if it has changed
      if (!isSameDay(nextAvailableDay, selectedDay)) {
        setSelectedDay(nextAvailableDay);
      }
    }
  }, [availableDays, selectedDay])

  useEffect(() => {
    function handleClickOutsideCalendar(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideCalendar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCalendar);
    };
  }, [])

  // handle confirm order
  function handleConfirmOrder() {
    if (!user) {
      openLoginModel()
      CustomToast(t('vous_devez_vous_connecter_pour_continuer'), 'info')
      return
    }
    // Passing data to the next page
    const data: CheckoutState = {
      prestation,
      date: selectedDay,
      number: count
    }
    navigate('/payments', { state: data })
  }

  // handle Decrement
  function handleDecrement() {
    if (count === 1) return
    setCount(prev => prev - 1)
  }

  // handle Increment
  function handleIncrement() {
    if (prestation?.tarification === 'Heures' && count === 8) return
    if (prestation?.tarification === 'Jours' && count === 3) return
    if (prestation?.tarification === 'Service' && count === 1) return
    setCount(prev => prev + 1)
  }

  return (
    <div className='select-none'>
      <div
        className='shadow-card-sm rounded-md bg-white p-4'
      >
        <div>
          <h2
            className='text-xl font-bold text-gray-900'
          >
            {Math.floor(prestation?.price)} {t('MAD')}
          </h2>
          <div
            className='text-gray-700'
          >
            {t('service_page.prix_de_base')}
          </div>
        </div>
        <div className='mt-4'>
          <div
            className='border border-gray-300 rounded-md px-4 py-2'
          >
            <div className='flex justify-between items-center'>
              <div>
                <div
                  className='text-gray-700 font-semibold'
                >
                  {t('service_page.date_de_livraison')}
                </div>
                <div>
                  {selectedDay ? selectedDay.toLocaleDateString() : t('choisir_une_date.choisir_une_date')}
                </div>
              </div>
              <div className='relative'>
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  tabIndex={0}
                >
                  <SampleButton
                    text={t('changer')}
                  />
                </div>
                {/* calendar */}
                <AnimatePresence>
                  {
                    showCalendar && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        ref={calendarRef}
                        className={`z-10 absolute top-[-14px] ${lang === 'ar' ? 'left-[-17px]' : 'right-[-17px]'}`}
                      >
                        <Calendar
                          setSelectedDay={setSelectedDay}
                          selectedDay={selectedDay}
                          today={today}
                          rtl={lang === 'ar'}
                          lang={lang}
                          availableDays={availableDays}
                        />
                      </motion.div>
                    )
                  }
                </AnimatePresence>
              </div>
            </div>
            {/* line */}
            <div
              className='my-2 border-b border-gray-300'
            />
            <div
              className='flex justify-between items-center'
            >
              <div>
                <div
                  className='text-gray-700 font-semibold'
                >
                  {prestation?.tarification === 'Service' ? t('duree') : t('choisir_les_options')}
                </div>
                <div>
                  {count} {prestation?.tarification === 'Heures' ? count > 1 ? t('heures') : t('heure') : count > 1 ? t('jours') : t('jour')}
                </div>
              </div>
              {
                prestation?.tarification != 'Service' && (
                  <div>
                    <div
                      className='flex items-center'
                    >
                      <div
                        onClick={() => handleDecrement()}
                        className={`p-1.5 rounded-full border border-border-gray-300 transition-all duration-200 cursor-pointer ${count === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                      >
                        <LuMinus />
                      </div>
                      <div
                        className='mx-3 text-gray-700 font-semibold select-none'
                      >
                        {count}
                      </div>
                      <div
                        onClick={() => handleIncrement()}
                        className={`p-1.5 rounded-full border border-border-gray-300 transition-all duration-200 cursor-pointer ${prestation?.tarification === 'Heures' && count === 8 ? 'opacity-50 cursor-not-allowed' : prestation?.tarification === 'Jours' && count === 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                      >
                        <LuPlus />
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div
          className='mt-4'
        >
          <button
            onClick={handleConfirmOrder}
            className='w-full btn-primary'
          >
            {t('commander_maintenant')}
            <GoArrowUpRight className={`text-xl ${lang === 'ar' ? 'transform -rotate-90' : ''}`}
            />
          </button>
        </div>
        {/* will not charge you yet */}
        <div
          className='mt-4 text-gray-700 text-sm text-center'
        >
          {t('will_not_charge_you_yet')}
        </div>
      </div>
    </div>
  )
}

export default OrderBox