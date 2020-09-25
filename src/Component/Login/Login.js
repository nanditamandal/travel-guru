import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import {UserContext} from '../../App';
import { useForm } from 'react-hook-form';
import './Login.css';


import { Link, useHistory, useLocation } from 'react-router-dom';




const Login = () => {

  
  let history = useHistory();
  let location = useLocation();

 let { from } = location.state || { from: { pathname: "/" } };
 
    const [logInUser, setLogInUser]= useContext(UserContext);

    let provider = new firebase.auth.GoogleAuthProvider();

   

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const [activeUser,  setActiveUser]=useState(false);
    const [error, setError]=useState({
      fieldName:'',
      errorMessage:'',
      status: false
    
    });

  
    const [fromShow,  setFromShow]=useState(true);
    const [user, setUser]=useState({
        
        firstName: '', 
        lastName: '',
        email:'',
        
        password:'',
        error:'',
        success: ''
      
      });


    const handelBlur=(e)=>{
        let isFormValid;
       
    if(e.target.name === 'email')
    {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isFormValid= re.test(e.target.value.toLowerCase());
      console.log(isFormValid);
        if(!isFormValid){
          checkError(e.target.name,'example@gmail.com');
          e.target.value="";
        }
    }
    if(e.target.name === 'password')
    {
       const pass =e.target.value.length>6;
       const passNumber=/\d{1}/.test(e.target.value);

      isFormValid=pass && passNumber ;
      if(!isFormValid){
        checkError(e.target.name,'length at least 7 ');
      }
    }
    if(e.target.name === 'confirmPassword')
    {
        if(e.target.value !== user.password)
        {
          checkError(e.target.name,' not match');
            
        }
        if(e.target.value === user.password)
        {
          isFormValid = true;
          alert("match");
            
        }   
    }
    if(e.target.name === 'firstName' || e.target.name === 'lastName')
    {
       
      const nameLength= e.target.value.length>2;
      const re =/^[a-zA-Z]+$/;
      const nameType= re.test(e.target.value);
      isFormValid= nameLength && nameType;
      if(!isFormValid){
        checkError(e.target.name,' length at least 3 and all characters');
      }
       
      
    }


    if(isFormValid)
    {
      let newUser= {...user};
      newUser[e.target.name]=e.target.value;
      const errorStatus={
        fieldName:'',
        errorMessage: '',
        status: false
      }
      setError(errorStatus);
      setUser(newUser);
    } 

    }
    const  checkError=(fieldName, message)=>{
      const errorStatus={
        fieldName:fieldName,
        errorMessage: message,
        status: true
      }
      setError(errorStatus);
      
    }


    const handelCreateAccount= (e)=>{
        e.preventDefault();
        console.log("sign up");
        firebase.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          let newUser=res.user;
          newUser.error ='';
          newUser.success = true;
          setUser(newUser);
         
         })
        .catch((error)=> {
          let newUser={};
          var errorMessage = error.message;
       
          newUser.error=errorMessage;
          newUser.success = false;
          alert(errorMessage);
          
   
     });


    }
    const handelSignIn=(e)=>{
        e.preventDefault();
        
        firebase.auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then(res=>{
            let newUser=res.user;
            const name=false;
            const displayName ='';
            reDirect(displayName,  newUser.email, name, newUser);
         })
        .catch(function(error) {
          
            let newUser={};
            var errorMessage = error.message;
         
            newUser.error=errorMessage;
            newUser.success = false;
          
            alert(errorMessage);
          });
    }
    
  
    const handelGoogleSignIn=(e)=>{
        e.preventDefault();
        firebase.auth().signInWithPopup(provider)
     
        .then(function(res) {
            const newUser =res.user;
            const {displayName, email}=newUser;
            const name =true;
            reDirect(displayName, email, name, newUser);
           
        
          }).catch(function(error) {
            let newUser={};
            var errorMessage = error.message;
         
            newUser.error=errorMessage;
            newUser.success = false;
            alert(errorMessage);
          });

    }
    const handelFacebookSignIn=(e)=>{
        e.preventDefault();
        const fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider)
        .then(res=> {
            let token = res.credential.accessToken;
            let newUser=res.additionalUserInfo.profile;
            const name =true;
            reDirect(newUser.name, newUser.email,name, newUser);
           
       
            
          }).catch(function(error) {
            let newUser={};
            var errorMessage = error.message;
         
            newUser.error=errorMessage;
            newUser.success = false;
            alert(errorMessage);
          });
    }
    const reDirect=(displayName, email,name, newUser)=>{
            const signInUser={
              displayName:displayName,
              email: email,
              name: name
          }
          newUser.success = true;
          setUser(newUser);

          setLogInUser(signInUser);
          history.replace(from);  

    }

    return (
        <div className='login' >
          
        {
           ( !fromShow) && 
            <Form onSubmit={handelCreateAccount}>
              <h2>Create An Account</h2>
            <label for="firstName" className="text-color">First Name:</label>
            <input type="text" name="firstName" id="" onBlur={handelBlur} placeholder="enter first name" required/>
            <br/>
            {error.status && (error.fieldName==='firstName') && <span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
            <label for="lastName" className="text-color">Last Name:</label>
            <input type="text" name="lastName" id="" onBlur={handelBlur} placeholder="enter last name" required/>
            <br/>
            {error.status && (error.fieldName==='lastName')&& <span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
            <label for="email" className="text-color">Email:</label>
            <input type="text" name="email" id="" onBlur={handelBlur} placeholder="enter email" required/>
            <br/>
            {error.status &&(error.fieldName==='email')&&<span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
            <label for="password" className="text-color">Password:</label>
            <input type="password" name="password"  onBlur={handelBlur} placeholder="Enter password" required/>  <br/>
            {error.status && (error.fieldName==='password')&& <span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
            <label for="confirmPassword" className="text-color">Confirm Password:</label>
            <input type="password" name="confirmPassword" onBlur={handelBlur}  placeholder="enter again password" required/>
            <br/>
            {error.status && (error.fieldName==='confirmPassword')&& <span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
            <input type="submit" value="Sing up"/>
            {
            <p className="text-color">Already have an Account ? <span onClick={()=>setFromShow(true)}><Link>Login</Link></span> </p>
            }
                  
            {
              user.success && <p style={{color: "green"}}>User Create Successfully</p>
            }

            
            </Form>
}
{
        ( fromShow) && 
        <Form onSubmit={handelSignIn}>
          <h2>Log In</h2>
     
        <label for="email" className="text-color">Email:</label>

        <input type="text" name="email" id="" onBlur={handelBlur} placeholder="enter email" required/>
        <br/>
        {error.status &&(error.fieldName==='email')&&<span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
        <label for="password" className="text-color">Password:</label>
        <input type="password" name="password"  onBlur={handelBlur} placeholder="Enter password" required/>  <br/>
        {error.status &&(error.fieldName==='password')&&<span className="errorMessage">{error.fieldName+" "+error.errorMessage}</span>}
            <br/>
        <input type="submit" value= "Sign in"/>
        {
            <p>New user Create Account ? <span onClick={()=>setFromShow(false)}><Link>New Account</Link></span> </p>
        }
        
       {
         user.success && <p style={{color: "green"}}>log in Successfully</p>
       }
      

        </Form> 
}
        
       



      <Button  className='fb-google' onClick ={handelFacebookSignIn} variant="outline-secondary" size="lg">
            <img src='https://i.ibb.co/qW3Rfy3/fb.png' alt='fb' height='20px'/>Facebook sing in 
      </Button>
      <Button  className='fb-google' onClick ={handelGoogleSignIn} variant="outline-secondary" size="lg">
      <img src="https://i.ibb.co/bQZmC5Q/google.png" alt="google" border="0"height='20px'/>Google sing in 
      </Button>
        
        
        

        
    </div>
           
    
    );
};

export default Login;