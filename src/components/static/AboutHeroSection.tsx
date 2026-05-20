import { useTranslation } from "react-i18next"
import PageHeader from "../layouts/PageHeader"

const AboutHeroSection = () => {
  const { t } = useTranslation()

  return (
    <div className="app-container pt-nav">
      <div className="page-pt-sm">
        <PageHeader>
          {/* title */}
          <div>
            <h1 className="text-3xl text-primary-blue font-bold">{t("about_page.title", { ns: "about" })}</h1>
            <div>
              <span className="text-base text-gray-400">{t("about_page.subtitle", { ns: "about" })}</span>
            </div>
          </div>
        </PageHeader>
      </div>
    </div>
  )
}

export default AboutHeroSection

