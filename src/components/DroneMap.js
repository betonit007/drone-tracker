import React, { useContext, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import { DataContext } from "../context/data/dataState";
import Search from './Search'
import Locate from './Locate'
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
  disableDefaultUI: true,
  mapTypeControl: true,
  zoomControl: true
};

const DroneMap = () => {
  const { addDrone, loading, downedDrones, selected, setSelected } = useContext(
    DataContext
  );
  console.log(downedDrones);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback(
    (e) =>
      addDrone({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      }),
    []
  ); //similiar to useEffect (function should not rerender unless dependency changes (inside []'s))

  const mapRef = useRef(); //by saving this ref to map, we can access anywhere we want in code and it will not cause rerender
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({lat, lng}) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14)
  }, [])

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";


  return (
    <div className='relative' >
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {downedDrones &&
          downedDrones.map((drone, i) => (
            <Marker
              key={`${drone.lat}-${drone.lng}`}
              position={{ lat: drone.lat, lng: drone.lng }}
              icon={{
                url: "./crash.png",
                scaledSize: new window.google.maps.Size(40, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 35),
              }}
              onClick={() => {
                setSelected(drone);
              }}
            />
          ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Drone Info</h2>
              <p>Crash reported: {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default DroneMap;
