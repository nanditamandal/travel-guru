import React from 'react';
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const CardDisplay = (props) => {
    const {name, description} =props.place;
    return (
        <Card style={{ width: '30rem' }}>
                    
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>
                                        {description}
                                        </Card.Text>
                                        <Link to={"/booking/"+name}>
                                        <Button variant="primary">Booking -></Button>
                                        </Link>
                                    </Card.Body>
                        
                                    </Card>
    );
};

export default CardDisplay;