import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import {UserContext} from '../../App';


import { Link, useHistory, useLocation } from 'react-router-dom';




const Login = () => {
    const [logInUser, setLogInUser]= useContext(UserContext);

    let provider = new firebase.auth.GoogleAuthProvider();

   

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const [userAdd,  setUserAdd]=useState(false);
    const [fromShow,  setFromShow]=useState(true);
    const [user, setUser]=useState({
        
        firstName: '', 
        lastName: '',
        email:'',
        
        password:'',
        error:'',
        success: true
      
      });

      let history = useHistory();
     let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handelBlur=(e)=>{
        let newUser= {...user};
        newUser[e.target.name]=e.target.value;
        setUser(newUser);
        

    }
    //console.log("user", user);

    const handelCreateAccount= (e)=>{
        e.preventDefault();
        console.log("sign up");
        firebase.auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          let newUser=res.user;
          newUser.error ='';
          newUser.success = true;
            console.log(res);
            console.log(user);
          
        
        
         })
        .catch((error)=> {
          let newUser={};
          var errorMessage = error.message;
       
          newUser.error=errorMessage;
          newUser.success = false;
          console.log(error);
          
   
     });


    }
    const handelSignIn=(e)=>{
        e.preventDefault();
        firebase.auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then(res=>{
            let newUser=res.user;
            const signInUser={
              
                email: newUser.email,
                name: false
            }
            setLogInUser(signInUser);
            history.replace(from);
            
            
          
          
           })
        .catch(function(error) {
          
            let newUser={};
            var errorMessage = error.message;
         
            newUser.error=errorMessage;
            newUser.success = false;
            console.log(error);
          });
    }
    const changeFrom=()=>{
        console.log("login");
        setFromShow( false );
       // setUserAdd(true);


    }
    const handelGoogleSignIn=(e)=>{
        e.preventDefault();
        firebase.auth().signInWithPopup(provider)
     
        .then(function(res) {
            const newUser =res.user;
            const {displayName, email}=newUser;
            const signInUser={
                displayName:displayName,
                email: email,
                name: true
            }
            setLogInUser(signInUser);
            history.replace(from);
        
          
        
        
          }).catch(function(error) {
            let newUser={};
            var errorMessage = error.message;
         
            newUser.error=errorMessage;
            newUser.success = false;
            console.log(error);
          });

    }
    const handelFacebookSignIn=(e)=>{
        e.preventDefault();
        const fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider)
        .then(res=> {
            var token = res.credential.accessToken;
                let newUser=res.additionalUserInfo.profile;
       
            const signInUser={
                displayName: newUser.name,
                email: newUser.email,
                name: true
            }
            setLogInUser(signInUser);
            console.log(res);
            history.replace(from);
        
            
          }).catch(function(error) {
            let newUser={};
            var errorMessage = error.message;
         
            newUser.error=errorMessage;
            newUser.success = false;
            console.log(error);
          });
    }
    
       // firebaseConfig.initializeApp(firebaseConfig);
    console.log("email", logInUser.email,logInUser.displayName);
    return (
        <div >
            {
               ( !fromShow) &&
                <Form onSubmit={handelCreateAccount}>
                <input type="text" name="firstName" id="" onBlur={handelBlur} placeholder="enter first name" required/>
                <br/>
                <input type="text" name="lastName" id="" onBlur={handelBlur} placeholder="enter last name" required/>
                <br/>
                <input type="text" name="email" id="" onBlur={handelBlur} placeholder="enter email" required/>
                <br/>
                <input type="password" name="password"  onBlur={handelBlur} placeholder="Enter password" required/>  <br/>
                <input type="password" name="confirmPassword"  placeholder="enter password" required/>
                <br/>
                <input type="submit" value="sing up"/>
                
                </Form>
}
{
            ( fromShow) &&
            <Form onSubmit={handelSignIn}>
         
            
            <input type="text" name="email" id="" onBlur={handelBlur} placeholder="enter email" required/>
            <br/>
            <input type="password" name="password"  onBlur={handelBlur} placeholder="Enter password" required/>  <br/>
            <input type="submit" value= "sign in"/>
            {
                <p>Already have an Account ? <span onClick={changeFrom}><Link>Login</Link></span> </p>
                 }

            </Form>


            }
            <button onClick ={handelGoogleSignIn}>Google sing in </button>
            <button onClick ={handelFacebookSignIn}>Facebook sing in </button>
            
            

            
        </div>
            // <div>
            //     <Form onSubmit={handelCreateAccount}>
            //         {userAdd && <input type="text" name="firstName" id="" onBlur={handelBlur} placeholder="enter first name" required/>}
            //         {userAdd && <input type="text" name="lastName" id="" onBlur={handelBlur} placeholder="enter last name" required/>}

            //         <input type="text" name="email" id="" onBlur={handelBlur} placeholder="enter email" required/>
            //         <br/>
            //         <input type="password" name="password"  onBlur={handelBlur} placeholder="Enter password" required/>  <br/>
            //         <input type="submit" value="sing up"/>
            //         {
            //             <p>Already have an Account ? <span onClick={changeFrom}><Link>Login</Link></span> </p>
            //         }
                    
            //     </Form>
            // </div>
    
    );
};

export default Login;