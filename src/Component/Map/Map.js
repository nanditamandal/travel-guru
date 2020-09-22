
import React, { Component } from 'react';
import Map from 'google-map-react';
import mapStyles from './mapStyle';



//copy code from https://github.com/google-map-react/google-map-reactc


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
     <>
     <div className="row w-100">
         <div
             className="col text-center"
             style={{width:"100%", height:"550px"}}
             >
                 <Map 
                    bootstrapURLKeys={{key:'AIzaSyCwLjkPeoh7UYK4woXbMcfaWxffTXv-yOA'}}
                    defaultZoom={13}
                    options={{styles: mapStyles}}
                    defaultCenter={{

                        lat: 23.684994,
                        lng:90.356331
                    }}
                 
                 />
         </div>

     </div>
      </>
    );
  }
}

export default SimpleMap;