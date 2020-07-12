import React, { useContext } from "react";
import { DataContext } from "../context/data/dataState";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption
// } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { blueMax } from "../assets/mapStyles/mapStyles";

const libraries = ["places"]; //aviods unecessary rerenders by placing array in a variable
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 35.8235,
  lng: -78.8256,
};

const options = {
  styles: blueMax,
};

const DroneMap = () => {
  const { addDrone, loading, downedDrones } = useContext(DataContext);
  console.log(downedDrones);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={(e) =>
          addDrone({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
          })
        }
      >
        {downedDrones && downedDrones.map((drone, i) => (
          <Marker
            key={i}
            position={{ lat: drone.lat, lng: drone.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default DroneMap;
