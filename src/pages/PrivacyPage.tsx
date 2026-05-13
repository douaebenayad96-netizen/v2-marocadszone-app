import PageHeader from "../components/layouts/PageHeader"

const PrivacyPage = () => {
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
                POLITIQUE DE CONFIDENTIALITÉ
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                La protection de vos données personnelles est une priorité pour MarocAdsZone. La présente Politique de Confidentialité a pour objet de vous informer sur la manière dont nous collectons, utilisons et protégeons vos données lorsque vous utilisez notre plateforme de petites annonces.
              </p>
              <p className="text-gray-700 leading-relaxed">
                En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. Nous vous invitons à la lire attentivement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable du traitement</h2>
              <p className="text-gray-700 leading-relaxed mb-2">MarocAdsZone SARL</p>
              <p className="text-gray-700 leading-relaxed">
                Email : <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline">contact@marocadszone.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types de données collectées</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Dans le cadre de l'utilisation de MarocAdsZone, nous pouvons collecter les données suivantes :</p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pour les annonceurs :</h3>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Données d'identification (nom, prénom, téléphone, adresse email)</li>
                  <li>Informations sur l'annonce (titre, description, images)</li>
                  <li>Données de connexion et de navigation</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pour les visiteurs :</h3>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  <li>Données de navigation et cookies</li>
                  <li>Données fournies via les formulaires de contact</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalités du traitement</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Nous collectons vos données personnelles pour les finalités suivantes :</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Création et gestion de votre compte utilisateur</li>
                <li>Publication et gestion des annonces</li>
                <li>Mise en relation entre annonceurs et visiteurs</li>
                <li>Amélioration de nos services et analyse des performances</li>
                <li>Envoi de communications liées à votre compte ou vos annonces</li>
                <li>Respect des obligations légales et lutte contre la fraude</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base légale du traitement</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Le traitement de vos données est basé sur :</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>L'exécution du contrat lors de l'utilisation de nos services</li>
                <li>Votre consentement, notamment pour l'envoi d'offres promotionnelles</li>
                <li>Nos intérêts légitimes à améliorer nos services</li>
                <li>Le respect de nos obligations légales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Durée de conservation des données</h2>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Données de compte : pendant toute la durée de votre inscription et jusqu'à 3 ans après la dernière activité</li>
                <li>Données d'annonces : pendant la durée de publication et jusqu'à 3 ans après la suppression</li>
                <li>Données de facturation : selon les délais légaux de conservation</li>
                <li>Données de navigation : jusqu'à 13 mois</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">Après ces délais, vos données sont supprimées ou anonymisées</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Destinataires des données</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Vos données peuvent être partagées avec :</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Le personnel habilité de MarocAdsZone</li>
                <li>Nos sous-traitants techniques (hébergement, maintenance)</li>
                <li>Les visiteurs du site pour les données liées aux annonces</li>
                <li>Les autorités administratives et judiciaires si requis par la loi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Transferts de données hors du Maroc</h2>
              <p className="text-gray-700 leading-relaxed">
                Certaines données peuvent être transférées hors du Maroc (par exemple via nos prestataires d'hébergement). Nous veillons à ce que ces transferts soient sécurisés et conformes à la réglementation en vigueur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Vos droits</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Droit d'accès : obtenir une copie de vos données</li>
                <li>Droit de rectification : corriger des données inexactes</li>
                <li>Droit à l'effacement : demander la suppression de vos données</li>
                <li>Droit d'opposition : vous opposer à certains traitements</li>
                <li>Droit à la limitation : restreindre le traitement de vos données</li>
                <li>Droit à la portabilité : recevoir vos données dans un format lisible</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Pour exercer vos droits, contactez-nous par email à : 
                <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline ml-1">contact@marocadszone.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Sécurité des données</h2>
              <p className="text-gray-700 leading-relaxed mb-3">Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données, notamment :</p>
              <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                <li>Chiffrement des données sensibles</li>
                <li>Contrôle des accès aux données</li>
                <li>Sauvegardes régulières</li>
                <li>Sensibilisation du personnel à la confidentialité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Pour plus d'informations sur l'utilisation des cookies, consultez notre <a href="/terms/cookies" className="text-blue-600 hover:underline">Politique de Cookies</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modification de la politique</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous nous réservons le droit de modifier la présente politique à tout moment. Les modifications seront publiées sur cette page et entreront en vigueur immédiatement.
              </p>
            </section>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Navigation :</strong> Pour consulter d'autres documents légaux, visitez nos 
                <a href="/mentions-legales" className="text-blue-600 hover:underline mx-1">Mentions Légales</a>, 
                nos <a href="/terms" className="text-blue-600 hover:underline mx-1">Conditions Générales d'Utilisation</a>, 
                ou notre <a href="/terms/cookies" className="text-blue-600 hover:underline mx-1">Politique de Cookies</a>.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question relative à cette politique ou à vos données personnelles, vous pouvez nous contacter à :
                  <br />Email : <a href="mailto:contact@marocadszone.com" className="text-blue-600 hover:underline">contact@marocadszone.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage