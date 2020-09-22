import React, { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { UserContext } from '../../App';





const HotelDetails = (props) => {
    const {name, price, image,description,offer, capacity}=props.hotel;
    console.log(props.hotel);
    const [logInUser, setLogInUser]= useContext(UserContext);
    console.log(logInUser.email);
    const location = {
        center: {lat: 23.684994, lng: 90.356331}, 
        zoom: 12
     }
     const mapStyles = {
        width: '100%',
        height: '100%'
      };
    return (
        <>
        
        
        <div>
        
                        <Card style={{ width: '100%', height:'90%' }}>
                        <Row>
                            <Col className="md-6">
                                <Card.Img variant="top" src={image}/>
                            </Col>
                            <Col className="md-6">
                                    <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>
                                        <p>{capacity}</p>
                                        <p>{description}</p>
                                        <p>{offer}</p>
                                        <p>{price}</p>
                                    </Card.Text>
                                    
                                </Card.Body>

                            </Col>
                        </Row>
                
                
                    </Card>
            

               
            
        </div>
        </>
    );
};

export default HotelDetails;