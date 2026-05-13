import PageHeader from "../../components/layouts/PageHeader"

const TermsOfCookies = () => {
  return (
    <div className="pt-nav">
      <div className="min-h-screen page-py page-pt-sm">
        <div className="app-container">
          {/* page header */}
          <PageHeader>
            {/* title */}
            <div>
              <h1
                className="text-5xl text-primary-blue font-bold"
              >
                POLITIQUE DE COOKIES
              </h1>
              <div>
                <span
                  className="text-base text-gray-400"
                >
                  MarocAdsZone - Date de dernière mise à jour : 3 juillet 2025
                </span>
              </div>
            </div>
          </PageHeader>
        </div>
        <div className="section-py app-container prose max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Qu'est-ce qu'un cookie ?</h2>
              <p className="text-gray-700 leading-relaxed">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lorsque vous visitez le site MarocAdsZone. Ces cookies permettent de vous reconnaître lors de vos visites, de vous proposer une navigation personnalisée et d'analyser le trafic pour améliorer nos services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Les cookies que nous utilisons</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies strictement nécessaires</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Ces cookies sont essentiels au fonctionnement du site et à l'utilisation de ses fonctionnalités de base (connexion, sécurité, préférences). Sans ces cookies, certaines fonctionnalités du site peuvent ne pas fonctionner correctement.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Exemples :</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Cookies de session pour gérer la connexion des utilisateurs</li>
                  <li>Cookies de sécurité pour protéger les comptes</li>
                  <li>Cookies liés aux préférences de confidentialité</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies de performance</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Ces cookies nous permettent de mesurer l'audience et d'améliorer les performances de MarocAdsZone en analysant l'utilisation que vous faites du site (pages visitées, temps passé, erreurs rencontrées). Les données collectées sont agrégées et anonymisées.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Exemples :</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Google Analytics</li>
                  <li>Matomo</li>
                  <li>Outils de suivi des performances du site</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies de fonctionnalité</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Ces cookies permettent de mémoriser vos choix et préférences sur le site pour vous offrir une expérience personnalisée (langue, préférences d'affichage, filtres de recherche).
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Exemples :</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Cookies de langue et de localisation</li>
                  <li>Cookies de mémorisation des recherches récentes</li>
                  <li>Cookies de personnalisation des annonces consultées</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cookies de ciblage et publicitaires</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Ces cookies peuvent être placés sur notre site par nos partenaires publicitaires afin de vous proposer des publicités pertinentes en fonction de vos centres d'intérêt. Ces cookies permettent également de mesurer l'efficacité des campagnes publicitaires.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Exemples :</p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Google Ads</li>
                  <li>Facebook Pixel</li>
                  <li>Cookies des réseaux sociaux</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion des cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Lors de votre première visite sur MarocAdsZone, un bandeau cookies vous permet de gérer vos préférences. Vous pouvez à tout moment :
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-3">
                <li>Accepter ou refuser tout ou partie des cookies</li>
                <li>Modifier vos choix via les paramètres de votre navigateur</li>
                <li>Supprimer les cookies déjà installés sur votre appareil</li>
              </ul>
              <p className="text-red-600 font-medium">
                Attention : Le refus de certains cookies peut impacter le bon fonctionnement de certaines fonctionnalités du site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Durée de conservation des cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Les cookies sont conservés pour une durée maximale de 13 mois après leur dépôt sur votre terminal.
              </p>
            </section>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Navigation :</strong> Pour consulter d'autres documents légaux, visitez nos 
                <a href="/mentions-legales" className="text-blue-600 hover:underline mx-1">Mentions Légales</a>, 
                nos <a href="/terms" className="text-blue-600 hover:underline mx-1">Conditions Générales d'Utilisation</a>, 
                ou notre <a href="/terms/privacy" className="text-blue-600 hover:underline mx-1">Politique de Confidentialité</a>.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question concernant cette Politique de Cookies ou pour exercer vos droits relatifs à vos données personnelles, vous pouvez nous contacter à :
                  <br />📧 <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline">contact@marocadszone.com</a>
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