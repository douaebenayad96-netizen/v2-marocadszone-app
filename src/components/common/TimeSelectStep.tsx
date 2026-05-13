import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

import StepSectionHeader from "./StepSectionHeader"
import { cn } from "../../utils/helpers"

type TimeSelectStepProps = {
  selectedTime: string
  setSelectedTime: (time: string) => void
}

const TimeSelectStep = ({ selectedTime, setSelectedTime }: TimeSelectStepProps) => {
  const { t } = useTranslation()

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 7; hour <= 21; hour++) {
      for (const minute of ["00", "30"]) {
        const paddedHour = hour.toString().padStart(2, '0');
        const time = `${paddedHour}:${minute}`
        timeSlots.push(
          <button
            onClick={() => setSelectedTime(time)}
            key={time}
            className={cn(
              'px-4 w-full py-2 font-semibold rounded-full border-2 border-transparent bg-gray-200 hover:bg-gray-300',
              selectedTime === time && 'border-primary-blue-all-200 text-primary-blue-all-500 bg-blue-50 hover:bg-blue-100'
            )}
          >
            {time}
          </button>
        )
      }
    }
    return timeSlots
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.time_select_step.title')}
        subtitle={t('post_job_form.time_select_step.subtitle')}
      />
      <div>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2 pb-4"
        >
          {generateTimeSlots()}
        </div>
      </div>
    </motion.div>
  )
}

export default TimeSelectStep