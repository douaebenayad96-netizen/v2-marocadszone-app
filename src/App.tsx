import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import AnnonceDetailsPage from "./pages/AnnonceDetailsPage";

// Temporarily commented out for debugging
// import FirebaseTest from "./components/FirebaseTest"

// Debug component for testing
// import DebugTest from "./components/DebugTest"

import "@smastrom/react-rating/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "simplebar-react/dist/simplebar.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import "./global.css";
import "./styles/styles.css";

import RootLayout from "./layouts/RootLayout";
import IndexPage from "./pages/IndexPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./services/i18n/i18n";
// import ServicePage from "./pages/ServicePage"
// import PrestationsPage from "./pages/PrestationsPage"
// import PrestatairePage from "./pages/PrestatairePage"
import AccountRootLayout from "./layouts/AccountRootLayout";
import IndexAccountPage from "./pages/account/IndexAccountPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import CategoriesPage from "./pages/CategoriesPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import PrestatairesPage from "./pages/PrestatairesPage";
// import MessagesPage from "./pages/account/MessagesPage"
// import ReservationsPage from "./pages/account/ReservationsPage"
// import FavoriPrestationPage from "./pages/account/FavoriPrestationPage"
// import DemandesPage from "./pages/account/DemandesPage"
import ForgetPassword from "./components/auth/ForgetPassword";
import RequireAuth from "./components/auth/RequireAuth";
import ResetPassword from "./components/auth/ResetPassword";
import PgaePlogDetails from "./components/blog/PgaePlogDetails";
import EmploiDebug from "./components/debug/EmploiDebug";
import EmploiFilterDemo from "./components/demo/EmploiFilterDemo";
import JobPageLayout from "./layouts/JobPageLayout";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import AnnoncesListPage from "./pages/account/AnnoncesListPage";
import ProfileCompanyPage from "./pages/account/ProfileCompanyPage";
import ProfilePage from "./pages/account/ProfilePage";
import UserOtpVerificationPage from "./pages/UserOtpVerificationPage";
import VideoUploadPage from "./pages/account/VideoUploadPage";
import AnnoncePage from "./pages/AnnoncePage";
import BlogsPage from "./pages/BlogsPage";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import MentionsLegalesPage from "./pages/condition/MentionsLegalesPage";
import TermsOfCookies from "./pages/condition/TermsOfCookies";
import TermsPage from "./pages/condition/TermsPage";
import FaqPage from "./pages/FaqPage";
import JobOfferDetailsPage from "./pages/JobOfferDetailsPage";
import JobOffersPage from "./pages/JobOffersPage";
import PrestataireProfilePage from "./pages/PrestataireProfilePage";
import PricingPage from "./pages/PricingPage";
import PrivacyPage from "./pages/PrivacyPage";
import PublishAnnoncePage from "./pages/PublishAnnoncePage";
import ShortDetailsPage from "./pages/ShortDetailsPage";
import ShortsPage from "./pages/ShortsPage";
import StepsRegister from "./pages/StepsRegister";
import ThankYouPage from "./pages/ThankYouPage";
import SubscriptionViewer from "./pages/UserSubscriptionManagements";
import { useAuthStore } from "./services/store/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      onError: (error) => {
        const err = error as unknown as { response?: { status: number } };
        if (err?.response?.status === 401) {
          useAuthStore.getState().logout();
          window.location.href = "/404";
        }
      },
    },
    mutations: {
      retry: 1,
    },
  },

  // logout if user is not authorized 401
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="videos/:slug" element={<ShortDetailsPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="fr" element={<Navigate to="/" />} />
        <Route path="en" element={<Navigate to="/" />} />
        <Route path="ar" element={<Navigate to="/" />} />

        {/* <Route path="service/:id" element={<ServicePage />} />
      <Route path="services" element={<PrestationsPage />} />
       <Route path="oldprestataire/:id" element={<PrestatairePage />} />  */}
        <Route path="emploi/:slug" element={<JobOfferDetailsPage />} />
        <Route path="emploi" element={<JobOffersPage />} />
        <Route path="offres" element={<BlogsPage />} />
        <Route path="offres/:slug" element={<PgaePlogDetails />} />
        <Route path="debug/emploi" element={<EmploiDebug />} />
        <Route path="demo/emploi" element={<EmploiFilterDemo />} />
        <Route path="annonce/:slug" element={<PrestataireProfilePage />} />
        <Route path="annonces/:id" element={<AnnonceDetailsPage />} />
        <Route path="annonces" element={<PrestatairesPage />} />
        <Route
          path="publier-une-annonce"
          element={
            <RequireAuth>
              <PublishAnnoncePage />
            </RequireAuth>
          }
        />
        <Route
          path="annonces/new"
          element={
            <RequireAuth>
              <StepsRegister />
            </RequireAuth>
          }
        />
        <Route path="verify-otp" element={<UserOtpVerificationPage />} />
        <Route path="videos" element={<ShortsPage />} />
        <Route path="entreprise/:slug" element={<CompanyProfilePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="become-seller" element={<BecomeSellerPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="tarification" element={<PricingPage />} />
        {/* <Route path="debug" element={<DebugTest />} /> */}
        {/* <Route path="firebase-test" element={<FirebaseTest />} /> */}
        <Route
          path="thank-you"
          element={
            <RequireAuth>
              <ThankYouPage />
            </RequireAuth>
          }
        />
        <Route path="faq" element={<FaqPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="terms">
          <Route index element={<TermsPage />} />
          <Route path="cookies" element={<TermsOfCookies />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>
        <Route path="mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
        <Route path="404" element={<NotFoundPage />} />
      </Route>
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="payments"
        element={
          <RequireAuth>
            <CheckoutPage />
          </RequireAuth>
        }
      />
        <Route
          path="user-account"
          element={
            <RequireAuth>
              <AccountRootLayout />
            </RequireAuth>
          }
        >
        <Route index element={<Navigate to="/user-account/dashboard" replace />} />
        <Route path="dashboard" element={<IndexAccountPage />} />
        <Route
          path="subscription-management"
          element={<SubscriptionViewer />}
        />
        {/* <Route path="messages" element={<MessagesPage />} /> */}
        {/* <Route path="reservations" element={<ReservationsPage />} /> */}
        {/* <Route path="favoris-prestation" element={<FavoriPrestationPage />} /> */}
        {/* <Route path="demandes" element={<DemandesPage />} /> */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="company" element={<ProfileCompanyPage />} />
        <Route path="annonces" element={<AnnoncesListPage />} />
        <Route path="annonces-video" element={<VideoUploadPage />} />
      </Route>
      <Route path="job" element={<JobPageLayout />}>
        <Route path="post-job" element={<StepsRegister />} />
        <Route index element={<Navigate to="/job/post-job" />} />
        <Route path="annonce" element={<AnnoncePage />} />
        {/*<Route path="post-job" element={<PostJobPage />} />*/}
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
