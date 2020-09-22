import React, { useState } from 'react';
import { Button, Card, CardGroup, Col, Form, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData/index';
import './Booking.css'
import { useHistory } from "react-router-dom";

const Booking = () => {
    const { placeName}= useParams();

    const [booking, setBooking]=useState({
        origin:'',
        destination:'',
        fromDate: '',
        toDate:'',
        status: false
    });
 
    const place = fakeData.find((fd)=> fd.name && fd.name.toLowerCase() === placeName.toLowerCase());
    const {name ,description}=place;
    console.log("booking place", place);
    let history =useHistory();
    const handelBlur=(e)=>{
        e.preventDefault();
      
        let isFormValid ;
        if(e.target.name=== "origin" || e.target.name=== "destination")
        {
            const regex = /^[a-zA-Z ]{2,30}$/;
            isFormValid= regex.test(e.target.value.toLowerCase());
            console.log(isFormValid);
        }
        if(e.target.name === "fromDate" || e.target.name === "toDate")
        {
            isFormValid =true;
            console.log(isFormValid);
        }
       
            if(isFormValid)
            {
              let newUser= {...booking};
              newUser[e.target.name]=e.target.value;
              setBooking(newUser);
            }
          

    }
    const handelSubmit=()=>{
        history.push(`/hotel/${name}`)
    }
    return (
    
            <Container fluid>
            <Row>
                <Col className="md-6">
                    <div style={{ width: '18rem',color: 'white' }}>
                    <Card.Body>
                    <Card.Title>{name}</Card.Title>
                   <Card.Text>
                        {description}
                   </Card.Text>
                   </Card.Body>
                    </div>
                
                </Col>
            <Col className="md-6">
                <Form onSubmit={handelSubmit}>
                <Form.Group className="text-color" controlId="formBasicOrigin">
                    <Form.Label>Origin</Form.Label>
                    <Form.Control type="text" name='origin' onBlur={handelBlur} placeholder="Origin" required />
                    
                </Form.Group>
                <Form.Group controlId="formBasicDestination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" name='destination' value={name} onBlur={handelBlur} placeholder="destination"  required/>
                    
                </Form.Group>

                <Form.Group className="d-flex flex-row " controlId="formBasicDate">
                    
                    <Form.Label>From</Form.Label>
                   
                    <Form.Control type="date" name='fromDate' required/>
                    
                    <Form.Label>to</Form.Label>
                    <Form.Control type="date" name='toDate' required/>
                    
                </Form.Group>
               {/* <Link to={"/hotel/"+name}> */}
                <Button variant="primary" type="submit">
                    Start Booking
                </Button>
                {/* </Link> */}
                </Form>
        
           
            </Col>
        
            </Row>
            </Container>
       
    );
};

export default Booking;