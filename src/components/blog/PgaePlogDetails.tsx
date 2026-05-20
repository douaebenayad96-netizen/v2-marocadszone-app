import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
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

  const canApply = Boolean(jobOffer?.redirect_to);

  const handleApplyClick = () => {
    if (jobOffer?.redirect_to) {
      window.open(jobOffer.redirect_to, "_blank", "noopener,noreferrer");
    }
  };

  const handleCTAClick = (action: "create" | "contact") => {
    if (action === "create") {
      if (user && token) {
        navigate("/annonces/new");
      } else {
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
              {t("job_details.not_found_title")}
            </h2>
            <p className="text-gray-600 mb-6">
              {t("job_details.not_found_message")}
            </p>
            <Link to="/job-offer" className="text-blue-500 hover:underline">
              {t("job_details.back_to_offers")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-nav ${isRTL ? "rtl" : ""}`}>
      <Helmet>
        <title>{jobOffer?.title || t("job_details.default_title")} - MarocAdsZone</title>
        <meta
          name="description"
          content={jobOffer?.description || t("job_details.no_description")}
        />
        <meta
          property="og:title"
          content={`${jobOffer?.title || t("job_details.default_title")} - MarocAdsZone`}
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
          content={`${jobOffer?.title || t("job_details.default_title")} - MarocAdsZone`}
        />
        <meta name="twitter:description" content={jobOffer?.description} />
        <meta name="twitter:image" content={jobOffer?.images?.[0]?.url} />
        <meta itemProp="name" content={jobOffer?.title} />
        <meta itemProp="description" content={jobOffer?.description} />
        <meta itemProp="image" content={jobOffer?.images?.[0]?.url} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: jobOffer?.title,
            image: jobOffer?.images?.map((img) => img.url) || [],
            description: jobOffer?.description,
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
      
      {jobOffer?.images?.[0]?.url && (
        <img
          src={jobOffer.images[0].url}
          alt={`${jobOffer?.title} ${t("job_details.for_sale_in")} ${jobOffer?.city?.name} - ${jobOffer?.type}`}
          width={1200}
          height={630}
          style={{ display: "none" }}
        />
      )}
      
      <div className="app-container-max-xl page-py">
        <PageHeader>
          <h1 className="title-h1">{t("job_details.page_title")}</h1>
          <p className="text-base text-gray-400">{t("job_details.page_subtitle")}</p>
        </PageHeader>

        {/* Breadcrumb Navigation */}
        <div className="app-container-max-xl pt-4">
          <nav className={`flex items-center space-x-2 text-sm text-gray-600 mb-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <span className="font-medium text-gray-900">{t("job_details.offer")}</span>
            <span>/</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {slug}
            </span>
          </nav>
        </div>

        <div className={`flex flex-col lg:flex-row gap-4 justify-between mt-4 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <div className="flex-1">
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
                      {t("job_details.job_description")}
                    </h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {jobOffer?.description || t("job_details.no_description_available")}
                    </div>
                  </div>
                </MarkdownLayout>

                {/* Apply Button */}
                {jobOffer && (
                  <div className="mt-8 p-6 rounded-lg text-white text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {t("job_details.interested")}
                    </h3>
                    <button
                      onClick={handleApplyClick}
                      disabled={!canApply}
                      className={`inline-flex items-center px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg transition-colors shadow-lg ${
                        !canApply ? "cursor-not-allowed opacity-50" : "hover:bg-orange-50"
                      }`}
                      type="button"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      {t("job_details.apply_now")}
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
                      {t("job_details.cta_title")}
                    </h2>
                    <p className="text-lg mb-6">
                      {user && token
                        ? t("job_details.cta_message_logged")
                        : t("job_details.cta_message_not_logged")}
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                      <button
                        onClick={() => handleCTAClick("create")}
                        className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                      >
                        {user && token
                          ? t("job_details.publish_ad")
                          : t("job_details.create_account")}
                      </button>
                      <button
                        onClick={() => handleCTAClick("contact")}
                        className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                      >
                        {t("job_details.contact_us")}
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