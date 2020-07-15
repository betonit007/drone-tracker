import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import Locate from './Locate'
import "@reach/combobox/styles.css";

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      //prefer locations near these coordinates
      location: { lat: () => 35.8235, lng: () => -78.8256 },
      radius: 200000, //in meters of center on map
    },
  });

  return (
    <div className="search focus:outline-none">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (err) {
            console.log(err.message);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Go to a location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description }, i) => (
                <ComboboxOption key={i} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <Locate panTo={panTo}/>
    </div>
  );
};

export default Search;
