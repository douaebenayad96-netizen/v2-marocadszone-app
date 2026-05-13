import { useFetchBlog } from "../../services/api/fetchBlog"
import BlogCard1 from "./BlogCard1"

const AboutBlogCardsSection = () => {

  const { data: BlogData } = useFetchBlog()
  console.log("hoooooooome", BlogData)
  return (
    <section className="section-py app-container">
      <div className="text-center">
        <h2
          className="title-h2 text-blue-950 font-bold mb-4"
        >
          Nos derniers offres d'emploi
        </h2>
        <p>
          Découvrez nos dernières offres d'emploi et trouvez le poste qui vous correspond.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {
            BlogData?.slice(8).map((item) => (
              <BlogCard1 key={item.id}
                article={item}
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default AboutBlogCardsSection