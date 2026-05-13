import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import axiosConfig, { apiClientV2 } from "../../services/config/axiosConfig";
import { PrestataireCardV2 } from "../annonce/PrestataireCard";
import { Annonce } from "../../services/types/annonce";

const HomePaginatedAnnonces = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchAnnonces = async () => {
    try {
      setError(null);

      console.log("🔍 Fetching top 8 announcements");
      const response = await apiClientV2.get("/announces", {
        params: {
          page: 1,
          per_page: 8,
        },
      });

      // Log the complete response structure
      console.log("📦 Raw response:", response.data);
      console.log("📦 Response status:", response.status);
      console.log("📦 Response type:", typeof response.data);

      let announcements: Annonce[] = [];
      // Handle different response formats
      if (response.data) {
        // If response.data has nested structure: data.items (your API format)
        if (
          response.data.data &&
          response.data.data.items &&
          Array.isArray(response.data.data.items)
        ) {
          announcements = response.data.data.items;
          console.log(
            "✅ Found announcements in data.items property:",
            announcements.length
          );
        }
        // If response.data has a 'data' property (Laravel pagination format)
        else if (response.data.data && Array.isArray(response.data.data)) {
          announcements = response.data.data;
          console.log(
            "✅ Found announcements in data property:",
            announcements.length
          );
        }
        // If response.data is directly an array
        else if (Array.isArray(response.data)) {
          announcements = response.data;
          console.log(
            "✅ Found announcements as direct array:",
            announcements.length
          );
        }
        // If response has items property
        else if (response.data.items && Array.isArray(response.data.items)) {
          announcements = response.data.items;
          console.log(
            "✅ Found announcements in items property:",
            announcements.length
          );
        }
        // If response has announcements property
        else if (
          response.data.announcements &&
          Array.isArray(response.data.announcements)
        ) {
          announcements = response.data.announcements;
          console.log(
            "✅ Found announcements in announcements property:",
            announcements.length
          );
        }
        // If response has announces property
        else if (
          response.data.announces &&
          Array.isArray(response.data.announces)
        ) {
          announcements = response.data.announces;
          console.log(
            "✅ Found announcements in announces property:",
            announcements.length
          );
        } else {
          console.log(
            "❌ Could not find announcements in any expected property"
          );
          console.log("Available properties:", Object.keys(response.data));
        }
      }

      if (announcements.length > 0) {
        // Limit to 8 announcements
        const limitedAnnouncements = announcements.slice(0, 8);
        setAnnonces(limitedAnnouncements);
        console.log(
          "✅ Set announcements state with",
          limitedAnnouncements.length,
          "items"
        );
        console.log("✅ First announcement:", limitedAnnouncements[0]);
      } else {
        console.warn("⚠️ No announcements found in response");
        console.log(
          "📦 Full response structure:",
          JSON.stringify(response.data, null, 2)
        );
        setAnnonces([]);
      }
    } catch (error: unknown) {
      console.error("❌ Error fetching announcements:", error);
      setError("Impossible de charger les annonces");
    } finally {
      setIsInitialLoad(false);
    }
  };
  // Initial load
  useEffect(() => {
    fetchAnnonces();
  }, []);

  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Découvrez les Annonces Près de Chez Vous"
        subtitle="Explorez les dernières annonces disponibles"
        buttonTitle="Voir Toutes les Annonces"
        to="/annonces"
      />{" "}
      {/* Annonces Grid */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isInitialLoad && (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="animate-pulse bg-white shadow-sm rounded-lg p-4"
              >
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {!isInitialLoad &&
          annonces.map((annonce) => (
            <PrestataireCardV2 key={annonce.id} annonce={annonce} />
          ))}
      </div>{" "}
      {/* Error Message */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {/* No Announcements Message */}
      {!isInitialLoad && !error && annonces.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Aucune annonce disponible pour le moment
          </p>
        </div>
      )}
    </section>
  );
};

export default HomePaginatedAnnonces;
