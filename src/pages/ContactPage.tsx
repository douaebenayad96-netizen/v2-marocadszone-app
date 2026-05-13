import { useTranslation } from "react-i18next"
import { HiOutlineHome } from "react-icons/hi"
import { MdOutlinePhone } from "react-icons/md"

import ContactForm from "../components/contact/ContactForm"
import PageHeader from "../components/layouts/PageHeader"
import SEOHead from "../components/seo/SEOHead"

const ContactPage = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-nav">
      <SEOHead title="Contactez-nous - MarocAdsZone" description="Besoin d'aide ? Contactez MarocAdsZone pour toute question sur les annonces gratuites au Maroc. Support rapide." path="/contact" />
      <div className="app-container page-py page-pt-sm">
        {/* page header */}
        <PageHeader>
          {/* title */}
          <div>
            <h1
              className="title-h1"
            >
              {t("contact_page.title")}
            </h1>
            <div>
              <span
                className="text-base text-gray-400"
              >
                {t("contact_page.subtitle")}
              </span>
            </div>
          </div>
        </PageHeader>
        {/* contact form */}
        <div className="mt-8">
          <div>
            {/* contact details */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-row gap-4 items-center shadow-card-sm rounded-lg p-4">
                  <div className="flex items-center justify-center p-4 rounded-full bg-primary-blue">
                    <HiOutlineHome className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold"
                    >
                      {t("adresse")}
                    </h3>
                    <div className="mt-2">
                      <span
                        className="text-base text-gray-400"
                      >
                        Technopark, Tanger 90000
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center shadow-card-sm rounded-lg p-4">
                  <div className="flex items-center justify-center p-4 rounded-full bg-primary-blue">
                    <MdOutlinePhone className="text-white text-2xl" />
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <h3
                      className="text-xl font-bold"
                    >
                      {t("phone")}
                    </h3>
                    <div className="mt-2">
                      <span
                        className="text-base text-gray-400"
                      >
                        +212 6 60 10 46 65
                      </span>
                    </div>
                  </div>
                </div>
                {/* email */}
                <div className="flex flex-row gap-4 items-center shadow-card-sm rounded-lg p-4">
                  <div className="flex items-center justify-center p-4 rounded-full bg-primary-blue">
                    <HiOutlineHome className="text-white text-2xl" />
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <h3
                      className="text-xl font-bold"
                    >
                      {t("email")}
                    </h3>
                    <div className="mt-2">
                      <span
                        className="text-base text-gray-400"
                      >
                        info@marocadszone.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
            {/* form */}
            <div className="flex-1">
              <ContactForm />
            </div>
            {/* map */}
            <div className="flex-1">
              <div className="w-full h-[400px] rounded-lg shadow-card-sm">
                <iframe width="100%" height="100%" scrolling="no" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Technopark%20Tanger%2090000%2C%20Morocco+(MarocAdsZone)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
