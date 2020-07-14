import React from "react";

const Locate = ({ panTo }) => {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
      className="h-12 w-12 absolute z-10 right-0 top-0 m-2"
    >
      <img src="./compass.png" alt="compass" />
    </button>
  );
};

export default Locate;
