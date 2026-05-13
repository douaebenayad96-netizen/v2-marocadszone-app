import { motion } from "framer-motion"
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa"
import { IoMdStar } from "react-icons/io"
import { useTranslation } from "react-i18next"

import Icon2hours from "../assets/icons/time-2hours.png"
import Icon4hours from "../assets/icons/time-4hours.png"
import Icon6hours from "../assets/icons/time-6hours.png"
import StepSectionHeader from "../common/StepSectionHeader"
import { cn } from "../../utils/helpers"

type HoursCardProps = {
  icon: string
  hour: number
  labelHour: string
  title: string
  subtitle: string
  selectedHour: number
  setHour?: (hour: number) => void
  isPopular?: boolean
}

type HoursSelectStepProps = {
  hour: number
  setHour: (hour: number) => void
}

const HoursSelectStep = ({ hour, setHour }: HoursSelectStepProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.select_hours.title')}
        subtitle={t('post_job_form.select_hours.subtitle')}
      />
      <div className="overflow-x-auto sm:overflow-x-visible">
        <div
          className="flex sm:grid grid-cols-3 gap-4"
        >
          <HourCard
            icon={Icon2hours}
            hour={2}
            labelHour="2h00"
            title={t('post_job_form.select_hours.court')}
            subtitle={t('post_job_form.select_hours.short_example')}
            selectedHour={hour}
            setHour={(hour) => {
              setHour(hour)
            }}
          />
          <HourCard
            icon={Icon4hours}
            hour={4}
            labelHour="4h00"
            title={t('post_job_form.select_hours.moyen')}
            subtitle={t('post_job_form.select_hours.medium_example')}
            selectedHour={hour}
            setHour={(hour) => {
              setHour(hour)
            }}
          />
          <HourCard
            icon={Icon6hours}
            hour={6}
            labelHour="6h00"
            title={t('post_job_form.select_hours.long')}
            subtitle={t('post_job_form.select_hours.long_example')}
            selectedHour={hour}
            setHour={(hour) => {
              setHour(hour)
            }}
          />
        </div>
      </div>
      {/* or */}
      <div
        className="flex items-center justify-center gap-2 mt-6"
      >
        <div
          className="border-b border-gray-300 w-full"
        />
        <span
          className="text-gray-500"
        >
          {t('ou')}
        </span>
        <div
          className="border-b border-gray-300 w-full"
        />
      </div>
      {/* custom hours */}
      <div
        className="py-6"
      >
        <small
          className="text-gray-500 block text-center my-2"
        >
          {
            t('post_job_form.select_hours.custom_hours')
          }
        </small>
        <div className="shadow-card-shadow-border w-fit mx-auto rounded-lg px-4 py-2 flex items-center gap-8 justify-between">
          <button
            onClick={() => {
              if (hour > 1) {
                setHour(hour - 1)
              }
            }}
            className="plus-minus-btn"
          >
            <FaMinus />
          </button>
          <div
            className="text-2xl font-bold"
          >
            {hour}h00
          </div>
          <button
            onClick={() => {
              // max 248 hours
              if (hour < 248) {
                setHour(hour + 1)
              }
            }}
            className="plus-minus-btn"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const HourCard = ({ icon, title, labelHour, subtitle, hour, selectedHour, setHour, isPopular }: HoursCardProps) => {

  return (
    <div
      className="space-y-2 min-w-[150px]"
      onClick={() => {
        setHour && setHour(hour)
      }}
    >
      <button
        className={cn(
          'flex w-full items-center relative justify-center flex-col gap-2 aspect-square hover:bg-gray-50 transition-all rounded-lg bg-white',
          selectedHour === hour ? "border-2 border-blue-600" : "border border-gray-300 hover:border-gray-400"
        )}
      >
        <div>
          <img
            src={icon}
            alt={labelHour}
          />
        </div>
        <h4
          className="text-2xl font-bold"
        >
          {labelHour}
        </h4>
        {/* check icon */}
        {selectedHour === hour && (
          <div
            className="absolute top-0 right-0 bg-blue-600 rounded-full text-white p-[3px] border-4 border-white transform translate-x-1.5 -translate-y-1.5 transition-all duration-300 ease-in-out"
          >
            <FaCheck />
          </div>
        )}
        {/* popular */}
        {isPopular && (
          <div
            className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 bg-orange-400 rounded-full text-black px-2 py-1 text-sm font-semibold flex items-center gap-1"
          >
            <IoMdStar
              className="text-lg"
            />
            <span>Populaire</span>
          </div>
        )}
      </button>
      <div className="w-full">
        <p
          className="text-base font-semibold"
        >
          {title}
        </p>
        <small>
          {subtitle}
        </small>
      </div>
    </div>
  )
}

export default HoursSelectStep