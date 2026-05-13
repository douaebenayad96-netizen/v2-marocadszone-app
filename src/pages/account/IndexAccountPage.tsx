import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropright } from "react-icons/io";
import {
  RiAdvertisementLine,
  RiBuilding2Line,
  RiShieldUserFill,
  RiUserLine,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import Banner970X90 from "../../components/banners/Banner970X90";
import SampleButton from "../../components/ui/SampleButton";
import { useAuthStore } from "../../services/store/authStore";

const IndexAccountPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userData = useAuthStore((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="app-container"
    >
      <div className="py-4 md:p-12">
        <h1 className="title-h2">{t("profile.dashboard.tooltip")}</h1>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[500px]">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              <div className="md:col-span-3">
                {/* ad banner */}
                <Banner970X90 />
              </div>

              <Link
                to="/user-account/profile"
                className="flex flex-col items-start p-6 bg-white rounded-md shadow-card-shadow-border cursor-pointer group"
              >
                <div className="p-3 bg-primary-blue text-white rounded-lg group-hover:bg-primary-blue-all-200 transition-all duration-200">
                  <RiUserLine className="text-xl lg:text-2xl" />
                </div>
                <div className="mt-4">
                  <h2 className="title-h4 flex items-center gap-2">
                    <span>Profil</span>
                    <IoMdArrowDropright />
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Gérer vos informations personnelles
                  </p>
                </div>
              </Link>
              <Link
                to="/user-account/company"
                className="flex flex-col items-start p-6 bg-white rounded-md shadow-card-shadow-border cursor-pointer group"
              >
                <div className="p-3 bg-primary-blue text-white rounded-lg group-hover:bg-primary-blue-all-200 transition-all duration-200">
                  <RiBuilding2Line className="text-xl lg:text-2xl" />
                </div>
                <div className="mt-4">
                  <h2 className="title-h4 flex items-center gap-2">
                    <span>Entreprise</span>
                    <IoMdArrowDropright />
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Gérer les informations comerciales de votre entreprise
                  </p>
                </div>
              </Link>
              <Link
                to="/user-account/annonces"
                className="flex flex-col items-start p-6 bg-white rounded-md shadow-card-shadow-border cursor-pointer group"
              >
                <div className="p-3 bg-primary-blue text-white rounded-lg group-hover:bg-primary-blue-all-200 transition-all duration-200">
                  <RiAdvertisementLine className="text-xl lg:text-2xl" />
                </div>
                <div className="mt-4">
                  <h2 className="title-h4 flex items-center gap-2">
                    <span>Annonces</span>
                    <IoMdArrowDropright />
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Gérer vos annonces publiées
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* edit profile card */}
            <div className="flex h-full flex-col justify-between items-center p-8 bg-primary-blue rounded-md shadow-card-shadow-border">
              <div className="flex flex-col items-center justify-center">
                <div className="p-4 bg-primary-white text-primary-blue rounded-full w-fit">
                  <RiShieldUserFill className="text-xl lg:text-3xl " />
                </div>
                <div className="mt-8 text-primary-white">
                  <h5 className="text-sm font-semibold text-center">
                    {t("profile.dashboard.bienvenue")}
                  </h5>
                  <h4 className="text-2xl font-bold text-center mt-2">
                    {userData?.first_name} {userData?.last_name}
                  </h4>
                </div>
              </div>
              <div className="mt-8">
                <SampleButton
                  text={t("profile.dashboard.edit_profile")}
                  callback={() => {
                    navigate("/user-account/profile");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IndexAccountPage;
