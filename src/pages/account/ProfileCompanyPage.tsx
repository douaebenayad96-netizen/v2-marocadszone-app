import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import UserCompanyInformationForm from "../../components/account/UserCompanyInformationForm";
import { useGetCompany } from "../../services/api/fetchCompany";
import { useAuthStore } from "../../services/store/authStore";
import { slugify } from "../../utils/slugUtils";

const ProfileCompanyPage = () => {
  const { t, i18n } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const { data: company } = useGetCompany(token || "", undefined, !!token);
  
  const isRTL = i18n.language === "ar";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className={`app-container ${isRTL ? "rtl" : ""}`}
    >
      <div className="py-4 md:p-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="title-h2">{t("company_page.title")}</h1>
          
          {company && company.id && (
            <Link
              to={`/entreprise/${
                company?.slug || `${company?.id}-${slugify(company?.name)}`
              }`}
              className="text-primary-orange underline font-semibold hover:text-primary-orange/80 transition-all flex items-center justify-center gap-2"
            >
              <span>{t("company_page.view_public_page")}</span>
            </Link>
          )}
        </div>        
        <div className="py-2 justify-center items-center">
          <div className="mt-0">
            <div className="mt-8">
              <UserCompanyInformationForm />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCompanyPage;
