import image1 from '../../assets/img/about/image1.jpg'

const AboutOurStorySection = () => {
  return (
    <div className="section-py app-container grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <small
          className="text-primary-blue font-bold bg-primary-blue bg-opacity-10 px-2 py-1 rounded-lg inline-block mb-2"
        >
          #Notre Histoire
        </small>
        <h2
          className="title-h2 text-blue-950 font-bold mb-4"
        >
          Fondée avec une vision simple mais ambitieuse
        </h2>
        <p
          className="text-gray-500 text-base"
        >
          MarocAdsZone est devenue la plateforme d'annonces en ligne de référence au Maroc, offrant un espace sécurisé et efficace pour vendre, acheter et promouvoir des services en toute confiance.
        </p>
        <p
          className="text-gray-500 text-base mt-2"
        >
          Depuis nos débuts, nous nous engageons à :
        </p>
        <ul className="list-disc pl-5 text-gray-500 text-base mt-2">
          <li>Simplifier le processus de vente et d'achat pour les particuliers et professionnels.</li>
          <li>Créer un pont entre les vendeurs et les acheteurs, sans barrières ni complexités inutiles.</li>
          <li>Offrir un canal fiable permettant à chaque annonce de générer de la visibilité et des opportunités réelles.</li>
        </ul>
      </div>
      <div
        className="rounded-lg overflow-hidden aspect-video"
      >
        <img
          src={image1}
          alt="Notre Histoire"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}

export default AboutOurStorySection