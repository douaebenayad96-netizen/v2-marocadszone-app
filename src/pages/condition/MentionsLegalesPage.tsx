import PageHeader from "../../components/layouts/PageHeader"

const MentionsLegalesPage = () => {
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
                MENTIONS LÉGALES
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
              <p className="text-gray-700 leading-relaxed mb-4">
                Conformément aux dispositions des articles 6-III et 19 de la Loi n° 04-09 relative aux échanges électroniques de données juridiques au Maroc, nous vous présentons les informations légales concernant notre site MarocAdsZone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
              <div className="text-gray-700 leading-relaxed space-y-2">
                <p><strong>Raison sociale :</strong> MarocAdsZone SARL</p>
                <p><strong>Forme juridique :</strong> Société à Responsabilité Limitée</p>
                <p><strong>Capital social :</strong> 100 000,00 MAD</p>
                <p><strong>Email :</strong> <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline">contact@marocadszone.com</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Le site MarocAdsZone, comprenant sa structure, ses textes, images, photographies, logos, codes informatiques, illustrations et graphismes, est la propriété exclusive de MarocAdsZone SARL.
                </p>
                <p>
                  Toute reproduction, représentation, modification ou adaptation de tout ou partie des éléments du site, quel que soit le moyen utilisé, est interdite sans l'autorisation écrite préalable de MarocAdsZone.
                </p>
                <p>
                  Toute utilisation non autorisée du site ou de l'un de ses éléments sera considérée comme constitutive d'une contrefaçon et pourra être poursuivie conformément aux dispositions du Code de la propriété intellectuelle.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Liens hypertextes</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  Le site MarocAdsZone peut contenir des liens vers d'autres sites ou ressources disponibles sur Internet. MarocAdsZone n'exerce aucun contrôle sur ces sites externes et décline toute responsabilité quant à leur contenu ou leur disponibilité.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilité</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  Les informations présentes sur le site MarocAdsZone sont réputées fiables mais ne garantissent pas qu'elles soient exemptes d'erreurs, d'omissions ou d'inexactitudes.
                </p>
                <p>
                  Le site est régulièrement mis à jour, cependant des erreurs peuvent survenir. Les utilisateurs sont invités à signaler tout contenu inexact à : <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline">contact@marocadszone.com</a>.
                </p>
                <p>
                  MarocAdsZone ne peut être tenue responsable des dommages directs ou indirects liés à l'utilisation du site.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Loi applicable et juridiction compétente</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  Les présentes mentions légales sont régies par le droit marocain. En cas de litige, les tribunaux de Casablanca seront seuls compétents.
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question relative à ces mentions légales, vous pouvez nous contacter par email : 
                  <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline ml-1">contact@marocadszone.com</a>
                </p>
              </section>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Navigation :</strong> Pour consulter d'autres documents légaux, visitez nos 
                <a href="/terms" className="text-blue-600 hover:underline mx-1">Conditions Générales d'Utilisation</a>, 
                notre <a href="/terms/privacy" className="text-blue-600 hover:underline mx-1">Politique de Confidentialité</a>, 
                ou notre <a href="/terms/cookies" className="text-blue-600 hover:underline mx-1">Politique de Cookies</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentionsLegalesPage
