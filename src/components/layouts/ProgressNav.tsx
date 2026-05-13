import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useTranslation } from "react-i18next"

import { cn } from "../../utils/helpers"
import { ProgressSteps } from "../../pages/StepsRegister"

type ProgressNavProps = {
  step: number
  setStep: (step: ProgressSteps) => void
  stopThisStep?: boolean
  showOtherText?: boolean
  otherText?: string
  handleSubmit: () => void
  isThereUser: boolean
  isLoading?: boolean
}

const ProgressNav = ({ step, setStep, stopThisStep, showOtherText, otherText, handleSubmit, isThereUser, isLoading }: ProgressNavProps) => {
  const { t } = useTranslation()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white shadow-card-sm p-4"
    >
      <div
        className="flex justify-between container-post-page font-semibold"
      >
        <button
          onClick={() => {
            if (step > 0) {
              setStep(step - 1 as ProgressSteps)
            }
          }}
          className={`px-4 py-3 border rounded-md ${step === 0 ? 'cursor-not-allowed text-gray-500 border-gray-200' : 'text-primary-blue-all-800 border-gray-400'}`}
        >
          {t('previous')}
        </button>
        <button
          onClick={() => {
            handleSubmit()
            if (stopThisStep) return
            if (!isThereUser && step === 3) {
              setStep(3)
              return
            }
            if (step < 3) {
              setStep(step + 1 as ProgressSteps)
            }
          }}
          disabled={isLoading}
          className={cn(
            'px-4 py-3 btn-primary text-white rounded-md',
            (stopThisStep || isLoading) && 'notAllowed'
          )}
        >
          {
            showOtherText ? otherText : step === 3 && isThereUser ? t('publish') : step === 3 ? t('publish') : t('next')
          }
          {
            isLoading && (
              <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2" />
            )
          }
        </button>
      </div>
    </div>
  )
}

export default ProgressNav