import { Outlet, useLocation } from "react-router-dom";
import ChatBot from "../components/AiBotAssistant";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import usePageDirection from "../hooks/usePageDirection";

const RootLayout = () => {
  usePageDirection();
  const location = useLocation();

  const hideFooter = location.pathname === "/annonces/new";

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
        <ChatBot />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
