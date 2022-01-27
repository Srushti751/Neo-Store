import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function Map() {


  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat:  19.013550, lng: 72.837600 }}
    >
        <Marker
          position={{
            lat:  19.013550,
            lng:72.837600
          }}
         
        />


    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapComp() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDDZHsDaduNg9mQiZ-vV9VADf7bJ4r9Nsk`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}