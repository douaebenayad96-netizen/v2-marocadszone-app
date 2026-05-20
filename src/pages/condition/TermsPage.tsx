import { useState } from "react"
import { useTranslation } from "react-i18next"
import PageHeader from "../../components/layouts/PageHeader"
import { Link } from "react-router-dom"

const TermsPage = () => {
  const { t } = useTranslation("terms")
  const [activeSection, setActiveSection] = useState("general")

  const navItems = [
    { key: "general", label: t("terms.navigation.general") },
    { key: "privacy", label: t("terms.navigation.privacy") },
    { key: "cookies", label: t("terms.navigation.cookies") },
    { key: "mentions", label: t("terms.navigation.mentions") },
  ]

  return (
    <div className="pt-nav">
      <div className="min-h-screen page-py page-pt-sm">
        <div className="app-container">
          <PageHeader>
            <div>
              <h1 className="text-5xl text-primary-blue font-bold">
                {t("terms.title")}
              </h1>
              <div>
                <span className="text-base text-gray-400">
                  {t("terms.updated_at")}
                </span>
              </div>
            </div>
          </PageHeader>

          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <nav className="flex flex-wrap gap-4">
              {navItems.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    activeSection === key
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="section-py app-container prose max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">

            {/* ==================== SECTION CONDITIONS GÉNÉRALES ==================== */}
            {activeSection === "general" && (
              <div className="space-y-8">
                <section>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("terms.title")}</h1>
                  <p className="text-gray-700 leading-relaxed">{t("terms.updated_at")}</p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("preamble.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("preamble.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article1.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article1.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article2.title")}</h2>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
                    <li>{t("article2.site")}</li>
                    <li>{t("article2.user")}</li>
                    <li>{t("article2.services")}</li>
                    <li>{t("article2.advertiser")}</li>
                    <li>{t("article2.content")}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article3.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article3.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article4.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article4.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article5.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article5.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article6.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article6.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article7.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article7.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article8.title")}</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">{t("article8.intro")}</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
                    <li>{t("article8.item0")}</li>
                    <li>{t("article8.item1")}</li>
                    <li>{t("article8.item2")}</li>
                    <li>{t("article8.item3")}</li>
                    <li>{t("article8.item4")}</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article9.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article9.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article10.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article10.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article11.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article11.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article12.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article12.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("article13.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("article13.content")}</p>
                </section>

                <div className="border-t border-gray-200 pt-6">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("contact.title")}</h2>
                    <p className="text-gray-700 leading-relaxed">{t("contact.content")}</p>
                  </section>
                </div>
              </div>
            )}

            {/* ==================== SECTION POLITIQUE DE CONFIDENTIALITÉ ==================== */}
{activeSection === "privacy" && (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900">{t("privacy.title")}</h1>
    <p className="text-gray-700 leading-relaxed">{t("privacy.subtitle")} - {t("privacy.updated_at")}</p>

    {/* Introduction */}
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.intro.title")}</h2>
      <p className="text-gray-700 leading-relaxed">{t("privacy.intro.content")}</p>
    </section>

    {/* Article 1 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article1.title")}</h2>
      <p className="text-gray-700 leading-relaxed">{t("privacy.article1.content")}</p>
    </section>

    {/* Article 2 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article2.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-3">{t("privacy.article2.content")}</p>
      
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{t("privacy.article2.advertisers")}</h4>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-4">
        {t("privacy.article2.advertisers_list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{t("privacy.article2.visitors")}</h4>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
        {t("privacy.article2.visitors_list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>

    {/* Article 3 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article3.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-3">{t("privacy.article3.content")}</p>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
        {t("privacy.article3.list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>

    {/* Article 4 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article4.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-3">{t("privacy.article4.content")}</p>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
        {t("privacy.article4.list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>

    {/* Article 5 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article5.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-2">{t("privacy.article5.account")}</p>
      <p className="text-gray-700 leading-relaxed mb-2">{t("privacy.article5.ads")}</p>
      <p className="text-gray-700 leading-relaxed mb-2">{t("privacy.article5.billing")}</p>
      <p className="text-gray-700 leading-relaxed mb-2">{t("privacy.article5.navigation")}</p>
      <p className="text-gray-700 leading-relaxed">{t("privacy.article5.after")}</p>
    </section>

    {/* Article 6 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article6.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-3">{t("privacy.article6.content")}</p>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
        {t("privacy.article6.list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>

    {/* Article 7 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article7.title")}</h2>
      <p className="text-gray-700 leading-relaxed">{t("privacy.article7.content")}</p>
    </section>

    {/* Article 8 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article8.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-3">{t("privacy.article8.content")}</p>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-4">
        {t("privacy.article8.list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="text-gray-700 leading-relaxed">{t("privacy.article8.contact")}</p>
    </section>

    {/* Article 9 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article9.title")}</h2>
      <p className="text-gray-700 leading-relaxed mb-3">{t("privacy.article9.content")}</p>
      <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
        {t("privacy.article9.list", { returnObjects: true }).map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>

    {/* Article 10 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article10.title")}</h2>
      <p className="text-gray-700 leading-relaxed">{t("privacy.article10.content")}</p>
    </section>

    {/* Article 11 */}
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.article11.title")}</h2>
      <p className="text-gray-700 leading-relaxed">{t("privacy.article11.content")}</p>
    </section>

    {/* Contact */}
    <div className="border-t border-gray-200 pt-6">
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-3">{t("privacy.contact.title")}</h2>
        <p className="text-gray-700 leading-relaxed">{t("privacy.contact.content")}</p>
      </section>
    </div>
  </div>
)}

            {/* ==================== SECTION POLITIQUE DE COOKIES ==================== */}
            {activeSection === "cookies" && (
              <div className="space-y-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t("cookies:page.title")}</h1>

                <p className="text-gray-700 leading-relaxed">{t("cookies:page.updated_at")}</p>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies:what_is_cookie.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("cookies:what_is_cookie.content")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies:cookies_we_use.title")}</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("cookies:cookies_we_use.necessary.title")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{t("cookies:cookies_we_use.necessary.description")}</p>
                    <p className="text-gray-700 font-medium mb-2">{t("cookies:cookies_we_use.necessary.examples_title")}</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      {t("cookies:cookies_we_use.necessary.examples", { returnObjects: true }).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("cookies:cookies_we_use.performance.title")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{t("cookies:cookies_we_use.performance.description")}</p>
                    <p className="text-gray-700 font-medium mb-2">{t("cookies:cookies_we_use.performance.examples_title")}</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      {t("cookies:cookies_we_use.performance.examples", { returnObjects: true }).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("cookies:cookies_we_use.functional.title")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{t("cookies:cookies_we_use.functional.description")}</p>
                    <p className="text-gray-700 font-medium mb-2">{t("cookies:cookies_we_use.functional.examples_title")}</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      {t("cookies:cookies_we_use.functional.examples", { returnObjects: true }).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("cookies:cookies_we_use.advertising.title")}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{t("cookies:cookies_we_use.advertising.description")}</p>
                    <p className="text-gray-700 font-medium mb-2">{t("cookies:cookies_we_use.advertising.examples_title")}</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      {t("cookies:cookies_we_use.advertising.examples", { returnObjects: true }).map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies:management.title")}</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">{t("cookies:management.description")}</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-3">
                    {t("cookies:management.items", { returnObjects: true }).map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-red-600 font-medium">{t("cookies:management.warning")}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies:duration.title")}</h2>
                  <p className="text-gray-700 leading-relaxed">{t("cookies:duration.content")}</p>
                </section>

                <div className="border-t border-gray-200 pt-6">
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("cookies:contact.title")}</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {t("cookies:contact.content")}
                      <br />📧 <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline">contact@marocadszone.com</a>
                    </p>
                  </section>
                </div>
              </div>
            )}

           {/* ==================== SECTION MENTIONS LÉGALES ==================== */}
{activeSection === "mentions" && (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold text-gray-900">{t("mentions:page.title")}</h1>
    <p className="text-gray-700 leading-relaxed">{t("mentions:page.updated_at")}</p>

    <section>
      <p className="text-gray-700 leading-relaxed">{t("mentions:intro.description")}</p>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mentions:publisher.title")}</h2>
      <div className="text-gray-700 space-y-2">
        <p><strong>{t("mentions:publisher.company")} :</strong> DEVTI GROUP SARL</p>
        <p><strong>{t("mentions:publisher.legal_form")} :</strong> Société à Responsabilité Limitée</p>
        <p><strong>{t("mentions:publisher.capital")} :</strong> 100 000,00 MAD</p>
        <p><strong>Email :</strong> support@devtigroup.com</p>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mentions:property.title")}</h2>
      <div className="text-gray-700 space-y-3">
        <p>{t("mentions:property.paragraph1")}</p>
        <p>{t("mentions:property.paragraph2")}</p>
        <p>{t("mentions:property.paragraph3")}</p>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mentions:links.title")}</h2>
      <p className="text-gray-700">{t("mentions:links.description")}</p>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mentions:responsibility.title")}</h2>
      <div className="text-gray-700 space-y-3">
        <p>{t("mentions:responsibility.paragraph1")}</p>
        <p>{t("mentions:responsibility.paragraph2")}</p>
        <p>{t("mentions:responsibility.paragraph3")}</p>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mentions:law.title")}</h2>
      <p className="text-gray-700">{t("mentions:law.description")}</p>
    </section>

    <div className="border-t border-gray-200 pt-6">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("mentions:contact.title")}</h2>
        <p className="text-gray-700">{t("mentions:contact.description")}</p>
      </section>
    </div>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage