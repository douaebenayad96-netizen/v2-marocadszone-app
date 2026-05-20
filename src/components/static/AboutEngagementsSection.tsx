import { useTranslation } from "react-i18next"
import { FiCheck } from "react-icons/fi"
import image3 from '../../assets/img/about/image3.jpg'

const AboutEngagementsSection = () => {
  const { t } = useTranslation()

  return (
    <div className="section-py app-container">
      <div className="text-center mb-10">
        <div className="max-w-lg mx-auto mb-8">
          <img
            src={image3}
            alt={t("engagements.pill", { ns: "about" })}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <small className="text-primary-blue font-bold bg-primary-blue bg-opacity-10 px-2 py-1 rounded-lg inline-block mb-2">
          {t("engagements.pill", { ns: "about" })}
        </small>
        <h2 className="title-h2 text-blue-950 font-bold">{t("engagements.title", { ns: "about" })}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("engagements.card1_title", { ns: "about" })}</h3>
          <p className="text-gray-600">{t("engagements.card1_p", { ns: "about" })}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("engagements.card2_title", { ns: "about" })}</h3>
          <p className="text-gray-600">{t("engagements.card2_p", { ns: "about" })}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("engagements.card3_title", { ns: "about" })}</h3>
          <p className="text-gray-600">{t("engagements.card3_p", { ns: "about" })}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("engagements.card4_title", { ns: "about" })}</h3>
          <p className="text-gray-600">{t("engagements.card4_p", { ns: "about" })}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutEngagementsSection
