import { Link } from "react-router-dom";
//import { useState } from 'react'
//import { IoMdArrowDropup } from 'react-icons/io'
import { useTranslation } from "react-i18next";
//import { motion, AnimatePresence } from 'framer-motion'

import AppLogo from "../../assets/img/marocadszone_dark.png";
import strip from "../../assets/img/strip.svg";
import { useCategories } from "../../services/api/fetchCategory";
import { useFetchCity } from "../../services/api/fetchCity";
//import GooglePlayIcon from '../assets/img/google-play.png'
//import AppleStoreIcon from '../assets/img/app-store.png'

const Footer = () => {
  const { t, i18n } = useTranslation();
  /*const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const lang = i18n.language === 'fr' ? 'french' : i18n.language === 'en' ? 'english' : 'arabic'
  const handleLangMenu = () => {
    setIsLangMenuOpen((prev) => !prev)
  }*/ const { data: Categories } = useCategories(1, true, 15); // Fetch 15 categories per page

  const { data: cities } = useFetchCity(); // Fetch cities

  // Get the actual categories data
  const categoriesData = Categories?.data || [];
  console.log("Total categories loaded:", categoriesData.length);

  return (
    <footer className="bg-primary-gray-800 text-gray-200">
      <div className="app-container pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-5 gap-8 border-b border-gray-600">
          <div className="flex items-center gap-2 md:gap-4">
            <div></div>
          </div>
        </div>
        <div className="flex flex-row justify-start md:justify-start md:gap-8 md:mt-10 xl:gap-24 flex-wrap">
          <div className="max-w-[300px] sm:pl-2">
            <span className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-3 py-4 pr-2"
                title="Artisan"
              >
                <div>
                  <img
                    src={AppLogo}
                    draggable={false}
                    alt="Artisan"
                    className="w-72 select-none bg-white bg-blend-lighten rounded-md px-4 py-2"
                  />
                </div>
              </Link>
            </span>
            <p className="text-sm not-italic font-normal text-primary-white">
              MarocAdsZone est une plateforme de annonces en ligne qui vous
              permet de trouver vos besoins facillement et rapidement.
            </p>

            <div className="flex justify-start items-center gap-6 mt-4">
              <a href="/" className="w-8 h-8 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#fff"
                >
                  <path
                    d="M16 2.66669C8.63693 2.66669 2.66669 8.63693 2.66669 16C2.66669 23.3631 8.63693 29.3334 16 29.3334C23.3631 29.3334 29.3334 23.3631 29.3334 16C29.3334 8.63693 23.3631 2.66669 16 2.66669ZM22.4078 12.7173C22.4167 12.8572 22.4167 13.003 22.4167 13.1459C22.4167 17.5149 19.0893 22.5476 13.0089 22.5476C11.1339 22.5476 9.39585 22.003 7.93157 21.0655C8.19942 21.0953 8.45538 21.1072 8.72919 21.1072C10.2768 21.1072 11.6994 20.5834 12.8334 19.6964C11.381 19.6667 10.1607 18.7143 9.74407 17.4048C10.253 17.4792 10.7113 17.4792 11.2351 17.3453C10.4873 17.1933 9.81512 16.7872 9.33281 16.1958C8.85049 15.6044 8.58778 14.8643 8.58931 14.1012V14.0595C9.02681 14.3066 9.54169 14.4584 10.0804 14.4792C9.62753 14.1774 9.25615 13.7685 8.99916 13.2888C8.74218 12.8091 8.60753 12.2734 8.60716 11.7292C8.60716 11.1131 8.76788 10.5506 9.05657 10.0625C9.88664 11.0844 10.9224 11.9201 12.0966 12.5154C13.2708 13.1107 14.5572 13.4523 15.872 13.5179C15.4048 11.2709 17.0834 9.4524 19.1012 9.4524C20.0536 9.4524 20.9107 9.85121 21.5149 10.4941C22.2619 10.3542 22.9762 10.0744 23.6131 9.69942C23.3661 10.4643 22.8482 11.1101 22.1607 11.5179C22.8274 11.4464 23.4703 11.2619 24.0655 11.003C23.6161 11.6637 23.0536 12.25 22.4078 12.7173Z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a href="/" className="w-8 h-8 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.66669 16.0745C2.66669 22.7034 7.48113 28.2156 13.7778 29.3334V19.7034H10.4445V16H13.7778V13.0367C13.7778 9.70335 15.9256 7.85224 18.9634 7.85224C19.9256 7.85224 20.9634 8.00002 21.9256 8.1478V11.5556H20.2222C18.5922 11.5556 18.2222 12.37 18.2222 13.4078V16H21.7778L21.1856 19.7034H18.2222V29.3334C24.5189 28.2156 29.3334 22.7045 29.3334 16.0745C29.3334 8.70002 23.3334 2.66669 16 2.66669C8.66669 2.66669 2.66669 8.70002 2.66669 16.0745Z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/marocadszone"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.66669 4.89457C2.66669 4.3037 2.90141 3.73703 3.31922 3.31922C3.73703 2.90141 4.3037 2.66669 4.89457 2.66669H27.103C27.3959 2.66621 27.6859 2.72349 27.9566 2.83526C28.2272 2.94702 28.4732 3.11107 28.6803 3.31801C28.8875 3.52495 29.0518 3.77072 29.1639 4.04125C29.2759 4.31178 29.3335 4.60175 29.3334 4.89457V27.1031C29.3337 27.3959 29.2762 27.686 29.1643 27.9566C29.0525 28.2273 28.8883 28.4732 28.6813 28.6804C28.4742 28.8875 28.2284 29.0518 27.9578 29.1639C27.6872 29.2759 27.3971 29.3335 27.1043 29.3334H4.89457C4.60189 29.3334 4.31209 29.2757 4.04171 29.1637C3.77134 29.0516 3.52568 28.8874 3.31879 28.6804C3.1119 28.4734 2.94782 28.2276 2.83593 27.9572C2.72404 27.6868 2.66653 27.3969 2.66669 27.1043V4.89457ZM13.2218 12.834H16.8327V14.6473C17.354 13.6049 18.6873 12.6667 20.6909 12.6667C24.5321 12.6667 25.4424 14.7431 25.4424 18.5527V25.6097H21.5552V19.4206C21.5552 17.2509 21.034 16.0267 19.7103 16.0267C17.874 16.0267 17.1103 17.3467 17.1103 19.4206V25.6097H13.2218V12.834ZM6.55517 25.4437H10.4437V12.6667H6.55517V25.4424V25.4437ZM11 8.49942C11.0074 8.83235 10.9481 9.1634 10.8258 9.47313C10.7034 9.78286 10.5204 9.065 10.2876 10.3031C10.0547 10.5411 9.77662 10.7303 9.46966 10.8594C9.1627 10.9886 8.83304 11.0551 8.50002 11.0551C8.167 11.0551 7.83734 10.9886 7.53038 10.8594C7.22342 10.7303 6.94534 10.5411 6.71247 10.3031C6.47959 10.065 6.29662 9.78286 6.17428 9.47313C6.05193 9.1634 5.99269 8.83235 6.00002 8.49942C6.01441 7.84591 6.28412 7.22401 6.7514 6.76692C7.21867 6.30982 7.84635 6.05386 8.50002 6.05386C9.15369 6.05386 9.78137 6.30982 10.2486 6.76692C10.7159 7.22401 10.9856 7.84591 11 8.49942Z"
                    fill="#fff"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/marocadszone/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="#fff"
                >
                  <path
                    d="M15.9967 11.5536C13.5484 11.5536 11.5503 13.5516 11.5503 16C11.5503 18.4483 13.5484 20.4463 15.9967 20.4463C18.445 20.4463 20.443 18.4483 20.443 16C20.443 13.5516 18.445 11.5536 15.9967 11.5536ZM29.3324 16C29.3324 14.1587 29.349 12.3341 29.2456 10.4962C29.1422 8.36146 28.6552 6.46685 27.0942 4.9058C25.5298 3.34141 23.6385 2.85775 21.5037 2.75434C19.6625 2.65094 17.8379 2.66762 16 2.66762C14.1588 2.66762 12.3342 2.65094 10.4963 2.75434C8.36153 2.85775 6.46691 3.34474 4.90586 4.9058C3.34147 6.47019 2.85781 8.36146 2.7544 10.4962C2.651 12.3375 2.66768 14.1621 2.66768 16C2.66768 17.8379 2.651 19.6658 2.7544 21.5037C2.85781 23.6385 3.3448 25.5331 4.90586 27.0941C6.47025 28.6585 8.36153 29.1422 10.4963 29.2456C12.3375 29.349 14.1621 29.3323 16 29.3323C17.8413 29.3323 19.6658 29.349 21.5037 29.2456C23.6385 29.1422 25.5331 28.6552 27.0942 27.0941C28.6586 25.5297 29.1422 23.6385 29.2456 21.5037C29.3524 19.6658 29.3324 17.8412 29.3324 16ZM15.9967 22.8412C12.2108 22.8412 9.1554 19.7859 9.1554 16C9.1554 12.2141 12.2108 9.15867 15.9967 9.15867C19.7826 9.15867 22.838 12.2141 22.838 16C22.838 19.7859 19.7826 22.8412 15.9967 22.8412ZM23.1182 10.4762C22.2342 10.4762 21.5204 9.76241 21.5204 8.87848C21.5204 7.99455 22.2342 7.28074 23.1182 7.28074C24.0021 7.28074 24.7159 7.99455 24.7159 8.87848C24.7162 9.08837 24.675 9.29626 24.5948 9.49022C24.5146 9.68419 24.3969 9.86043 24.2485 10.0088C24.1001 10.1573 23.9239 10.2749 23.7299 10.3551C23.5359 10.4353 23.3281 10.4765 23.1182 10.4762Z"
                    fill="#fff"
                  />
                </svg>
              </a>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              {/*
              <h5>
                {t('footer.subscribeToOurNewsletter')}
              </h5>
              <div
                className='flex'
              >
                <input
                  type="text"
                  placeholder={t('footer.enterYourEmail')}
                  className="w-full bg-primary-gray-700 px-4 py-4 rounded-md text-sm text-gray-200 outline-none bg-primary-gray-500 placeholder:text-primary-white"
                />
                <button
                  className="px-4 py-4 rounded-md text-sm text-gray-200 outline-none bg-primary-blue-600 hover:bg-primary-blue-700 transition duration-300 ease-in-out hover:bg-primary-white hover:text-primary-blue-all-800"
                >
                  {t('footer.subscribe')}
                </button>
              </div>
  */}
            </div>
            {/* google play & app store 
            <div>
              <h5 className='mt-6'>
                {t('footer.downloadOurApp')}
              </h5>
              <div className='flex items-center gap-4 mt-4'>
                <a
                  href='/'
                  className='bg-gray-700 rounded-md p-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-all'
                >
                  <div
                    className='w-6 h-6'
                  >
                    <img
                      src={GooglePlayIcon}
                      alt="google play"
                      className='w-full h-full'
                    />
                  </div>
                  <div>
                    <p>
                      Google Play
                    </p>
                  </div>
                </a>
                <a
                  href='/'
                  className='bg-gray-700 rounded-md p-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-all'
                >
                  <div
                    className='w-6 h-6'
                  >
                    <img
                      src={AppleStoreIcon}
                      alt="google play"
                      className='w-full h-full'
                    />
                  </div>
                  <div>
                    <p>
                      App Store
                    </p>
                  </div>
                </a>
              </div>
            </div>

*/}
          </div>
          <div className="min-w-[300px] xl:min-w-0 mt-12 sm:mt-0 sm:pl-2">
            <h3 className="uppercase h-12 font-medium text-xl text-primary-white">
              {t("footer.about")}
            </h3>
            <ul className="mt-0">
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to="/">{t("accueil")}</Link>
              </li>
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to="/about">{t("footer.aboutUs")}</Link>
              </li>
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to="/categories">{t("categories.text")}</Link>
              </li>
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to="/terms">Conditions générales</Link>
              </li>
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to="/contact">Contactez-nous</Link>
              </li>
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to="/tarification">Tarification</Link>
              </li>
            </ul>
          </div>
          <div className="min-w-[300px] xl:min-w-0 mt-12 lg:mt-0 sm:pl-2">
            <h3 className="uppercase h-12 font-medium text-xl text-primary-white">
              {t("categories.text")}
            </h3>
            <ul className="mt-0">
              {categoriesData.slice(0, 5).map((category) => (
                <li
                  key={category.id}
                  className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all"
                >
                  <Link to={`/annonces?category=${category.label}`}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-[300px] xl:min-w-0 mt-12 lg:mt-0 sm:pl-2">
            <h3 className="uppercase h-12 font-medium text-xl text-primary-white">
              {/* {t('categories.text')} */}
            </h3>
            <ul className="mt-0">
              {categoriesData.slice(5, 10).map((category) => (
                <li
                  key={category.id}
                  className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all"
                >
                  <Link to={`/annonces?category=${category.label}`}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-[300px] xl:min-w-0 mt-12 lg:mt-0 sm:pl-2">
            <h3 className="uppercase h-12 font-medium text-xl text-primary-white">
              {i18n.language === "fr"
                ? "Villes"
                : i18n.language === "en"
                ? "Cities"
                : "المدن"}
            </h3>
            <ul className="mt-0">
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to={`/annonces?ville=Casablanca`}>
                  Annonce Casablanca
                </Link>
              </li>
              <li className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all">
                <Link to={`/annonces?ville=Rabat`}>Annonce Rabat</Link>
              </li>
              {cities?.slice(0, 3).map((city) => (
                <li
                  key={city.id}
                  className="text-sm not-italic font-normal mb-[20px] hover:underline hover:text-primary-white transition-all"
                >
                  <Link to={`/annonces?ville=${city.label}`}>
                    Annonce {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="w-full mt-5">
            <img src={strip} alt="strip" className="w-full" />
          </div>
          <div className="mt-5 flex items-center justify-center gap-6 md:gap-0 md:justify-between flex-wrap">
            <div>
              <p>© {new Date().getFullYear()} DevTi Technologie</p>
            </div>
            {/*
            <div className='relative'>
              <button
                onClick={() => handleLangMenu()}
                onBlur={() => setIsLangMenuOpen(false)}
                className='flex items-center gap-2 text-sm not-italic font-normal px-4 py-3 rounded-md text-primary-white hover:text-primary-blue-all-200 transition-all bg-primary-gray-500'
              >
                <span>
                  {t(lang)}
                  {' '}<span className='uppercase'>({i18n.language})</span>
                </span>
                <IoMdArrowDropup />
            </button>*/}
            {/* lang menu 
              <AnimatePresence>
                {
                  isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: .2 }}
                      className='absolute bottom-full right-0  w-full bg-primary-white py-1 rounded-sm shadow-md overflow-hidden'
                    >
                      <ul
                        className='flex flex-col gap-2'
                      >
                        <li
                          className={`text-sm not-italic font-normal hover:bg-gray-100  px-4 py-3 text-primary-gray-800 cursor-pointer hover:text-primary-blue transition-all bg-primary-white ${i18n.language === 'fr' ? 'bg-gray-100' : ''}`}
                          onClick={() => i18n.changeLanguage('fr')}
                        >
                          {t('french')} (FR)
                        </li>
                        <li
                          className={`text-sm not-italic font-normal hover:bg-gray-100  px-4 py-3 text-primary-gray-800 cursor-pointer hover:text-primary-blue transition-all bg-primary-white ${i18n.language === 'en' ? 'bg-gray-100' : ''}`}
                          onClick={() => i18n.changeLanguage('en')}
                        >
                          {t('english')} (EN)
                        </li>
                        <li
                          className={`text-sm not-italic font-normal hover:bg-gray-100  px-4 py-3 text-primary-gray-800 cursor-pointer hover:text-primary-blue transition-all bg-primary-white ${i18n.language === 'ar' ? 'bg-gray-100' : ''}`}
                          onClick={() => i18n.changeLanguage('ar')}
                        >
                          {t('arabic')} (AR)
                        </li>
                      </ul>
                    </motion.div>
                  )
                }
              </AnimatePresence>
              </div>
              */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
