import { IoIosArrowBack } from 'react-icons/io'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday
} from 'date-fns'
import arLocale from 'date-fns/locale/ar'
import frLocale from 'date-fns/locale/fr'
import { useState } from 'react'
import { motion } from 'framer-motion'

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(' ')
}

type CalendarProps = {
  today: Date
  selectedDay: Date
  setSelectedDay: (day: Date) => void
  rtl: boolean
  lang: 'ar' | 'fr' | 'en'
  availableDays: number[]
}

const Calendar = ({ today, selectedDay, setSelectedDay, rtl, lang, availableDays }: CalendarProps) => {
  const todayMonth = format(today, 'MMM-yyyy')
  const [currentMonth, setCurrentMonth] = useState(format(selectedDay, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    const isPastDay = parse(format(firstDayCurrentMonth, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date()) < startOfToday()
    if (isPastDay) return
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <>
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-gray-900 capitalize">
            {
              lang === 'ar' ? format(firstDayCurrentMonth, 'MMMM yyyy', { locale: arLocale }) : lang === 'fr' ? format(firstDayCurrentMonth, 'MMMM yyyy', { locale: frLocale }) : format(firstDayCurrentMonth, 'MMMM yyyy')
            }
          </h2>
          <button
            type="button"
            onClick={previousMonth}
            className={`-my-1.5 ${rtl && 'rotate-180'} flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 ${currentMonth === todayMonth && 'opacity-0'}`}
          >
            <span className="sr-only">Previous month</span>
            <IoIosArrowBack className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={nextMonth}
            type="button"
            className={`-my-1.5  ${rtl && 'rotate-180'} -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500`}
          >
            <span className="sr-only">Next month</span>
            <IoIosArrowBack className="w-5 h-5 transform rotate-180" aria-hidden="true" />
          </button>
        </div>
        <div className="grid grid-cols-7 mt-10 text-sm leading-6 text-center text-primary-blue-all-800 font-semibold">
          <div>
            {
              lang === 'ar' ? 'الإثن' : lang === 'fr' ? 'Lu' : 'Mo'
            }
          </div>
          <div>
            {
              lang === 'ar' ? 'الثل' : lang === 'fr' ? 'Ma' : 'Tu'
            }
          </div>
          <div>
            {
              lang === 'ar' ? 'الأرب' : lang === 'fr' ? 'Me' : 'We'
            }
          </div>
          <div>
            {
              lang === 'ar' ? 'الخ' : lang === 'fr' ? 'Je' : 'Th'
            }
          </div>
          <div>
            {
              lang === 'ar' ? 'الج' : lang === 'fr' ? 'Ve' : 'Fr'
            }
          </div>
          <div>
            {
              lang === 'ar' ? 'الس' : lang === 'fr' ? 'Sa' : 'Sa'
            }
          </div>
          <div>
            {
              lang === 'ar' ? 'الأح' : lang === 'fr' ? 'Di' : 'Su'
            }
          </div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => {
            const isPastDay = parse(format(day, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date()) < startOfToday()
            const isAvailableDay = availableDays.length === 0 || availableDays.includes((getDay(day) + 6) % 7)
            
            return (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day) - 1],
                  'py-1.5'
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isPastDay || !isAvailableDay) return
                    setSelectedDay(day)
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && 'text-white',
                    !isEqual(day, selectedDay) && isToday(day) && 'text-primary-blue-all-800',
                    !isEqual(day, selectedDay) && (isPastDay || !isAvailableDay) && 'bg-gray-100 cursor-not-allowed', // Apply gray color to past days
                    !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                    !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                    isEqual(day, selectedDay) && isToday(day) && 'bg-primary-blue-all-800',
                    isEqual(day, selectedDay) && !isToday(day) && 'bg-primary-blue-all-800',
                    !isEqual(day, selectedDay) && !isPastDay && isAvailableDay && 'hover:bg-gray-200',
                    (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                  )}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Calendar

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]