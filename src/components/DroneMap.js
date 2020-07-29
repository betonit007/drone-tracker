import React, { useContext, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import { DataContext } from "../context/data/dataState";
import { AuthContext } from "../context/auth/authState";
import Search from './Search'
import UserAccount from './UserAccount'
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
  mapTypeControl: window.innerWidth > 770 ? true : false,
  zoomControl: true
};

const DroneMap = () => {

  const { loading, downedDrones, selected, setSelected, listenForDownedDrones, addDrone, deleteDrone } = useContext(DataContext);
  const { authState: { currentUser } } = useContext(AuthContext)
  console.log(currentUser?.id)
  useEffect(() => {
    listenForDownedDrones()
  }, [])


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = (e) =>
    addDrone({
      userId: currentUser?.id,
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })

  const mapRef = useRef(); //by saving this ref to map, we can access anywhere we want in code and it will not cause rerender
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14)
  }, [])

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";


  return (
    <div className='relative' >
      <Search panTo={panTo} />
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
            options={{pixelOffset: new window.google.maps.Size(-8,-15)}}
          >
            <div>
              <h2>Drone Info</h2>
              <p>Crash reported: {formatRelative(selected.time.toDate(), new Date())}</p>
              {currentUser.id === selected.userId &&
                <button
                  className="my-2 p-2 rounded bg-gray-600 text-white shadow cursor-pointer"
                  onClick={() => deleteDrone(selected.id, currentUser?.id)}>
                  Delete
                </button>
              }
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <UserAccount />
    </div>
  );
};

export default DroneMap;
