import React, { useState } from 'react';
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Sajek  from '../../Image/Sajek.png';
import Sreemongol  from '../../Image/Sreemongol.png';
import sundorbon from '../../Image/sundorbon.png';
import index from '../fakeData/index.js';




import './Home.css';

const Home = () => {
    
    
    
    return (
        <div  >
        
            <Container fluid>
            <Row>
            <Col className="md-3">
                <div>
            <Card style={{ width: '30rem' }}>
              
                <Card.Body>
                    <Card.Title>Cox Bazar</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Link to="/booking/coxBazar">
                    <Button variant="primary">Booking -></Button>
                    </Link>
                </Card.Body>
                
                </Card>
                </div>
            </Col>
            <Col className="md-9">
           
            <CardGroup>
               
                    <Card>
                        <Link to="/booking/coxBazar">
                        <Card.Img variant="top" src={Sajek}/>
                        <div className="text-block">
                        <h5>COX'S BAZAR</h5>
                    
                        </div>
                        </Link>    
                    </Card>
                  
                <Card>
                    <Link to="/booking/sreemangal">

                    <Card.Img  src={Sreemongol} />
                    <div className="text-block">
                    <h5>Sreemongol</h5>
                    </div>
                    </Link>
                </Card>
                <Card>
                <Link to="/booking/sundarban">
                    <Card.Img variant="top" src={sundorbon}/>
                    <div className="text-block">
                    <h5>Sundorbon</h5>
                  
                    </div>
                    </Link>
                    
                </Card>
                </CardGroup>
            </Col>
          
            </Row>
            </Container>
            </div>
        
    );
};

export default Home;
       
 