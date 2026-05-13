import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useGetUserInfo,
  useUpdateUserMaps,
} from "../../services/api/fetchAuth";
import { useAuthStore } from "../../services/store/authStore";
import { UpdateUserInfo } from "../../services/types/auth";
import { Media } from "../../services/types/media";
import CustomToast from "../common/CustomToast";

type FormValues = {
  adress: string;
  coordinates: {
    latitude1: number;
    longitude1: number;
  };
  media: Media[] | null;
};

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const geocoder = new google.maps.Geocoder();

  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const { handleSubmit, reset } = useForm<FormValues>();
  const { data, refetch } = useGetUserInfo(token as string, false);
  const { mutateAsync: updateUser } = useUpdateUserMaps();
  useEffect(() => {
    if (token) refetch();
  }, [refetch, token]);

  useEffect(() => {
    reset({
      adress: data?.advantage,
    });
  }, [data, reset]);

  const onSubmit = () => {
    const updateData: UpdateUserInfo = {
      media: [],
      adresse: location,
      coordinates: {
        latitude: lat !== null ? lat.toString() : undefined,
        longitude: lon !== null ? lon.toString() : undefined,
      },
    };

    updateUser({ token: token as string, user: updateData })
      .then(() => {
        CustomToast(t("informations_mises_&_jour"), "success");
        refetch();
      })
      .catch((err) => {
        CustomToast(
          t("erreur_lors_de_la_mise_a_jour_des_informations"),
          "error"
        );
        console.log(err);
      });
  };

  useEffect(() => {
    setLocation(data?.adresse || "");
  }, [data?.adresse]);

  useEffect(() => {
    const position = { lat: 35.759465, lng: -5.833954 };
    //const numDeltas = 100;
    //const delay = 10; //milliseconds

    let marker: google.maps.Marker;
    /*let deltaLat: number;
    let deltaLng: number;
    let i = 0;*/

    function initMap() {
      const mapOptions: google.maps.MapOptions = {
        zoom: 16,
        center: position,
      };
      const map = new window.google.maps.Map(mapRef.current!, mapOptions);

      let marker: google.maps.Marker;

      function createMarker(position: google.maps.LatLng) {
        if (marker) {
          marker.setPosition(position);
        } else {
          marker = new window.google.maps.Marker({
            position: position,
            map: map,
            title: `Latitude: ${position.lat()} | Longitude: ${position.lng()}`,
          });
        }
      }
      map.addListener("click", function (event: google.maps.MouseEvent) {
        if (event.latLng) {
          const latLng = event.latLng;
          createMarker(latLng);
          geocoder.geocode({ location: latLng }, function (resultse, status) {
            if (status === "OK") {
              if (resultse && resultse[0]) {
                const addressResults = resultse[0].formatted_address;
                console.log("Address Results:", addressResults);
                const result = {
                  lat: event?.latLng?.lat(),
                  lng: event?.latLng?.lng(),
                  address: addressResults,
                };
                transition(
                  result as unknown as {
                    lat: number;
                    lng: number;
                    addressResults: string;
                  }
                );
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
          map.setCenter(latLng); // Recenter the map to the marker position
        }
      });

      map.addListener("click", function (event: google.maps.MouseEvent) {
        if (event.latLng) {
          const latLng = event.latLng;
          console.log(latLng);
          let addressResults;
          geocoder.geocode({ location: latLng }, function (resultse, status) {
            if (status === "OK") {
              if (resultse) {
                // console.log(resultse);
                addressResults = resultse[0].formatted_address;
                setLocation(addressResults);
              } else {
                console.log("No results found");
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });

          const result = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            address: addressResults,
          };
          transition(
            result as unknown as {
              lat: number;
              lng: number;
              addressResults: string;
            }
          );
        }
      });

      // Create autocomplete object for input field
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current!
      );
      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place: google.maps.places.PlaceResult | undefined =
          autocomplete.getPlace();
        if (!place || !place.geometry || !place.geometry.location) {
          console.error(
            "No location found for input:",
            inputRef.current!.value
          );
          return;
        }
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          addressResults: "",
        };
        createMarker(new google.maps.LatLng(newPosition.lat, newPosition.lng));
        transition(newPosition);
        updateHiddenFields(place);
        map.setCenter(place.geometry.location);
      });
    }

    function transition(result: {
      lat: number;
      lng: number;
      addressResults: string;
    }) {
      const newPosition = {
        lat: result.lat,
        lng: result.lng,
        addressResults: result.addressResults,
      };
      console.log("New positioneeeeeeeee:", result); // Log the new position
      // Update marker position
      if (marker) {
        marker.setPosition(newPosition);
      } else {
        console.error("Marker not found"); // Log an error if the marker is not found
      }

      // Update location and other states
      setLat(newPosition.lat);
      setLon(newPosition.lng);
    }
    /* function moveMarker() {
       position.lat += deltaLat;
       position.lng += deltaLng;
       const latlng = new window.google.maps.LatLng(position.lat, position.lng);
       marker.setTitle(`Latitude: ${position.lat} | Longitude: ${position.lng}`);
       marker.setPosition(latlng);
 
       if (i !== numDeltas) {
         i++;
         setTimeout(moveMarker, delay);
       }
     }*/

    function updateHiddenFields(place: google.maps.places.PlaceResult) {
      console.log("Place:", place);
      const newLat = place.geometry?.location?.lat();
      const newLon = place.geometry?.location?.lng();

      const newLocation = place.formatted_address || "";
      console.log("aaaaaaaaaa:", place.address_components);
      const newPostalCode =
        place.address_components?.find((component) =>
          component.types.includes("postal_code")
        )?.long_name || "";
      const newCountry =
        place.address_components?.find((component) =>
          component.types.includes("country")
        )?.long_name || "";
      console.log("New Latitude:", newLat);
      console.log("New Longitude:", newLon);
      console.log("New Location:", newLocation);
      console.log("New Postal Code:", newPostalCode);
      console.log("New Country:", newCountry);

      setLat(newLat || null);
      setLon(newLon || null);
      setLocation(newLocation);
      setPostalCode(newPostalCode);
      setCountry(newCountry);
    }
    initMap();

    // Clean up function
    return () => {
      // Clean up your Google Maps resources here if needed
    };
  }, []); // empty dependency array to run only once on mount

  // Log hidden input values whenever they change
  useEffect(() => {
    console.log("Location:", location);
    console.log("Postal Code:", postalCode);
    console.log("Country:", country);
    console.log("Latitude:", lat);
    console.log("Longitude:", lon);
  }, [location, postalCode, country, lat, lon]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-4">
          <input
            className={`input`}
            type="text"
            ref={inputRef}
            value={location}
            placeholder="Enter a location"
            onChange={(e) => setLocation(e.target.value)} // Add onChange event handler
            style={{ marginBottom: "" }}
          />
        </div>
        <div ref={mapRef} style={{ width: "700px", height: "360px" }}></div>
        {/* Hidden input fields */}
        <input type="hidden" id="location" name="location" value={location} />
        <input
          type="hidden"
          id="postal_code"
          name="postal_code"
          value={postalCode}
        />
        <input type="hidden" id="country" name="country" value={country} />
        <input type="hidden" id="lat" name="lat" value={lat ?? ""} />
        <input type="hidden" id="lon" name="lon" value={lon ?? ""} />
        <div className="">
          <button type="submit" className={`btn-primary mt-3 `}>
            <span>enregistrer</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MapComponent;
