import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import MarkdownLayout from "../../layouts/MarkdownLayout";
import { useGetJobOffer } from "../../services/api/fetchService";
import { useAuthStore } from "../../services/store/authStore";
import { useLoginModelStore } from "../../services/store/LoginModelStore";
import Banner300X250 from "../banners/Banner300X250";
import Banner300X600 from "../banners/Banner300X600";
import Banner728X90 from "../banners/Banner728X90";
import PageHeader from "../layouts/PageHeader";
import DetailsBlog from "./DetailsBlog";

function PgaePlogDetails() {
  const { slug } = useParams();
  const {
    data: jobOfferResponse,
    isError,
    isLoading,
    refetch,
  } = useGetJobOffer(slug as string, !!slug);
  const navigate = useNavigate();
  const jobOffer = jobOfferResponse?.data;
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));
  const { openRegisterModel } = useLoginModelStore();

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug, refetch]);

  const handleApplyClick = () => {
    if (jobOffer?.redirect_to) {
      window.open(jobOffer.redirect_to, "_blank", "noopener,noreferrer");
    }
  };

  const handleCTAClick = (action: "create" | "contact") => {
    if (action === "create") {
      if (user && token) {
        // User is authenticated, redirect to create announcement page
        navigate("/annonces/new");
      } else {
        // User is not authenticated, open registration modal
        openRegisterModel();
      }
    } else if (action === "contact") {
      navigate("/contact");
    }
  };

  if (isLoading) {
    return (
      <div className="pt-nav">
        <div className="app-container-max-xl page-py">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !jobOffer) {
    return (
      <div className="pt-nav">
        <div className="app-container-max-xl page-py">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Offre d'emploi non trouvée
            </h2>
            <p className="text-gray-600 mb-6">
              L'offre d'emploi que vous recherchez n'existe pas.
            </p>
            <Link to="/job-offer" className="text-blue-500 hover:underline">
              Retour aux offres d'emploi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-nav">
      <Helmet>
        <title>{jobOffer?.title || "Offre d'emploi"} - MarocAdsZone</title>
        <meta
          name="description"
          content={
            jobOffer?.description ||
            "Aucune description disponible pour cette offre d'emploi."
          }
        />
        {/* facebook, linkedin and twitter meta */}
        <meta
          property="og:title"
          content={`${jobOffer?.title || "Offre d'emploi"} - MarocAdsZone`}
        />
        <meta property="og:description" content={jobOffer?.description} />
        <meta property="og:image" content={jobOffer?.images?.[0]?.url} />
        <meta
          property="og:url"
          content={`https://marocadszone.com/annonce/${jobOffer?.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${jobOffer?.title || "Offre d'emploi"} - MarocAdsZone`}
        />
        <meta name="twitter:description" content={jobOffer?.description} />
        <meta name="twitter:image" content={jobOffer?.images?.[0]?.url} />
        {/* this for google */}
        <meta itemProp="name" content={jobOffer.title} />
        <meta itemProp="description" content={jobOffer.description} />
        <meta itemProp="image" content={jobOffer.images?.[0].url} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: jobOffer.title,
            image: jobOffer.images?.map((img) => img.url),
            description: jobOffer.description,
            brand: "MarocAdsZone",
            url: `https://marocadszone.com/offers/${jobOffer?.slug}`,
            offers: {
              "@type": "Offer",
              priceCurrency: "MAD",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>
      </Helmet>
      <img
        src={jobOffer.images?.[0].url}
        alt={`${jobOffer.title} à vendre à ${jobOffer.city?.name} - ${jobOffer.type}`}
        width={1200}
        height={630}
        style={{ display: "none" }}
      />
      <div className="app-container-max-xl page-py">
        <PageHeader>
          <h1 className="title-h1">Offre d'Emploi</h1>
          <p className="text-base text-gray-400">Détails de l'offre d'emploi</p>
        </PageHeader>

        {/* Breadcrumb Navigation */}
        <div className="app-container-max-xl pt-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span className="font-medium text-gray-900">Offre</span>
            <span>/</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {slug}
            </span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between mt-4">
          <div>
            {/* Top Ad Placeholder */}
            <div className="m-auto max-w-3xl mb-8">
              <Banner728X90 />
            </div>

            <div className="m-auto max-w-3xl">
              <div className="page-pt-sm">
                {jobOffer && <DetailsBlog jobOffer={jobOffer} />}

                {/* Middle Ad Placeholder */}
                <div className="my-8">
                  <Banner300X250 />
                </div>

                <MarkdownLayout className="section-pb mt-4">
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Description du poste
                    </h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {jobOffer?.description ||
                        "Aucune description disponible pour cette offre d'emploi."}
                    </div>
                  </div>
                </MarkdownLayout>

                {/* Apply Button */}
                {jobOffer?.redirect_to && (
                  <div className="mt-8 p-6  rounded-lg text-white text-center">
                    <h3 className="text-xl font-bold mb-4  text-gray-900">
                      Intéressé par cette offre ?
                    </h3>
                    <button
                      onClick={handleApplyClick}
                      className="inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-lg"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Postuler maintenant
                    </button>
                  </div>
                )}

                {/* Bottom Ad Placeholder */}
                <div className="mt-8">
                  <Banner728X90 />
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">
                      Prêt à booster votre visibilité ?
                    </h2>
                    <p className="text-lg mb-6">
                      {user && token
                        ? "Créez votre annonce dès maintenant et touchez des milliers de clients potentiels !"
                        : "Rejoignez notre plateforme et découvrez nos solutions publicitaires personnalisées pour atteindre votre audience cible efficacement."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => handleCTAClick("create")}
                        className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                      >
                        {user && token
                          ? "Publier une annonce"
                          : "Créer un compte"}
                      </button>
                      <button
                        onClick={() => handleCTAClick("contact")}
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                      >
                        Contactez-nous
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Side Ad Placeholder */}
            <div className="sticky top-24">
              <Banner300X600 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PgaePlogDetails;
