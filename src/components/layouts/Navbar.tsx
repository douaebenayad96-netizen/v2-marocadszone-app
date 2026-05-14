import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { BsGrid } from "react-icons/bs"
import { AiOutlineClose } from "react-icons/ai"
import { RiMenu3Fill } from "react-icons/ri"
import { useWindowSize } from "@uidotdev/usehooks"
import { useTranslation } from "react-i18next"
import { AnimatePresence } from "framer-motion"

import BrandLogo from "../../assets/img/marocadszone_dark.png"
import { useLoginModelStore } from "../../services/store/LoginModelStore"
import { useAuthStore } from "../../services/store/authStore"
import ProfileImg from "../account/ProfileImg"
import ProfileMenu from "../account/ProfileMenu"
import SearchModel from "../annonce/SearchModel"
import CategoriesMenu from "../category/CategoriesMenu"

//import LangMenu from "./LangMenu"

type NavbarProps = {
  forProfile?: boolean
  forPostJob?: boolean
}

const Navbar = ({ forProfile, forPostJob }: NavbarProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const path = useLocation().pathname
  const width = useWindowSize().width
  const [menuOpen, setMenuOpen] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [showSearchModel, setShowSearchModel] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  // const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const { openLoginModel, openRegisterModel } = useLoginModelStore()
  const { user, token, isHydrated } = useAuthStore()

  useEffect(() => {
    if (width && width < 1024) {
      setMenuOpen(false)
    } else {
      setMenuOpen(true)
    }
  }, [width])

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  /* const handleLangMenu = (lang: string) => {
     i18n.changeLanguage(lang)
     setMenuOpen(false)
     // // reload the page
     // window.location.reload()
   }
 */
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-primary-white border-b border-gray-200 ${forProfile || forPostJob ? '' : 'shadow-orange-bottom'}`}>
      <nav className={`${!forProfile && 'container mx-auto'} px-4 ${lang === 'ar' ? 'pl-2 lg:pl-4' : 'pr-2 lg:pr-4'}  flex justify-between items-stretch py-2`}>
        {/* left */}
        <div
          className="flex items-stretch gap-4 min-h-[56px] py-1"
        >
          <div className="w-[200px] sm:w-[220px] flex items-center">
            <Link
              to="/"
            >
              <img
                className="w-full select-none"
                draggable={false}
                src={BrandLogo}
                alt="Artisan Logo"
              />
            </Link>
          </div>
          <div className={`hidden lg:flex relative items-center ${lang === 'ar' ? 'border-r' : 'border-l'} border-gray-200 cursor-pointer group`}
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <Link
              to="/categories"
              tabIndex={0}
              className="relative flex items-center gap-1 capitalize text-sm font-medium px-2 cursor-pointer group-hover:text-primary-orange transition-all">
              <BsGrid className="text-base" />
              <span>
                {t('categories.text')}
              </span>
            </Link>
            {/* dropdown */}
            <CategoriesMenu showDropDown={showDropDown} setShowDropDown={setShowDropDown} rtl={lang === 'ar'} />
          </div>
        </div>
        {/* call to action mobile btn  */}
        {/*<div className="flex items-center">
          <button
            onClick={() => openServiceTypeModel()}
            className="flex lg:hidden items-center gap-2 py-2 h-fit px-4 cursor-pointer bg-primary-blue-all-500 text-white rounded-full transition-all hover:bg-opacity-80"
          >
            <span
              className="text-white text-xl hidden sm:block"
            >
              <FaWifi
                className="transform rotate-45"
              />
            </span>
           <span>
              {
                t('demander_un_service')
              }
            </span>
          </button>
        </div>*/}
        {/* toggle btn */}
        <div className="lg:hidden flex items-center">
          <div
            onClick={() => setMenuOpen(true)}
            className="flex rounded-lg items-center p-2 hover:bg-gray-50 h-[40px] w-[40px] self-center text-gray-800 text-xl cursor-pointer hover:text-primary-orange transition-all"
          >
            <RiMenu3Fill className={`text-2xl ${lang === 'ar' ? 'transform rotate-180' : ''}`} />
          </div>
        </div>
        {/* right */}
        <div className={`bg-primary-white z-50 lg:h-[56px] py-1 flex flex-col lg:flex-row items-stretch transition-all duration-300 fixed lg:static top-0 lg:-left-full w-[80%] sm:w-[70%] lg:w-fit bottom-0 ${lang === 'ar' ? menuOpen ? 'right-0' : 'right-[-100%]' : menuOpen ? 'left-0' : 'left-[-100%]'}`}>
          {/* close menu in mobile*/}
          <div
            onClick={() => handleCloseMenu()}
            className={`p-3 lg:hidden cursor-pointer hover:text-primary-orange transition-all ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`}
          >
            <AiOutlineClose className="text-3xl" />
          </div>
          {/* nav links */}
          <ul
            className="flex items-stretch lg:flex-row flex-col gap-1 lg:gap-2 xl:gap-4 text-sm font-medium text-gray-800"
          >
            <li className="relative group flex items-stretch">
              <Link
                to="/"
                className={`nav-link ${path === "/" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                {t('accueil')}
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/" ? "w-full" : "w-0"}`}
              ></div>
            </li>
            {/* <li className="relative group flex items-stretch">
              <Link
                to="/services"
                className={`nav-link ${path === "/services" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                {t('prestations')}
              </Link>
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/services" ? "w-full" : "w-0"}`}
              ></div>
            </li> */}
            <li className="relative group flex items-stretch">
              <Link to="/annonces"
                className={`nav-link ${path === "/annonces" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                Annonces
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/annonces" ? "w-full" : "w-0"}`}
              ></div>
            </li>
            <li className="relative group flex items-stretch">
              <Link to="/videos"
                className={`nav-link ${path === "/videos" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                Vidéos
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/videos" ? "w-full" : "w-0"}`}
              ></div>
            </li>
            <li className="relative group flex items-stretch">
              <Link
                to="/offres"
                className={`nav-link ${path === "/emploi" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                Emploi maroc
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/emploi" ? "w-full" : "w-0"}`}
              ></div>
            </li>



          </ul>

          <div className="mt-3 mb-2 mx-5 lg:hidden">
            {/* title for this section */}
            <h4 className="text-sm font-semibold text-primary-orange">
              Autres liens
            </h4>
          </div>

          {/* link for "tarification & contact & about" */}

          <ul className="flex flex-col gap-2 lg:hidden">
            <li className="relative group flex items-stretch">
              <Link
                to="/tarification"
                className={`nav-link ${path === "/tarification" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                Tarification
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/tarification" ? "w-full" : "w-0"}`}
              ></div>
            </li>
            <li className="relative group flex items-stretch">
              <Link
                to="/contact"
                className={`nav-link ${path === "/contact" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                Contact
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/contact" ? "w-full" : "w-0"}`}
              ></div>
            </li>
            <li className="relative group flex items-stretch">
              <Link
                to="/about"
                className={`nav-link ${path === "/about" ? 'active' : ""}`}
                onClick={() => handleCloseMenu()}
              >
                À propos
              </Link>
              {/* line */}
              <div
                className={`group-hover:w-full h-[2px] hidden lg:block rounded-full bg-primary-orange transition-all absolute top-[-12px] left-0 ${path === "/about" ? "w-full" : "w-0"}`}
              ></div>
            </li>
          </ul>

          <div className="my-2"></div>

          <div className="my-2 mx-4 hidden lg:block">
            <div
              className="h-full w-[1px] bg-gray-200"
            ></div>
          </div>
          {/* buttons */}
          <div
            className="flex items-center flex-row-reverse lg:flex-row justify-between gap-4 lg:gap-2 xl:gap-4 px-4 lg:px-0 py-4 lg:py-0 border-t border-gray-200 lg:border-0"
          >
            <div></div>
            {
              !user || !token ? (
                <div className="max-sm:space-y-4 sm:flex sm:items-center sm:gap-4 py-4 lg:py-0 flex-col sm:flex-row">
                  <span
                    onClick={() => openLoginModel()}
                    className="lg:text-sm text-gray-800 cursor-pointer font-semibold px-1 lg:px-2 hover:text-primary-orange transition-all capitalize"
                  >
                    {t('s_identifier')}
                  </span>
                  <span
                    onClick={() => openRegisterModel()}
                    className="px-4 py-2 block lg:text-sm font-medium cursor-pointer text-primary-blue hover:text-primary-orange hover:border-primary-orange border border-primary-blue rounded-full transition-all hover:bg-opacity-80"
                  >
                    Publier une annonce
                  </span>
                </div>
              ) : (
                <div
                  className="flex items-center gap-4 py-4 lg:py-0 flex-row-reverse lg:flex-row"
                >
                  {
                    path.includes('/user-account') === false && (
                      <div
                        className="relative cursor-pointer flex items-center gap-3"
                      >
                        <button
                          type="button"
                          onClick={() => {
window.location.assign("/annonces/new")
                          }}
                          className="w-10 h-10 rounded-full bg-white border border-primary-orange text-primary-orange flex items-center justify-center text-2xl font-bold shadow-sm hover:bg-primary-orange hover:text-white transition-colors"
                          aria-label="Publier une annonce"
                        >
                          +
                        </button>


                        <div
                          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                          onBlur={() => setIsProfileMenuOpen(false)}
                          tabIndex={0}
                          className="flex items-center gap-2 cursor-pointer hover:text-primary-orange transition-all rounded-full p-2 hover:bg-gray-100 bg-gray-50"
                        >
                          <ProfileImg
                            name={user?.first_name + user?.last_name}
                            size="sm"
                            avatar={(user?.media && user?.media[0]) ? user?.media[0].original_url : undefined}
                          />
                          <span>{user?.first_name}</span>
                          <RiMenu3Fill
                            className={`text-xl ${lang === 'ar' ? 'transform rotate-180' : ''}`}
                          />
                        </div>
                        <AnimatePresence>
                          {
                            isProfileMenuOpen && (
                              <ProfileMenu
                                currentLanguage={lang}
                                onClick={() => {
                                  handleCloseMenu()
                                }}
                                roles={user?.roles && user?.roles?.length > 0 ? user?.roles : null}
                              />
                            )
                          }
                        </AnimatePresence>
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
        {/* bg black on isopen left for the nav mobile */}
        {
          menuOpen && (
            <div
              onClick={() => handleCloseMenu()}
              className="fixed top-0 left-0 right-0 bottom-0 lg:hidden bg-black bg-opacity-20"
            ></div>
          )
        }
      </nav>

      {/* search model */}
      <SearchModel showSearchModel={showSearchModel} setShowSearchModel={setShowSearchModel} />


    </header>
  )
}

export default Navbar