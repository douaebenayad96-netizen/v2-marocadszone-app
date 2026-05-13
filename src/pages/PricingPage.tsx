import PricingCTACard from "../components/pricing/PricingCTACard"
import PricingCustomerSupport from "../components/pricing/PricingCustomerSupport"
import PricingFaq from "../components/pricing/PricingFaq"
import PricingFeatures from "../components/pricing/PricingFeatures"
import PricingHero from "../components/pricing/PricingHero"
import SEOHead from "../components/seo/SEOHead"

const PricingPage = () => {
  return (
    <div className="pt-nav min-h-screen">
      <SEOHead
        title="Tarification annonces et professionnelles au Maroc"
        description="Consultez nos tarifs pour publier des annonces professionnelles au Maroc. Offres B2B, visibilité accrue et tarifs adaptées aux entreprises."
        path="/tarification"
      />
      <PricingHero />
      <PricingFaq />
      <PricingFeatures />
      <PricingCustomerSupport />
      <PricingCTACard />
    </div>
  )
}

export default PricingPage
