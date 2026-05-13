import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"

import StepSectionHeader from "../common/StepSectionHeader"
import StepsCalendar from "./StepsCalendar"
import { ProgressSteps } from "../../pages/StepsRegister"

type DaysSelectStepProps = {
  today: Date
  selectedDay: Date
  setSelectedDay: (date: Date) => void
  setSelectedTime: (time: string) => void
  setStep: (step: ProgressSteps) => void
}

const DaysSelectStep = ({ today, selectedDay, setSelectedDay, setSelectedTime, setStep }: DaysSelectStepProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as "fr" | "en" | "ar"

  const handleImmediate = () => {
    setSelectedDay(today)
    const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    setSelectedTime(time)
    setStep(3)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <StepSectionHeader
        title={t('post_job_form.days_select_step.title')}
        subtitle={t('post_job_form.days_select_step.subtitle')}
      />
      <div>
        <AnimatePresence
          initial={false}
          mode="popLayout"
        >
          {/* btn Immédiatement */}
          <div
            className="flex flex-col items-center justify-center gap-1"
          >
            <p>
              {
                t('post_job_form.days_select_step.immediate')
              }
            </p>
            <button
              onClick={handleImmediate}
              className="btn-ghost py-2 px-4 rounded-md"
            >
              {
                t('post_job_form.days_select_step.immediate_btn')
              }
            </button>
          </div>
          {/* or */}
          <div
            className="flex items-center justify-center gap-2 mt-1"
          >
            <div
              className="border-b border-gray-300 w-full"
            />
            <span
              className="text-gray-500"
            >
              ou
            </span>
            <div
              className="border-b border-gray-300 w-full"
            />
          </div>
          <StepsCalendar
            today={today}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            rtl={lang === "ar"}
            lang={lang}
            availableDays={[]}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default DaysSelectStep