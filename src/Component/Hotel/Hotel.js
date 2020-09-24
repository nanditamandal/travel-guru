import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import hotelName from '../fakeData/hotelName';
import HotelDetails from '../HotelDetails/HotelDetails';

import GoogleMapReact from 'google-map-react';
import { Card, Col, Row } from 'react-bootstrap';

import MapDisplay from '../Map/MapDisplay';

const Hotel = () => {
    const {placeName}= useParams();

    let hotels =hotelName.filter(hotel=> hotel.place && hotel.place.toLowerCase() === placeName.toLowerCase());
    console.log("place name ",placeName);
    console.log("hotels fake data", hotelName);
    console.log("findd hotel",hotels);

    const [logInUser, setLogInUser]= useContext(UserContext);
    const location = [
        {place: 'coxBazar', lat:'21.510741', lng: '92.027319'} ,
        {place: 'sreemangal', lat:'24.3065193', lng: '91.72955030000003'} ,
        {place: 'sundarban', lat:'24.3065193', lng: '91.72955030000003'} ,

        
    ]
    console.log(parseFloat(location[0].lat));


    const graph=location.filter(lo=>lo.place && lo.place.toLowerCase()=== placeName.toLowerCase());
  
   
    return (
        <div>
            <Row>
                <Col className="md-6">
                    <h3 style={{color: 'white'}}>Welcome {placeName}</h3>
                    {
                        hotels.map(hotel=>
                            <HotelDetails hotel={hotel}></HotelDetails>
                        )
                    }
                </Col>

                <Col className="md-6">
                <div className="row w-100">
                <div
                className="col text-center"
                style={{width:"100%", height:"550px"}}
                >
                    {
                        graph.map(gh=><MapDisplay gh={gh}></MapDisplay>)
                    }
                
                 </div>

            </div>
    

                </Col>
            </Row>
        </div>
    );
};

export default Hotel;