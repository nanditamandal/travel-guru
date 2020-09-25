import React, { useEffect, useState } from 'react';
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import Sajek  from '../../Image/Sajek.png';
import Sreemongol  from '../../Image/Sreemongol.png';
import sundorbon from '../../Image/sundorbon.png';
import fakeData from '../fakeData/index';
import CardDisplay from '../CardDisplay/CardDisplay';



import './Home.css';

const Home = () => {
   
    const [count , setCount]=useState();

    useEffect(()=>{
        let number =0;
       let interval= setInterval(() => {
                setCount(number+1);
                number=number+1;
              
                if(number> 3)
                {
                    number =0;
                 
                }

          }, 3000);
         

    },[])

    const places = fakeData.filter(fd=>fd.id && parseInt(fd.id)=== count);
    console.log(places)
   
    return (
        <div  >
        
            <Container fluid>
            <Row>
            <Col className="md-3">
                <div>
                    {
                        places.map(place=><CardDisplay place={place}></CardDisplay>)
                    }
                   
                        
                </div>
            </Col>
            <Col className="md-9">
           
            <CardGroup>
                {
                    (count===1)?   
                    <Card className="displayPlace"style={{border: '4px solid red'}}>
                    <Link to="/booking/coxBazar">
                    <Card.Img variant="top" src={Sajek}/>
                    <div className="text-block">
                    <h5>COX'S BAZAR</h5>
                
                    </div>
                    </Link>    
                </Card>:
                       <Card className="displayPlace">
                    
                       <Card.Img variant="top" src={Sajek}/>
                       <div className="text-block">
                       <h5>COX'S BAZAR</h5>
                   
                       </div>
                        
                   </Card>
                }
               
                 
                  {
                      (count===2)?
                      <Card className="displayPlace" style={{border: '4px solid red'}}>
                        <Link to="/booking/sreemangal">

                        <Card.Img  src={Sreemongol} />
                        <div className="text-block">
                        <h5>Sreemongol</h5>
                        </div>
                        </Link>
                    </Card>:
                    <Card className="displayPlace">
                   

                    <Card.Img  src={Sreemongol} />
                    <div className="text-block">
                    <h5>Sreemongol</h5>
                    </div>
                   
                </Card>

                  }
                  {
                     (count===3)?
                      <Card className="displayPlace" style={{border: '4px solid red'}} >
                        <Link to="/booking/sundarban">
                        <Card.Img variant="top" src={sundorbon}/>
                        <div className="text-block">
                        <h5>Sundorbon</h5>
                    
                        </div>
                        </Link>
                    
                        </Card>:
                        <Card className="displayPlace" >
                       
                        <Card.Img variant="top" src={sundorbon}/>
                        <div className="text-block">
                        <h5>Sundorbon</h5>
                    
                        </div>
                       
                    
                        </Card>
                   

                  }
                
                
                </CardGroup>
            </Col>
          
            </Row>
            </Container>
            </div>
        
    );
};

export default Home;
       
 