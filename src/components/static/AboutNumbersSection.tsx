import { useTranslation } from "react-i18next"

const AboutNumbersSection = () => {
  const { t } = useTranslation()

  return (
    <div className="section-py app-container">
      <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-gray-800">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-4xl font-semibold text-gray-800">+8,000</p>
          <p className="text-base text-gray-500">{t("numbers.active_ads", { ns: "about" })}</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-4xl font-semibold text-gray-800">70,000+</p>
          <p className="text-base text-gray-500">{t("numbers.monthly_users", { ns: "about" })}</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-4xl font-semibold text-gray-800">3M MAD+</p>
          <p className="text-base text-gray-500">{t("numbers.transactions", { ns: "about" })}</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-4xl font-semibold text-gray-800">2,000+</p>
          <p className="text-base text-gray-500">{t("numbers.active_professionals", { ns: "about" })}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutNumbersSection


