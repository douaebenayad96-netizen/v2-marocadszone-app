import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/helpers'

type StepSectionHeaderProps = {
  title: string
  subtitle: string
}

const StepSectionHeader = ({ title, subtitle }: StepSectionHeaderProps) => {
  const { i18n } = useTranslation()
  const lang = i18n.language as "fr" | "en" | "ar"

  return (
    <div
      className="py-8"
    >
      <h2 className="title-h2">{title}</h2>
      <p className={cn('text-gray-500',
        lang === 'ar' && 'mt-2'
      )}>{subtitle}</p>
    </div>
  )
}

export default StepSectionHeader