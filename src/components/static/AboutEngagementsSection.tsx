import { FiCheck } from "react-icons/fi"
import image3 from '../../assets/img/about/image3.jpg'

const AboutEngagementsSection = () => {
  return (
    <div className="section-py app-container">
      <div className="text-center mb-10">
        <div className="max-w-lg mx-auto mb-8">
          <img
            src={image3}
            alt="Nos Engagements"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <small
          className="text-primary-blue font-bold bg-primary-blue bg-opacity-10 px-2 py-1 rounded-lg inline-block mb-2"
        >
          #Nos Engagements
        </small>
        <h2 className="title-h2 text-blue-950 font-bold">
          Une plateforme sécurisée, intuitive et performante
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Simplicité</h3>
          <p className="text-gray-600">
            Créez et publiez vos annonces en quelques clics.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Visibilité</h3>
          <p className="text-gray-600">
            Touchez un public qualifié à travers le Maroc.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Sécurité</h3>
          <p className="text-gray-600">
            Toutes les annonces sont vérifiées pour garantir la fiabilité de la plateforme.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="text-primary-blue text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Accompagnement</h3>
          <p className="text-gray-600">
            Notre support dédié est à votre écoute pour vous guider et répondre à vos besoins.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutEngagementsSection