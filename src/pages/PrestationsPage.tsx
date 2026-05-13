import { useTranslation } from 'react-i18next'
import { TbFilterPlus } from 'react-icons/tb'
import { CgClose } from 'react-icons/cg'
import { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import Select from 'react-select'
import { LuFilterX } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

import PageHeader from '../components/layouts/PageHeader'
import SlideLayout from '../components/layouts/SlideLayout'
import SearchInput from '../components/reviews/SearchInput'
import { PrestationFilter } from '../services/types/filter'
import { useCategories } from '../services/api/fetchCategory'
import { useFetchCity } from '../services/api/fetchCity'
import { ListSortByAR, ListSortByEN, ListSortByFR } from '../utils/data'
import SampleButtonFilter from '../components/ui/SampleButtonFilter'
import { villeSelect } from '../services/types/select'
import { SelectStyles } from '../utils/style'
import SimpleDropDown from '../components/common/SimpleDropDown'
import SubCategoriesList from '../components/category/SubCategoriesList'
import PrestationsFilterList from '../components/annonce/PrestationsFilterList'

const MIN = 0
const MAX = 5000

const PrestationsPage = () => {
  const { t, i18n } = useTranslation()
  const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } = useCategories(1, true)
  const categories = categoriesData?.data || []
  const [showFilter, setShowFilter] = useState(false)
  const [priceRange, setPriceRange] = useState([MIN, MAX])
  const [filter, setFilter] = useState<PrestationFilter>({})
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: citiesData } = useFetchCity()
  const [city, setCity] = useState<villeSelect | null>()
  const lang = i18n.language

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    if (!params.sort_by) {
      params.sort_by = 'newest'
    }
    setFilter(params)
  }, [searchParams])

  useEffect(() => {
    
    setFilter((prev) => ({ ...prev, sort_by: 'newest' }))
  }, [])

  const handleSortBy = (value: string) => {
    searchParams.set('sort_by', value)
    setSearchParams(searchParams)
  }

  const handlePriceRange = () => {
    searchParams.set('min_price', priceRange[0].toString())
    searchParams.set('max_price', priceRange[1].toString())
    setSearchParams(searchParams)
  }

  const handleSearchByTitle = (value: string) => {
    searchParams.set('title', value)
    setSearchParams(searchParams)
  }

  const handleFilterCategory = (value: string) => {
    if (value === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', value)
    }
    setSearchParams(searchParams)
    setShowFilter(false)
  }

  const handleResetFilter = () => {
    setPriceRange([MIN, MAX])
    setCity(null)
    searchParams.delete('category')
    searchParams.delete('min_price')
    searchParams.delete('max_price')
    searchParams.delete('city')
    setSearchParams(searchParams)
  }

  const checkFilter = () => {
    return searchParams.has('category') || searchParams.has('min_price') || searchParams.has('max_price') || searchParams.has('city')
  }

  const handleFilterCity = () => {
    const value = city ? city : ''
    if (value === '') {
      searchParams.delete('city')
    } else {
      searchParams.set('city', value.value.toString())
      setSearchParams(searchParams)
    }
  }

  const handleApplyFilter = () => {
    handlePriceRange()
    handleFilterCity()
    setShowFilter(false)
  }

  return (
    <div className="pt-nav">
      {/* page container */}
      <div className="app-container page-py page-pt-sm">
        {/* section top */}
        <div>
          {/* page header */}
          <PageHeader>
            {/* title */}
            <div>
              <h1
                className="text-5xl text-primary-blue font-bold"
              >
                {t('prestationsFilter.explore')}
              </h1>
              <div>
                <span
                  className="text-base text-gray-400"
                >
                  {t('prestationsFilter.2500+-prestations')}
                </span>
              </div>
            </div>
            {/* search input */}
            <div className='mt-5'>
              <SearchInput
                placeholder={t('rechercher_un_service')}
                btnText={t('rechercher')}
                callback={handleSearchByTitle}
                valueD={filter.title}
              />
            </div>
          </PageHeader>
          {/* sort by new or.. */}
          <div
            className="mt-4 flex items-center justify-between"
          >
            {/* filter button */}
            <div className='flex items-center gap-2'>
              <SampleButtonFilter
                text={t('prestationsFilter.filtrer')}
                icon={<TbFilterPlus />}
                callback={() => setShowFilter(true)}
              />
              {/* reset filter btn */}
              {
                checkFilter() && <SampleButtonFilter text={t('reinitialiser')} icon={<LuFilterX />} callback={handleResetFilter} />
              }


            </div>
            <div>
              <SimpleDropDown
                text={t('prestationsFilter.trier_par')}
                onChange={(value) => handleSortBy(value)}
                list={i18n.language === 'ar' ? ListSortByAR : i18n.language === 'en' ? ListSortByEN : ListSortByFR}
              />
            </div>
          </div>
        </div>
        {/* sous categories */}        {categoriesLoading ? (
          <div className="mt-4 flex items-center gap-2 overflow-x-auto">
            {Array.from(Array(5).keys()).map((n) => (
              <div key={n} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            ))}
          </div>
        ) : (
          <SubCategoriesList
            categories={categories}
            selectedCategoryId={filter.category ? parseInt(filter.category) : undefined}
            className='mt-4'
          />
        )}
        {/* line */}
        <div
          className="mb-8 mt-4 line"
        ></div>

        {/* services */}
        <div>
          {/* services grid */}
          <PrestationsFilterList filter={filter} />
        </div>
      </div>

      {/* filter slide */}
      <SlideLayout
        showSlide={showFilter}
        setShowSlide={setShowFilter}
      >
        <div
          className="w-[calc(100vw-4rem)] max-w-[400px] h-full"
        >
          {/* slide header */}
          <div className='p-4'>
            <div
              className="flex items-center justify-between"
            >
              <h3
                className="text-lg font-bold text-primary-blue"
              >
                {t('prestationsFilter.tous_les_filtres')}
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="bg-gray-50 rounded-full p-2 transition-all hover:bg-gray-100"
              >
                <CgClose />
              </button>
            </div>
          </div>
          {/* line */}
          <div
            className="border-b border-gray-200"
          ></div>
          {/* filter category */}
          <div
            className="p-4"
          >
            <h3
              className="text-lg font-bold text-gray-900"
            >
              {t('prestationsFilter.categorie')}
            </h3>
            <div
              className="mt-2 flex flex-col gap-2"
            >
              <div
                onClick={() => handleFilterCategory('all')}
                className="category-filter-link"
              >
                {t('prestationsFilter.all_categories_(2500+)')}
              </div>
              {
                (categoriesLoading || categoriesError) && (
                  [...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="category-filter-link"
                    >
                      <div className="skeleton w-20 h-5"></div>
                    </div>
                  ))
                )
              }              {categoriesLoading ? (
                Array.from(Array(5).keys()).map((n) => (
                  <div key={n} className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                ))
              ) : (
                categories.slice(0, 5).map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleFilterCategory(category.id.toString())}
                    className="category-filter-link"
                  >
                    {lang === 'fr' && category.label} {lang === 'en' && category.label} {lang === 'ar' && category.label}
                    {' '}
                    ({category.prestations_count})
                  </div>
                ))
              )}
            </div>
          </div>
          {/* line */}
          <div
            className="border-b border-gray-200"
          ></div>
          {/* city select */}
          <div
            className="p-4"
          >
            <h3
              className="text-lg font-bold text-gray-900"
            >
              {t('prestationsFilter.ville')}
            </h3>
            <div
              className="mt-2"
            >
              <Select
                placeholder={t('prestationsFilter.select_city')}
                options={
                  citiesData?.map((city) =>
                  ({
                    label: i18n.language === 'fr' ? city.label : i18n.language === 'en' ? city.label : city.label,
                    value: city.id
                  }
                  )) || []
                }
                className='z-50'
                {...SelectStyles}
                onChange={(value) => setCity(value as unknown as villeSelect)}
                value={city ? { label: city.label, value: city.value } : undefined}
              />
            </div>
          </div>
          {/* filter price range */}
          <div
            className="p-4"
          >
            <h3
              className="text-lg font-bold text-gray-900"
            >
              {t('prestationsFilter.prix')}
            </h3>
            <div>
              <div>
                {/* range */}
                <ReactSlider
                  className="w-full h-2 mt-2 mb-2"
                  thumbClassName="thumb"
                  trackClassName="track"
                  defaultValue={priceRange}
                  min={MIN}
                  max={MAX}
                  renderThumb={(props) => (
                    <div {...props}>
                      <div
                        className="w-4 h-4 -mt-[6px] cursor-pointer border border-primary-blue-all-500 rounded-full bg-white"
                      ></div>
                    </div>
                  )}
                  renderTrack={(props) => (
                    <div {...props} className="h-1 bg-gray-200"></div>
                  )}
                  onChange={(value) => setPriceRange(value)}
                />
              </div>
              <div>
                {/* range value */}
                <p
                  className="text-sm mt-2 text-gray-700 flex items-center justify-between"
                >
                  {priceRange[0]} {t('MAD')} - {priceRange[1]} {t('MAD')}
                </p>
              </div>
            </div>
          </div>
          {/* apply btn */}
          <div
            className="px-4"
          >
            <button
              onClick={handleApplyFilter}
              className="btn-primary mt-4"
            >
              {t('prestationsFilter.appliquer')}
            </button>
          </div>
        </div>
      </SlideLayout>
    </div>
  )
}

export default PrestationsPage