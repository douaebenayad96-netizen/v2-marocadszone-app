import { motion } from "framer-motion";

import UserInformationForm from "../../components/account/UserInformationForm";
import CompanyNotificationNote from "../../components/company/CompanyNotificationNote";

const ProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="app-container"
    >
      <div className="py-4 md:p-12">
        <h1 className="title-h2">Information Personnelle</h1>

        <div className="py-2 justify-center items-center">
          <div className="mt-0">
            <div className="mt-8 space-y-4">
              <CompanyNotificationNote />

              <UserInformationForm />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
