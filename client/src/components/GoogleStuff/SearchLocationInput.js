import React, { useState, useEffect, useRef } from "react";
import TextField from '@mui/material/TextField';

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              callback();
            }
        };
    }else{
        script.onload = () => callback();
    }

    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script);
}

function handleScriptLoad(updateQuery, autoCompleteRef, callBackHandleChange) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["address"], componentRestrictions: { country: "us" } }
    );
    autoComplete.setFields(["address_components", "formatted_address", "geometry"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery, callBackHandleChange)
    );
}

async function handlePlaceSelect(updateQuery, callBackHandleChange) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    const geoLocation = addressObject.geometry.viewport;
    updateQuery(query);
    callBackHandleChange(query)
    //console.log(geoLocation)
}


function SearchLocationInput({BoxStyle, callBackHandleChange}) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    useEffect(() => {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=[API_KEY]&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef, callBackHandleChange)
      );
    }, []);

    const googleHandleChange = (e) =>{
        setQuery(e.target.value)
    }

    
  
    return (
        <TextField 
            id="outlined-basic" 
            label="Address" 
            variant="outlined"
            inputRef={autoCompleteRef}
            onChange={googleHandleChange}
            value={query}
            sx={BoxStyle}
        />
    );
}

export default SearchLocationInput