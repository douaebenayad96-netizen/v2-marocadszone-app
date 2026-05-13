import { useTranslation } from "react-i18next"

type PageHeaderProps = {
  children: React.ReactNode
}

const PageHeader = ({ children }: PageHeaderProps) => {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 md:p-8 bg-no-repeat ${lang != "ar" && "bg-half-circle bg-right-top bg-contain "}`}
    >
      {children}
    </div>
  )
}

export default PageHeader