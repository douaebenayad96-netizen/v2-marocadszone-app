import PageHeader from "../layouts/PageHeader"

const AboutHeroSection = () => {
  return (
    <div className="app-container pt-nav">
      <div className="page-pt-sm">
        <PageHeader>
          {/* title */}
          <div>
            <h1
              className="text-3xl text-primary-blue font-bold"
            >
              À propos de nous
            </h1>
            <div>
              <span
                className="text-base text-gray-400"
              >
                Connecter le Maroc, une annonce à la fois.
              </span>
            </div>
          </div>
        </PageHeader>
      </div>
    </div>
  )
}

export default AboutHeroSection