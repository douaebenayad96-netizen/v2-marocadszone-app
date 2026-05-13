import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useCategories } from "../../services/api/fetchCategory";

type CategoriesMenuProps = {
  showDropDown: boolean;
  setShowDropDown: (showDropDown: boolean) => void;
  rtl: boolean;
};

const CategoriesMenu = ({
  showDropDown,
  setShowDropDown,
  rtl,
}: CategoriesMenuProps) => {
  const { t, i18n } = useTranslation();
  const { data: categories } = useCategories(1, true);
  const lang = i18n.language;

  const categoriesData = categories?.data || [];

  const handleClickCloseDropDown = () => {
    setShowDropDown(false);
  };

  return (
    <AnimatePresence>
      {showDropDown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute min-w-[200px] ${
            rtl ? "right-0" : "left-0"
          } z-50 top-full w-full bg-white shadow-card-shadow-border rounded-md p-3`}
        >
          {" "}
          <div className="flex flex-col gap-4">
            {" "}
            {categoriesData?.slice(0, 5)?.map((category) => (
              <Link
                to={`/annonces?category=${category.label}`}
                key={category.id}
                onClick={handleClickCloseDropDown}
                className="category-filter-link capitalize block "
              >
                {lang === "fr" && category.label}{" "}
                {lang === "en" && category.label}{" "}
                {lang === "ar" && category.label}
              </Link>
            ))}
            <Link
              to="/categories"
              onClick={handleClickCloseDropDown}
              className="category-filter-link block"
            >
              {t("categories.see_all")}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoriesMenu;
