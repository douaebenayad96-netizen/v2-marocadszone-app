import { BiBriefcase, BiRocket, BiTrendingUp } from "react-icons/bi"
import { CiSettings } from "react-icons/ci"
import { cn } from "../../utils/helpers"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface PricingFeaturesProps {
  className?: string
}

function PricingFeatures({ className }: PricingFeaturesProps) {
  const features: Feature[] = [
    {
      icon: BiRocket,
      title: "Plus de visibilité",
      description:
        "Votre annonce est diffusée à des milliers de visiteurs chaque jour partout au Maroc, sans effort de votre part.",
    },
    {
      icon: BiBriefcase,
      title: "Acheteurs ciblés",
      description:
        "Grâce à notre moteur de recherche intelligent, vos annonces atteignent les acheteurs réellement intéressés par vos biens ou services.",
    },
    {
      icon: BiTrendingUp,
      title: "Plus de ventes",
      description:
        "Nos options Premium et Pro augmentent jusqu'à 5x la visibilité de vos annonces pour générer plus de contacts et conclure plus rapidement.",
    },
    {
      icon: CiSettings,
      title: "Facile & rapide",
      description:
        "Publiez en quelques clics, gérez vos annonces depuis votre mobile ou ordinateur, et suivez les performances en temps réel.",
    },
  ]

  return (
    <section className={cn("py-16 px-4 bg-gray-50", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir MarocAdsZone ?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez les avantages qui font de MarocAdsZone la plateforme de référence pour vos annonces au Maroc
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#E17A30] rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


export default PricingFeatures