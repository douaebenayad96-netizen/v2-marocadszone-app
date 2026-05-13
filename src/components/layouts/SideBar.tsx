import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RiAdvertisementLine,
  RiBankCardLine,
  RiBuilding2Line,
  RiCustomerService2Line,
  RiHome3Line,
  RiUserLine,
  RiVideoUploadLine,
} from "react-icons/ri";

import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { useAuthStore } from "../../services/store/authStore";
import ProfileImg from "../account/ProfileImg";
import Menu from "../common/Menu";

const SideBar = () => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAuthStore();
  const isNotMobile = window.innerWidth >= 992;

  return (
    <aside className="fixed bottom-0 lg:static lg:bottom-none bg-primary-white text-primary-blue bg-gray-5fff0 shadow-card-shadow-border border-t border-gray-200 lg:border-0 z-10 lg:shadow-primary-web h-[60px] w-full lg:max-w-[75px] lg:min-w-[75px] lg:min-h-[570px] lg:h-screen">
      <div className="hidden lg:block h-[75px] w-[75px]"></div>
      <nav className="flex flex-row lg:flex-col justify-evenly lg:justify-between items-center h-full lg:h-[calc(100%-75px)]">
        <ul className="flex w-full lg:flex-col items-center justify-evenly lg:justify-center">
          {/*

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/user-account/messages'
              data-tooltip-id='messages'
              data-tooltip-content={t('profile.messages.tooltip')}
              data-tooltip-place='right'
              className="sidebar-link"
            >
              <RiChat1Line className='text-xl lg:text-2xl ' />
              {isNotMobile && <Tooltip id='messages' />}
            </NavLink>
          </li>

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/user-account/reservations'
              data-tooltip-id='reservations'
              data-tooltip-content={t('profile.reservations.tooltip')}
              data-tooltip-place='right'
              className="sidebar-link"
            >
              <RiSurveyLine className='text-xl lg:text-2xl' />
              {isNotMobile && <Tooltip id='reservations' />}
            </NavLink>
          </li>

          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/user-account/demandes'
              data-tooltip-id='demandes'
              data-tooltip-content={t('profile.demandes.tooltip')}
              data-tooltip-place='right'
              className="sidebar-link"
            >
              <RiCheckboxMultipleLine className='text-xl lg:text-2xl' />
              {isNotMobile && <Tooltip id='demandes' />}
            </NavLink>
          </li>
          <li
            className='lg:mt-2 group cursor-pointer'
          >
            <NavLink
              to='/user-account/favoris-prestation'
              data-tooltip-id='favoris-prestation'
              data-tooltip-content={t('profile.favoris-prestation.tooltip')}
              data-tooltip-place='right'
              className="sidebar-link"
            >
              <RiServiceLine className='text-xl lg:text-2xl' />
              {isNotMobile && <Tooltip id='favoris-prestation' />}
            </NavLink>
  </li>*/}
          <li className="lg:mt-2 group cursor-pointer">
            <NavLink
              to="/user-account/dashboard"
              data-tooltip-id="dashboard"
              data-tooltip-content={t("profile.dashboard.tooltip")}
              data-tooltip-place="right"
              className="sidebar-link"
            >
              <RiHome3Line className="text-xl lg:text-2xl " />
              {isNotMobile && <Tooltip id="dashboard" />}
            </NavLink>
          </li>
          <li className="lg:mt-2 group cursor-pointer">
            <NavLink
              to="/user-account/profile"
              data-tooltip-id="profile"
              data-tooltip-content={t("profile.profile.tooltip")}
              data-tooltip-place="right"
              className="sidebar-link"
            >
              <RiUserLine className="text-xl lg:text-2xl " />
              {isNotMobile && <Tooltip id="profile" />}
            </NavLink>
          </li>
          <li className="lg:mt-2 group cursor-pointer">
            <NavLink
              to="/user-account/company"
              data-tooltip-id="company"
              data-tooltip-content="Entreprise"
              data-tooltip-place="right"
              className="sidebar-link"
            >
              <RiBuilding2Line className="text-xl lg:text-2xl " />
              {isNotMobile && <Tooltip id="company" />}
            </NavLink>
          </li>
          <li className="lg:mt-2 group cursor-pointer">
            <NavLink
              to="/user-account/annonces"
              data-tooltip-id="annonces"
              data-tooltip-content="Annonces"
              data-tooltip-place="right"
              className="sidebar-link"
            >
              <RiAdvertisementLine className="text-xl lg:text-2xl" />
              {isNotMobile && <Tooltip id="annonces" />}
            </NavLink>
          </li>
          <li className="lg:mt-2 group cursor-pointer">
            <NavLink
              to="/user-account/annonces-video"
              data-tooltip-id="annonces-video"
              data-tooltip-content="Annonces Vidéo"
              data-tooltip-place="right"
              className="sidebar-link"
            >
              <RiVideoUploadLine className="text-xl lg:text-2xl" />
              {isNotMobile && <Tooltip id="annonces-video" />}
            </NavLink>
          </li>
          <li className="lg:mt-2 group cursor-pointer">
            <NavLink
              to="/user-account/subscription-management"
              data-tooltip-id="voir-Abonnement"
              data-tooltip-content="Voir Abonnement"
              data-tooltip-place="right"
              className="sidebar-link"
            >
              <RiBankCardLine className="text-xl lg:text-2xl" />
              {isNotMobile && <Tooltip id="voir-Abonnement" />}
            </NavLink>
          </li>
        </ul>
        <ul className="hidden lg:block lg:mb-4">
          <li className="lg:mt-2 group cursor-pointer">
            <Link
              to="/contact"
              data-tooltip-content={t("contact_page.title")}
              data-tooltip-id="contact-us"
              data-tooltip-place="right"
              className="sidebar-link"
              tabIndex={0}
            >
              <RiCustomerService2Line className="text-xl lg:text-2xl " />
              {isNotMobile && <Tooltip id="contact-us" />}
            </Link>
          </li>

          <li className="lg:mt-2">
            <span className="h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center relative">
              <div
                onClick={() => setShowMenu(!showMenu)}
                onBlur={() => setShowMenu(false)}
                tabIndex={0}
              >
                {user && (
                  <ProfileImg
                    name={user?.first_name + user?.last_name}
                    size="sm"
                    avatar={
                      user?.media && user?.media[0]
                        ? user?.media[0].original_url
                        : undefined
                    }
                  />
                )}
              </div>
              <Menu
                isOpen={showMenu}
                roles={
                  user?.roles && user?.roles?.length > 0 ? user?.roles : null
                }
              />
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
