import AnnonceOffersSection from "../components/annonce/AnnonceOffersSection"
import PrestatairesMap from "../components/annonce/PrestatairesMap"
import { TPrestation } from "../services/types/postJobType"

export type AnnoncePageState = {
  prestation: TPrestation
}

const AnnoncePage = () => {



  return (
    <div className='pt-nav min-h-screen flex flex-col-reverse md:flex-row items-stretch justify-stretch'>
      <div className="w-full md:w-[55%]">
        <AnnonceOffersSection
        />
      </div>
      <div className="flex-1 w-full md:w-[45%]">
        <div className="w-full h-[60dvh] md:h-[calc(100dvh-72px)] sticky top-[72px]">
          <PrestatairesMap />
        </div>
      </div>
    </div>
  )
}

export default AnnoncePage