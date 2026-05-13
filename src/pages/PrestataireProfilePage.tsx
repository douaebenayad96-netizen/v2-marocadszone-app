import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import FixedCTABox from "../components/annonce/FixedCTABox";
import PrestataireAboutSection from "../components/annonce/PrestataireAboutSection";
import ReservationProviderBox from "../components/annonce/ReservationProviderBox";
import SimilarPrestateursList from "../components/annonce/SimilarPrestateursList";
import Banner300X250 from "../components/banners/Banner300X250";
import Banner300X600 from "../components/banners/Banner300X600";
import Banner728X90 from "../components/banners/Banner728X90";
import Banner970X90 from "../components/banners/Banner970X90";
import GalleryWindows from "../components/common/GalleryWindows";
import ModalLayout from "../components/layouts/ModalLayout";
import SectionHeader from "../components/layouts/SectionHeader";
import { useAnnonceBySlug } from "../services/api/fetchAnnonce";

const PrestataireProfilePage = () => {
  const { t } = useTranslation();
  const [showReservationMobileModal, setShowReservationMobileModal] =
    useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: annonce,
    isLoading,
    isError,
  } = useAnnonceBySlug(slug as string);

  if (annonce?.images) {
    annonce.images.forEach((img, index) => {
      console.log(`Image ${index}:`, img);
    });
  }

  if (isError) {
    navigate("/404");
    return <PrestataireProfilePage.Skeleton />;
  }

  if (isLoading || !annonce) {
    return <PrestataireProfilePage.Skeleton />;
  }

  console.log(annonce);

  return (
    <div className="pt-nav">
      <Helmet>
        <title>
          {annonce?.title} à vendre à {annonce.city?.label} -{" "}
          {annonce.subcategory?.label} - MarocAdsZone
        </title>
        <meta
          name="description"
          content={`${annonce.title}, en bon état, à vendre à ${annonce.city?.label}. Prix compétitif. Consultez l’annonce sur MarocAdsZone.`}
        />

        {/* facebook, linkedin and twitter meta */}
        <meta
          property="og:title"
          content={`${annonce?.title} - MarocAdsZone`}
        />
        <meta property="og:description" content={annonce?.description} />
        <meta property="og:image" content={annonce?.image_urls?.[0]} />
        <meta
          property="og:url"
          content={`https://marocadszone.com/annonce/${annonce?.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${annonce?.title} - MarocAdsZone`}
        />
        <meta name="twitter:description" content={annonce?.description} />
        <meta name="twitter:image" content={annonce?.image_urls?.[0]} />
        {/* this for google */}
        <meta itemProp="name" content={annonce?.title} />
        <meta itemProp="description" content={annonce?.description} />
        <meta itemProp="image" content={annonce?.image_urls?.[0]} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: annonce?.title,
            image: annonce?.image_urls?.map((img) => img),
            description: annonce?.description,
            brand: "MarocAdsZone",
            url: `https://marocadszone.com/annonce/${annonce?.slug}`,
            offers: {
              "@type": "Offer",
              price: annonce?.price || "0",
              priceCurrency: "MAD",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>
      </Helmet>
      <img
        src={annonce?.image_urls?.[0]}
        alt={`${annonce?.title} à vendre à ${annonce.city?.label} - ${annonce.subcategory?.label}`}
        width={1200}
        height={630}
        style={{ display: "none" }}
      />

      <div className="min-h-screen">
        <div className="w-full flex justify-center items-center pt-4">
          <Banner728X90 />
        </div>

        {/* Breadcrumb Navigation */}
        <div className="app-container-max-xl pt-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span className="font-medium text-gray-900">
              {annonce?.subcategory?.label}
            </span>
            <span>/</span>
            <span className="font-medium text-gray-900">
              {annonce?.subcategory?.label}
            </span>
            <span>/</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {slug}
            </span>
          </nav>
        </div>

        <GalleryWindows annonce={annonce} />
        <div className="app-container-max-xl pt-6 page-pb flex justify-between flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-28">
          <div className="flex-1">
            <PrestataireAboutSection annonce={annonce} />
            <FixedCTABox annonce={annonce} />
          </div>
          <aside className="min-w-[320px] h-fit flex flex-col gap-4 bg-white sticky top-[88px]">
            {/* banner */}
            <Banner300X250 />
            <Banner300X600 />
          </aside>
        </div>
        {/* similar prestataires */}
        <div className="bg-gray-50 page-pb">
          <div className="app-container-max-xl py-10 flex flex-col gap-10">
            <SectionHeader
              title={"Similaire Annonces a " + annonce?.title}
              subtitle={t("similaire_prestataires.subtitle")}
            />
            {/* services list */}
            <SimilarPrestateursList annonce={annonce} />
          </div>
        </div>
        {/* banner */}
        <div className="w-full flex justify-center items-center py-4">
          <Banner970X90 />
        </div>
      </div>
      {/* mobile Reservation
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 shadow-md backdrop:blur-md z-10"
      >
        <button
          onClick={() => setShowReservationMobileModal(true)}
          className="btn-primary w-full"
        >
          {/* {
            t('demander_un_rendez_vous')
          } */}
      {/*
            t('voire_les_disponibilites')
       
        </button>
      </div>*/}
      <ModalLayout
        isOpen={showReservationMobileModal}
        setIsOpen={setShowReservationMobileModal}
        defaultHeader
        headerText={t("reserver_avec", { name: annonce.title })}
        className="w-full h-full bg-white p-0 shadow-md z-30"
      >
        <div className="mt-8 p-4">
          <ReservationProviderBox annonce={annonce} />
        </div>
      </ModalLayout>
    </div>
  );
};

PrestataireProfilePage.Skeleton = () => {
  return (
    <div className="pt-nav">
      <div className="min-h-screen">
        <GalleryWindows.Skeleton />
        <div className="app-container-max-xl pt-4 page-pb flex justify-between flex-col lg:flex-row gap-5 lg:gap-8 xl:gap-28">
          <div className="flex-1">
            <PrestataireAboutSection.Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestataireProfilePage;
