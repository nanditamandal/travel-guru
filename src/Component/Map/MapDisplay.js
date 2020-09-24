
import React, { Component } from 'react';
import Map from 'google-map-react';
import mapStyles from './mapStyle';



const MapDisplay = (props) => {
  const{lat, lng}=props.gh;
  const latitude= parseFloat(lat);
    const longitude =parseFloat(lng);
 
  return (
          
    <Map 
    bootstrapURLKeys={{key:'AIzaSyAbviaEzzPoV3y33LBME2yDUYccHJgbB5M' }}
    defaultZoom={13}
    options={{styles: mapStyles}}
    defaultCenter={{

        lat:latitude,
        lng:longitude
    }}
 
 />
  );
};

export default MapDisplay;

