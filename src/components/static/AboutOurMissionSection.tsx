import { useTranslation } from "react-i18next"
import { LuBadgeCheck } from "react-icons/lu"
import image2 from '../../assets/img/about/image2.jpg'

const AboutOurMissionSection = () => {
  const { t } = useTranslation()

  return (
    <section className="section-py app-container">
      <div className="mb-16 rounded-xl overflow-hidden bg-blue-200">
        <div className="w-full grid md:grid-cols-3 grid-cols-1">
          <div className="md:col-span-2">
            <div className="p-8 space-y-4">
              <small className="text-white font-bold bg-primary-blue px-2 py-1 rounded-lg inline-block mb-2">
                {t("mission.pill", { ns: "about" })}
              </small>
              <h2 className="title-h2 text-blue-950 font-bold mb-4">{t("mission.title", { ns: "about" })}</h2>
              <p className="text-gray-500 text-base">{t("mission.p1", { ns: "about" })}</p>
              <p className="text-gray-500 text-base">{t("mission.p2", { ns: "about" })}</p>

              <ul className="mt-20 space-y-8">
                <li className="flex items-center gap-4">
                  <div className="bg-primary-blue p-2 text-2xl rounded-full text-white">
                    <LuBadgeCheck />
                  </div>
                  <div>
                      <h3 className="text-blue-950 font-bold text-lg">{t("mission.card1_title", { ns: "about" })}</h3>
                      <p className="text-gray-500 text-base">{t("mission.card1_p", { ns: "about" })}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-primary-blue p-2 text-2xl rounded-full text-white">
                    <LuBadgeCheck />
                  </div>
                  <div>
                      <h3 className="text-blue-950 font-bold text-lg">{t("mission.card2_title", { ns: "about" })}</h3>
                      <p className="text-gray-500 text-base">{t("mission.card2_p", { ns: "about" })}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="bg-primary-blue p-2 text-2xl rounded-full text-white">
                    <LuBadgeCheck />
                  </div>
                  <div>
                      <h3 className="text-blue-950 font-bold text-lg">{t("mission.card3_title", { ns: "about" })}</h3>
                      <p className="text-gray-500 text-base">{t("mission.card3_p", { ns: "about" })}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative overflow-hidden md:col-span-1">
            <img
              src={image2}
              alt={t("mission.pill", { ns: "about" })}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-10 mb-16">
        <h2 className="text-3xl font-bold text-blue-950 mb-4">{t("mission.cta_title", { ns: "about" })}</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t("mission.cta_p", { ns: "about" })}</p>
        <div className="mt-8">
          <a
            href="/register"
            className="bg-primary-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t("mission.cta_button", { ns: "about" })}
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutOurMissionSection
