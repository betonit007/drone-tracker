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
      className="h-10 w-10 ml-4 transform duration-75 focus:outline-none hover:rotate-45 hover:scale-110"
    >
      <img src="./compass.svg" alt="compass"/>
    </button>
  );
};

export default Locate;
