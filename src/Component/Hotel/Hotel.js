import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import hotelName from '../fakeData/hotelName';
import HotelDetails from '../HotelDetails/HotelDetails';

import GoogleMapReact from 'google-map-react';
import { Card, Col, Row } from 'react-bootstrap';
import Map from 'google-map-react';
import mapStyles from '../Map/mapStyle';

const Hotel = () => {
    const {placeName}= useParams();

    let hotels =hotelName.filter(hotel=> hotel.place && hotel.place.toLowerCase() === placeName.toLowerCase());
    console.log("place name ",placeName);
    console.log("hotels fake data", hotelName);
    console.log("findd hotel",hotels);

    const [logInUser, setLogInUser]= useContext(UserContext);
    const location = {
        center: {lat: 23.684994, lng: 90.356331}, 
        zoom: 12
     }
   
    return (
        <div>
            <Row>
                <Col className="md-6">
                    {
                        hotels.map(hotel=>
                            <HotelDetails hotel={hotel}></HotelDetails>
                        )
                    }
                </Col>

                <Col className="md-6">
                {/* <div className="row w-100">
                <div
                className="col text-center"
                style={{width:"100%", height:"550px"}}
                >
                 <Map 
                    bootstrapURLKeys={{key:'AIzaSyCwLjkPeoh7UYK4woXbMcfaWxffTXv-yOA' }}
                    defaultZoom={13}
                    options={{styles: mapStyles}}
                    defaultCenter={{

                        lat: 23.684994,
                        lng:90.356331
                    }}
                 
                 />
                 </div>

            </div>
     */}

                </Col>
            </Row>
        </div>
    );
};

export default Hotel;