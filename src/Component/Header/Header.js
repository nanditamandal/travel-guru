import React, { useContext } from 'react';
import { Button, Container, Form, FormControl, Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../Logo.png';
import './Header.css';



const Header = () => {
  const[logInUser, setLogInUser]= useContext(UserContext);
    const imageStyle={
        width: '100px',
        height:' 80px',
        marginLeft: '40px'
    }
    const handelLogOut=()=>{
        setLogInUser({
          
        })
    }
    
 
    return (
      <Container fluid>
          <Navbar bg="" expand="lg">
          <Navbar.Brand >
              <img src={logo} alt="logo" style={imageStyle}/>
          </Navbar.Brand>
          <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-5" />
            
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" >
              <Nav.Link className="nav" href=""><Link className="link" to='/home'>Home</Link></Nav.Link>
              <Nav.Link className="nav" href="#link"><Link className="link" to='/login'>Login</Link></Nav.Link>
              <Nav.Link className="nav" href="#link"><Link className="link" to='/'>Contact</Link></Nav.Link>
              <Nav.Link className="nav" href="#link"><Link className="link" to='/'>Blog</Link></Nav.Link>
              
              <Button className='btn' variant="outline-success">Search</Button>
              <Button className='btn' variant="outline-success" onClick={handelLogOut}>Sign Out</Button>
            </Nav>
          
          </Navbar.Collapse>
          {
            logInUser.name ? <h5>{logInUser.displayName}</h5> : <h5>{logInUser.email}</h5>
          }
          
  </Navbar>
  </Container>

    )};

export default Header;