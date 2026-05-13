import { useGetJobOffers } from "../../services/api/fetchService"
import JobOfferBlogCard from "./BlogCard1"
import JobsSkeletonCard from "../ui/skeletons/JobsSkeletonCard"
import SectionHeader from "../layouts/SectionHeader"

function HomeBlog() {
  const { data: jobOffersData, isError, isLoading } = useGetJobOffers({ sort_by: 'newest', per_page: 8 }, true)
  
  return (
    <section
      className="bg-primary-white text-primary-blue section-py "
    >
      <div className="app-container">
        <SectionHeader
          title="Nos dernières offres d'emploi"
          subtitle="Découvrez nos dernières offres d'emploi et trouvez le poste qui vous correspond."
        />

        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {
            (isLoading || isError) &&
            [...Array(8)].map((_, index) => (
              <JobsSkeletonCard key={index} />
            ))
          }
          {
            jobOffersData?.data?.items?.map((jobOffer) => (
              <JobOfferBlogCard key={jobOffer.id} jobOffer={jobOffer} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default HomeBlog