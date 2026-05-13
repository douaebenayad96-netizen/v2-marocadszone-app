import AboutHeroSection from "../components/static/AboutHeroSection"
import AboutNumbersSection from "../components/static/AboutNumbersSection"
import AboutOurMissionSection from "../components/static/AboutOurMissionSection"
import AboutOurStorySection from "../components/static/AboutOurStorySection"
import AboutEngagementsSection from "../components/static/AboutEngagementsSection"
import SEOHead from "../components/seo/SEOHead"

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <SEOHead title="À propos de MarocAdsZone - Petites annonces gratuites au Maroc" description="MarocAdsZone, votre site de petites annonces gratuites au Maroc pour vendre ou acheter facilement des biens et services à petit prix." path="/about" />
      <AboutHeroSection />
      <AboutOurStorySection />
      <AboutNumbersSection />
      <AboutEngagementsSection />
      <AboutOurMissionSection />
    </div>
  )
}

export default AboutPage
