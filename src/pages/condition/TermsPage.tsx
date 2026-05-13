import { useState } from "react"
import PageHeader from "../../components/layouts/PageHeader"

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('general')

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
                CONDITIONS GÉNÉRALES
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
          
          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveSection('general')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'general'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Conditions générales
              </button>
              <button
                onClick={() => setActiveSection('privacy')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'privacy'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Politique de confidentialité
              </button>
              <button
                onClick={() => setActiveSection('cookies')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'cookies'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Politique de cookies
              </button>
              <button
                onClick={() => setActiveSection('mentions')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === 'mentions'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                Mentions Légales
              </button>
            </nav>
          </div>
        </div>
        <div className="section-py app-container prose max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            
            {/* General Conditions Section */}
            {activeSection === 'general' && (
              <div className="whitespace-pre-line">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">CONDITIONS GÉNÉRALES D'UTILISATION</h2>
                <p className="text-gray-700 mb-4">MarocAdsZone</p>
                <p className="text-gray-700 mb-4">Date de dernière mise à jour : 3 juillet 2025</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Préambule</h3>
                <p className="text-gray-700 mb-4">
                  Les présentes Conditions Générales d'Utilisation (ci-après "CGU") définissent le cadre
                  juridique des modalités d'accès et d'utilisation du site MarocAdsZone et des services
                  proposés, ainsi que les droits et obligations des Utilisateurs.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 1 : Informations légales</h3>
                <p className="text-gray-700 mb-4">
                  Le site MarocAdsZone est édité par :
                  Raison sociale : DEVTI GROUP SARL
                  Email : support@devtigroup.com
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 2 : Définitions</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                  <li><strong>Site :</strong> désigne le site web MarocAdsZone accessible à l'adresse [www.marocadszone.com].</li>
                  <li><strong>Utilisateur :</strong> toute personne physique ou morale utilisant le Site.</li>
                  <li><strong>Services :</strong> ensemble des fonctionnalités offertes sur le Site (publication et consultation d'annonces, messagerie interne, création de compte, etc.).</li>
                  <li><strong>Annonceur :</strong> Utilisateur publiant une annonce sur le Site.</li>
                  <li><strong>Contenu :</strong> informations publiées par MarocAdsZone ou les Utilisateurs sur le Site.</li>
                </ul>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 3 : Accès au Site</h3>
                <p className="text-gray-700 mb-4">
                  L'accès au Site est gratuit pour tout Utilisateur disposant d'une connexion Internet. Tous les
                  frais nécessaires pour l'accès au Site (matériel, connexion, etc.) sont à la charge de
                  l'Utilisateur.
                  Certaines fonctionnalités peuvent nécessiter la création d'un compte.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 4 : Inscription et compte utilisateur</h3>
                <p className="text-gray-700 mb-4">
                  Pour publier des annonces ou accéder à certaines fonctionnalités, l'Utilisateur doit créer un
                  compte en fournissant des informations exactes et à jour.
                  L'Utilisateur est responsable de la confidentialité de ses identifiants et de toute activité
                  réalisée sur le Site via son compte.
                  MarocAdsZone se réserve le droit de suspendre ou supprimer un compte en cas de violation
                  des présentes CGU.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 5 : Publication d'annonces</h3>
                <p className="text-gray-700 mb-4">
                  Les Annonceurs s'engagent à publier des annonces conformes à la législation marocaine en
                  vigueur. MarocAdsZone se réserve le droit de refuser ou supprimer toute annonce jugée
                  contraire à l'ordre public, aux bonnes mœurs ou aux présentes CGU.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 6 : Propriété intellectuelle</h3>
                <p className="text-gray-700 mb-4">
                  Tous les contenus présents sur le Site (textes, images, logos, vidéos) sont protégés par le droit
                  d'auteur et restent la propriété de leurs auteurs ou de MarocAdsZone. Toute reproduction
                  totale ou partielle sans autorisation préalable est interdite.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 7 : Responsabilité</h3>
                <p className="text-gray-700 mb-4">
                  Les informations diffusées sur le Site sont données à titre indicatif. MarocAdsZone ne garantit
                  pas l'exactitude ou l'exhaustivité des informations mises en ligne.
                  MarocAdsZone ne peut être tenu responsable des dommages directs ou indirects résultant de
                  l'utilisation du Site, ni du contenu publié par les Utilisateurs.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 8 : Obligations des utilisateurs</h3>
                <p className="text-gray-700 mb-2">En utilisant le Site, l'Utilisateur s'engage à :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                  <li>Ne pas publier de contenu illicite, diffamatoire ou contraire aux bonnes mœurs ;</li>
                  <li>Ne pas porter atteinte aux droits des tiers ;</li>
                  <li>Ne pas diffuser de contenu publicitaire sans autorisation ;</li>
                  <li>Ne pas utiliser le Site à des fins frauduleuses ou malveillantes ;</li>
                  <li>Respecter les présentes CGU.</li>
                </ul>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 9 : Liens hypertextes</h3>
                <p className="text-gray-700 mb-4">
                  Le Site peut contenir des liens vers d'autres sites. MarocAdsZone n'exerce aucun contrôle sur
                  ces sites et décline toute responsabilité quant à leur contenu.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 10 : Cookies</h3>
                <p className="text-gray-700 mb-4">
                  Le Site utilise des cookies pour améliorer l'expérience utilisateur et analyser l'audience. Pour
                  en savoir plus, veuillez consulter notre [Politique de Cookies].
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 11 : Protection des données personnelles</h3>
                <p className="text-gray-700 mb-4">
                  Les données collectées sur le Site sont traitées conformément aux lois marocaines sur la
                  protection des données personnelles. Pour plus d'informations, consultez notre [Politique de
                  Confidentialité].
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 12 : Droit applicable et juridiction compétente</h3>
                <p className="text-gray-700 mb-4">
                  Les présentes CGU sont régies par le droit marocain. En cas de litige, les tribunaux de
                  Casablanca seront compétents.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Article 13 : Modification des CGU</h3>
                <p className="text-gray-700 mb-4">
                  MarocAdsZone se réserve le droit de modifier les présentes CGU à tout moment. L'Utilisateur
                  est invité à consulter régulièrement la version mise à jour des CGU sur le Site.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-700 mb-4">
                  Pour toute question relative à l'application des présentes CGU, vous pouvez contacter
                  MarocAdsZone par email à : contact@marocadszone.com.
                </p>
              </div>
            )}

            {/* Privacy Policy Section */}
            {activeSection === 'privacy' && (
              <div className="whitespace-pre-line">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">POLITIQUE DE CONFIDENTIALITÉ</h2>
                <p className="text-gray-700 mb-4">MarocAdsZone</p>
                <p className="text-gray-700 mb-4">Date de dernière mise à jour : 3 juillet 2025</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Introduction</h3>
                <p className="text-gray-700 mb-4">
                  La protection de vos données personnelles est une priorité pour MarocAdsZone. La présente
                  Politique de Confidentialité a pour objet de vous informer sur la manière dont nous collectons,
                  utilisons et protégeons vos données lorsque vous utilisez notre plateforme de petites annonces.
                  En utilisant notre site, vous acceptez les pratiques décrites dans cette politique. Nous vous
                  invitons à la lire attentivement.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Responsable du traitement</h3>
                <p className="text-gray-700 mb-4">
                  DEVTI GROUP SARL
                  Email : support@devtigroup.com
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Types de données collectées</h3>
                <p className="text-gray-700 mb-2">Dans le cadre de l'utilisation de MarocAdsZone, nous pouvons collecter les données suivantes :</p>
                
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-800 mb-1">Pour les annonceurs :</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Données d'identification (nom, prénom, téléphone, adresse email)</li>
                    <li>Informations sur l'annonce (titre, description, images)</li>
                    <li>Données de connexion et de navigation</li>
                  </ul>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Pour les visiteurs :</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Données de navigation et cookies</li>
                    <li>Données fournies via les formulaires de contact</li>
                  </ul>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Finalités du traitement</h3>
                <p className="text-gray-700 mb-2">Nous collectons vos données personnelles pour les finalités suivantes :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                  <li>Création et gestion de votre compte utilisateur</li>
                  <li>Publication et gestion des annonces</li>
                  <li>Mise en relation entre annonceurs et visiteurs</li>
                  <li>Amélioration de nos services et analyse des performances</li>
                  <li>Envoi de communications liées à votre compte ou vos annonces</li>
                  <li>Respect des obligations légales et lutte contre la fraude</li>
                </ul>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Base légale du traitement</h3>
                <p className="text-gray-700 mb-2">Le traitement de vos données est basé sur :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                  <li>L'exécution du contrat lors de l'utilisation de nos services</li>
                  <li>Votre consentement, notamment pour l'envoi d'offres promotionnelles</li>
                  <li>Nos intérêts légitimes à améliorer nos services</li>
                  <li>Le respect de nos obligations légales</li>
                </ul>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">5. Durée de conservation des données</h3>
                <ul className="list-disc pl-6 text-gray-700 mb-2 space-y-1">
                  <li>Données de compte : pendant toute la durée de votre inscription et jusqu'à 3 ans après la dernière activité</li>
                  <li>Données d'annonces : pendant la durée de publication et jusqu'à 3 ans après la suppression</li>
                  <li>Données de facturation : selon les délais légaux de conservation</li>
                  <li>Données de navigation : jusqu'à 13 mois</li>
                </ul>
                <p className="text-gray-700 mb-4">Après ces délais, vos données sont supprimées ou anonymisées</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">6. Destinataires des données</h3>
                <p className="text-gray-700 mb-2">Vos données peuvent être partagées avec :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                  <li>Le personnel habilité de MarocAdsZone</li>
                  <li>Nos sous-traitants techniques (hébergement, maintenance)</li>
                  <li>Les visiteurs du site pour les données liées aux annonces</li>
                  <li>Les autorités administratives et judiciaires si requis par la loi</li>
                </ul>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">7. Transferts de données hors du Maroc</h3>
                <p className="text-gray-700 mb-4">
                  Certaines données peuvent être transférées hors du Maroc (par exemple via nos prestataires
                  d'hébergement). Nous veillons à ce que ces transferts soient sécurisés et conformes à la
                  réglementation en vigueur.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">8. Vos droits</h3>
                <p className="text-gray-700 mb-2">Conformément à la réglementation applicable, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-2 space-y-1">
                  <li>Droit d'accès : obtenir une copie de vos données</li>
                  <li>Droit de rectification : corriger des données inexactes</li>
                  <li>Droit à l'effacement : demander la suppression de vos données</li>
                  <li>Droit d'opposition : vous opposer à certains traitements</li>
                  <li>Droit à la limitation : restreindre le traitement de vos données</li>
                  <li>Droit à la portabilité : recevoir vos données dans un format lisible</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
                <p className="text-gray-700 mb-4">Pour exercer vos droits, contactez-nous par email à : contact@marocadszone.com</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">9. Sécurité des données</h3>
                <p className="text-gray-700 mb-2">Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données, notamment :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                  <li>Chiffrement des données sensibles</li>
                  <li>Contrôle des accès aux données</li>
                  <li>Sauvegardes régulières</li>
                  <li>Sensibilisation du personnel à la confidentialité</li>
                </ul>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">10. Cookies</h3>
                <p className="text-gray-700 mb-4">
                  Pour plus d'informations sur l'utilisation des cookies, consultez notre Politique de Cookies.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">11. Modification de la politique</h3>
                <p className="text-gray-700 mb-4">
                  Nous nous réservons le droit de modifier la présente politique à tout moment. Les
                  modifications seront publiées sur cette page et entreront en vigueur immédiatement.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">12. Contact</h3>
                <p className="text-gray-700 mb-4">
                  Pour toute question relative à cette politique ou à vos données personnelles, vous pouvez nous
                  contacter à :
                  Email : support@devtigroup.com
                </p>
              </div>
            )}
            
            {/* Cookies Policy Section */}
            {activeSection === 'cookies' && (
              <div className="whitespace-pre-line">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">POLITIQUE DE COOKIES</h2>
                <p className="text-gray-700 mb-4">MarocAdsZone</p>
                <p className="text-gray-700 mb-4">Date de dernière mise à jour : 3 juillet 2025</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Qu'est-ce qu'un cookie ?</h3>
                <p className="text-gray-700 mb-4">
                  Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone,
                  tablette) lorsque vous visitez le site MarocAdsZone. Ces cookies permettent de vous
                  reconnaître lors de vos visites, de vous proposer une navigation personnalisée et d'analyser le
                  trafic pour améliorer nos services.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Les cookies que nous utilisons</h3>
                <div className="space-y-4 text-gray-700 mb-4">
                  <div>
                    <h4 className="font-bold">Cookies strictement nécessaires</h4>
                    <p className="mb-2">Ces cookies sont essentiels au fonctionnement du site et à l'utilisation de ses fonctionnalités de base (connexion, sécurité, préférences). Sans ces cookies, certaines fonctionnalités du site peuvent ne pas fonctionner correctement.</p>
                    
                    <p className="mb-1">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Cookies de session pour gérer la connexion des utilisateurs</li>
                      <li>Cookies de sécurité pour protéger les comptes</li>
                      <li>Cookies liés aux préférences de confidentialité</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Cookies de performance</h4>
                    <p className="mb-2">Ces cookies nous permettent de mesurer l'audience et d'améliorer les performances de MarocAdsZone en analysant l'utilisation que vous faites du site (pages visitées, temps passé, erreurs rencontrées). Les données collectées sont agrégées et anonymisées.</p>
                    
                    <p className="mb-1">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Google Analytics</li>
                      <li>Matomo</li>
                      <li>Outils de suivi des performances du site</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Cookies de fonctionnalité</h4>
                    <p className="mb-2">Ces cookies permettent de mémoriser vos choix et préférences sur le site pour vous offrir une expérience personnalisée (langue, préférences d'affichage, filtres de recherche).</p>
                    
                    <p className="mb-1">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Cookies de langue et de localisation</li>
                      <li>Cookies de mémorisation des recherches récentes</li>
                      <li>Cookies de personnalisation des annonces consultées</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Cookies de ciblage et publicitaires</h4>
                    <p className="mb-2">Ces cookies peuvent être placés sur notre site par nos partenaires publicitaires afin de vous proposer des publicités pertinentes en fonction de vos centres d'intérêt. Ces cookies permettent également de mesurer l'efficacité des campagnes publicitaires.</p>
                    
                    <p className="mb-1">Exemples :</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Google Ads</li>
                      <li>Facebook Pixel</li>
                      <li>Cookies des réseaux sociaux</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gestion des cookies</h3>
                <p className="text-gray-700 mb-2">Lors de votre première visite sur MarocAdsZone, un bandeau cookies vous permet de gérer vos préférences. Vous pouvez à tout moment :</p>
                <ul className="list-disc pl-6 text-gray-700 mb-2 space-y-1">
                  <li>Accepter ou refuser tout ou partie des cookies</li>
                  <li>Modifier vos choix via les paramètres de votre navigateur</li>
                  <li>Supprimer les cookies déjà installés sur votre appareil</li>
                </ul>
                <p className="text-gray-700 mb-4">Attention : Le refus de certains cookies peut impacter le bon fonctionnement de certaines fonctionnalités du site.</p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Durée de conservation des cookies</h3>
                <p className="text-gray-700 mb-4">
                  Les cookies sont conservés pour une durée maximale de 13 mois après leur dépôt sur votre
                  terminal.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-700 mb-4">
                  Pour toute question concernant cette Politique de Cookies ou pour exercer vos droits relatifs à
                  vos données personnelles, vous pouvez nous contacter à :
                  📧 support@devtigroup.com
                </p>
              </div>
            )}

            {/* Legal Mentions Section */}
            {activeSection === 'mentions' && (
              <div className="whitespace-pre-line">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">MENTIONS LÉGALES</h2>
                <p className="text-gray-700 mb-4">MarocAdsZone</p>
                <p className="text-gray-700 mb-4">Date de dernière mise à jour : 3 juillet 2025</p>
                
                <p className="text-gray-700 mb-4">
                  Conformément aux dispositions des articles 6-III et 19 de la Loi n° 04-09 relative aux
                  échanges électroniques de données juridiques au Maroc, nous vous présentons les
                  informations légales concernant notre site MarocAdsZone.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Éditeur du site</h3>
                <p className="text-gray-700 mb-4">
                  Raison sociale : DEVTI GROUP SARL
                  Forme juridique : Société à Responsabilité Limitée
                  Capital social : 100 000,00 MAD
                  Email : support@devtigroup.com
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Propriété intellectuelle</h3>
                <p className="text-gray-700 mb-4">
                  Le site MarocAdsZone, comprenant sa structure, ses textes, images, photographies, logos,
                  codes informatiques, illustrations et graphismes, est la propriété exclusive de MarocAdsZone
                  SARL.
                  
                  Toute reproduction, représentation, modification ou adaptation de tout ou partie des éléments
                  du site, quel que soit le moyen utilisé, est interdite sans l'autorisation écrite préalable de
                  MarocAdsZone.
                  
                  Toute utilisation non autorisée du site ou de l'un de ses éléments sera considérée comme
                  constitutive d'une contrefaçon et pourra être poursuivie conformément aux dispositions du
                  Code de la propriété intellectuelle.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Liens hypertextes</h3>
                <p className="text-gray-700 mb-4">
                  Le site MarocAdsZone peut contenir des liens vers d'autres sites ou ressources disponibles sur
                  Internet. MarocAdsZone n'exerce aucun contrôle sur ces sites externes et décline toute
                  responsabilité quant à leur contenu ou leur disponibilité
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Responsabilité</h3>
                <p className="text-gray-700 mb-4">
                  Les informations présentes sur le site MarocAdsZone sont réputées fiables mais ne
                  garantissent pas qu'elles soient exemptes d'erreurs, d'omissions ou d'inexactitudes.
                  
                  Le site est régulièrement mis à jour, cependant des erreurs peuvent survenir. Les utilisateurs
                  sont invités à signaler tout contenu inexact à : contact@marocadszone.com.
                  
                  MarocAdsZone ne peut être tenue responsable des dommages directs ou indirects liés à
                  l'utilisation du site.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Loi applicable et juridiction compétente</h3>
                <p className="text-gray-700 mb-4">
                  Les présentes mentions légales sont régies par le droit marocain. En cas de litige, les
                  tribunaux de Casablanca seront seuls compétents.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-700 mb-4">
                  Pour toute question relative à ces mentions légales, vous pouvez nous contacter par email :
                  support@devtigroup.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage