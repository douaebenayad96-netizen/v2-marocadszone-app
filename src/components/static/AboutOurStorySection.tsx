import { useTranslation } from "react-i18next"
import image1 from '../../assets/img/about/image1.jpg'

const AboutOurStorySection = () => {
  const { t } = useTranslation()

  return (
    <div className="section-py app-container grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <small
          className="text-primary-blue font-bold bg-primary-blue bg-opacity-10 px-2 py-1 rounded-lg inline-block mb-2"
        >
          {t("story.pill", { ns: "about" })}
        </small>
        <h2 className="title-h2 text-blue-950 font-bold mb-4">{t("story.title", { ns: "about" })}</h2>
        <p className="text-gray-500 text-base">{t("story.p1", { ns: "about" })}</p>
        <p className="text-gray-500 text-base mt-2">{t("story.p2", { ns: "about" })}</p>
        <ul className="list-disc pl-5 text-gray-500 text-base mt-2">
          <li>{t("story.li1", { ns: "about" })}</li>
          <li>{t("story.li2", { ns: "about" })}</li>
          <li>{t("story.li3", { ns: "about" })}</li>
        </ul>
      </div>
      <div className="rounded-lg overflow-hidden aspect-video">
          <img
            src={image1}
            alt={t("story.pill", { ns: "about" })}
            className="object-cover w-full h-full"
          />
      </div>
    </div>
  )
}

export default AboutOurStorySection
