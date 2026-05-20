import { BiBriefcase, BiRocket, BiTrendingUp } from "react-icons/bi"
import { CiSettings } from "react-icons/ci"
import { cn } from "../../utils/helpers"
import { useTranslation } from "react-i18next"

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface PricingFeaturesProps {
  className?: string
}

function PricingFeatures({ className }: PricingFeaturesProps) {
  const { t } = useTranslation()

  const features: Feature[] = [
    {
      icon: BiRocket,
      title: t("features.items.0.title", { ns: "pricing" }),
      description: t("features.items.0.description", { ns: "pricing" }),
    },
    {
      icon: BiBriefcase,
      title: t("features.items.1.title", { ns: "pricing" }),
      description: t("features.items.1.description", { ns: "pricing" }),
    },
    {
      icon: BiTrendingUp,
      title: t("features.items.2.title", { ns: "pricing" }),
      description: t("features.items.2.description", { ns: "pricing" }),
    },
    {
      icon: CiSettings,
      title: t("features.items.3.title", { ns: "pricing" }),
      description: t("features.items.3.description", { ns: "pricing" }),
    },
  ]

  return (
    <section className={cn("py-16 px-4 bg-gray-50", className)}>
      <div className="max-w-6xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("features.header_title", { ns: "pricing" })}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("features.header_subtitle", { ns: "pricing" })}
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