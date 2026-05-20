import { useState, useEffect } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useTranslation } from "react-i18next"

import PageHeader from "../components/layouts/PageHeader"
import getLocalized from "../utils/getLocalized"
import CategoryCard from "../components/category/CategoryCard"
import { useCategories } from "../services/api/fetchCategory"
import { Category } from "../services/types/category"
import SampleButton from "../components/ui/SampleButton"
import CategoryCardSkeleton from "../components/ui/skeletons/CategoryCardSkeleton"
import SEOHead from "../components/seo/SEOHead"

const CategoriesPage = () => {
  const { t } = useTranslation("categories")

  const [page, setPage] = useState(1)
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data: categories,
    isLoading,
    isError,
  } = useCategories(page, true)

  useEffect(() => {
    if (categories?.data) {
      setAllCategories((prevCategories) => {
        const newCategories = categories.data.filter(
          (newCategory) =>
            !prevCategories.some(
              (category) => category.id === newCategory.id
            )
        )

        return [...prevCategories, ...newCategories]
      })
    }
  }, [categories])

  const filteredCategories = allCategories.filter((category) =>
    (getLocalized(category, "label") || category.label || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const handleLoadMore = () => {
    const totalPage = categories?.last_page

    if (totalPage && page < totalPage) {
      setPage(page + 1)
    }
  }

  return (
    <div className="pt-nav">
      <SEOHead
        title={t("page.categories.title")}
        description={t("page.categories.description")}
        path="/categories"
      />

      <div className="app-container page-py">
        <PageHeader>
          <h1 className="title-h1">
            {t("page.categories.explore_title")}
          </h1>

          <p className="text-base text-gray-400">
            {t("common.see_more")}
          </p>
        </PageHeader>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t("page.categories.search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>

        <section className="section-py grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {isError && (
            <div className="col-span-full text-center text-red-500 p-4 bg-red-50 rounded">
              <p>{t("errors.loading")}</p>

              <p className="text-sm">
                {t("errors.check_console")}
              </p>
            </div>
          )}

          {!isLoading &&
            !isError &&
            filteredCategories.length === 0 &&
            allCategories.length > 0 && (
              <div className="col-span-full text-center text-gray-500 p-8">
                <p>
                  {t("page.categories.no_categories_for", {
                    term: searchTerm,
                  })}
                </p>
              </div>
            )}

          {!isLoading &&
            !isError &&
            allCategories.length === 0 && (
              <div className="col-span-full text-center text-gray-500 p-8">
                <p>{t("page.categories.no_categories")}</p>

                <p className="text-sm">
                  {t("errors.check_console")}
                </p>
              </div>
            )}

          {filteredCategories?.map((category) => (
            <CategoryCard
              category={category}
              key={category.id}
            />
          ))}

          {isLoading &&
            !isError &&
            Array.from(Array(8).keys()).map((n) => (
              <CategoryCardSkeleton key={n} />
            ))}
        </section>

        {categories?.last_page &&
          categories.last_page > 1 &&
          categories.last_page !== page && (
            <div className="flex justify-center mt-8 w-fit mx-auto">
              <SampleButton
                callback={handleLoadMore}
                text={t("common.see")}
                icon={
                  isLoading && (
                    <RiLoader4Line className="animate-spin" />
                  )
                }
              />
            </div>
          )}
      </div>
    </div>
  )
}

export default CategoriesPage