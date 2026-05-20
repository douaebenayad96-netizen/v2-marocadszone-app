import { useTranslation } from "react-i18next"
import PageHeader from "../../components/layouts/PageHeader"
import { Link } from "react-router-dom"

const TermsOfCookies = () => {
  const { t } = useTranslation("cookies")

  return (
    <div className="pt-nav">
      <div className="min-h-screen page-py page-pt-sm">
        <div className="app-container">
          <PageHeader>
            <div>
              <h1 className="text-5xl text-primary-blue font-bold">
                {t("page.title")}
              </h1>
              <div>
                <span className="text-base text-gray-400">
                  {t("page.updated_at")}
                </span>
              </div>
            </div>
          </PageHeader>
        </div>

        <div className="section-py app-container prose max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 space-y-8">

            {/* Qu'est-ce qu'un cookie ? */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("what_is_cookie.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("what_is_cookie.content")}
              </p>
            </section>

            {/* Les cookies que nous utilisons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("cookies_we_use.title")}
              </h2>

              {/* Necessary cookies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("cookies_we_use.necessary.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t("cookies_we_use.necessary.description")}
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t("cookies_we_use.necessary.examples_title")}
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  {t("cookies_we_use.necessary.examples", { returnObjects: true }).map((example: string, idx: number) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>

              {/* Performance cookies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("cookies_we_use.performance.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t("cookies_we_use.performance.description")}
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t("cookies_we_use.performance.examples_title")}
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  {t("cookies_we_use.performance.examples", { returnObjects: true }).map((example: string, idx: number) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>

              {/* Functional cookies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("cookies_we_use.functional.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t("cookies_we_use.functional.description")}
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t("cookies_we_use.functional.examples_title")}
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  {t("cookies_we_use.functional.examples", { returnObjects: true }).map((example: string, idx: number) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>

              {/* Advertising cookies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {t("cookies_we_use.advertising.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t("cookies_we_use.advertising.description")}
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {t("cookies_we_use.advertising.examples_title")}
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  {t("cookies_we_use.advertising.examples", { returnObjects: true }).map((example: string, idx: number) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Gestion des cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("management.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {t("management.description")}
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-3">
                {t("management.items", { returnObjects: true }).map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-red-600 font-medium">
                {t("management.warning")}
              </p>
            </section>

            {/* Durée de conservation */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("duration.title")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t("duration.content")}
              </p>
            </section>

            {/* Navigation links */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{t("navigation_links.title")} :</strong> {t("navigation_links.text")}
                <Link to="/mentions-legales" className="text-blue-600 hover:underline mx-1">
                  {t("navigation_links.mentions")}
                </Link>
                ,
                <Link to="/terms" className="text-blue-600 hover:underline mx-1">
                  {t("navigation_links.terms")}
                </Link>
                ,
                <Link to="/terms/privacy" className="text-blue-600 hover:underline mx-1">
                  {t("navigation_links.privacy")}
                </Link>
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-200 pt-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t("contact.title")}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t("contact.content")}
                  <br />📧 
                  <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline ml-1">
                    contact@marocadszone.com
                  </a>
                </p>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfCookies