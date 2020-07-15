import React, { useState, useEffect } from 'react';
import * as firebase from "firebase";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

// For-use-in-other-components
export const AuthContext = React.createContext();



function AuthProvider({children}){
    //Used in Routes.js line 28 to check if user is logged in or not
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
     // Set an initializing state whilst Firebase connects
    const [firebaseConecting, setfirebaseConecting] = useState(true);
    const [initializing, setInitializing] = useState(true);
    let [fontsLoaded, setFontsLoaded] = useState(false);

    // This would be called on initial page load
    useEffect(() => {
        //Set an initializing state whilst Firebase connects
        const subscriber = firebase.auth().onAuthStateChanged((user) => {
          //asychronous - allows you to subscribe to the users current authentication state
          // Handle user state changes
          setUser(user);
          if (user != null) /* if user signed in */ {
            if (user.emailVerified) /* if user verified email */{
              console.log(`user email : ${user.email}`);
              console.log(`user email verified? : ${user.emailVerified}`);
              setLoggedIn(true); }
            else 
            { setLoggedIn(false); }               }
            
          if (firebaseConecting) setfirebaseConecting(false);
        });
    
        return subscriber; // unsubscribe on unmount
      }, []); // doesn't need to recalculate again


      async function _loadFontsAsync() {
        await Font.loadAsync({
          ...Ionicons.font,
        });
        setFontsLoaded(true); //only reached once promise above is actioned
      }
      _loadFontsAsync();
    
      useEffect(() => {
        //Once the fonts are loaded in and firebase has connected, 
        //initalising is set to false So the screen will render a 
        //different screen (check Routes.js)
        if (fontsLoaded && !firebaseConecting) {
            setInitializing(false);
            // console.log("setintialising is " + initializing)
            // console.log("firebaseConnecting is " + firebaseConecting)
        }
      }, [fontsLoaded, firebaseConecting]); //on variable update run this effect


    return (<AuthContext.Provider value={{
        user,
        initializing,
        isLoggedIn,
        setLoggedIn,

        //Method for signing in, requires email and password
        //This is called in setUpScreens.js in the sign in screen
        signIn: ({email, password}) =>  {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                //if user exists and they haven't been verified, don't log them in
                if(user && !user.emailVerified){
                    alert('email is yet to be verified')
                } else{ 
                    setLoggedIn(true)
                }})
            .catch((error) => {
                console.log(error);
                alert(error);
              });},

        //Method for registering, requires email and password
        //This is called in setUpScreens.js in the register screen
        signUp: ({email, password, navigation}) =>{
            firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                //Log the user in 
                setLoggedIn(true)
                navigation.push("VerificationScreen");
                const currentUser = firebase.auth().currentUser;

                currentUser
                .sendEmailVerification()
                .then(() => {
                    // Email sent.
                    alert("email verification has been sent")
                    console.log("email verification has been sent");
                  })
                .catch( function(error) {
                    // An error happened.
                    console.log(error + ": verification email failed to send");
                  });
                })
            .catch((error) => {
                if(error.code === "auth/email-already-in-use") {
                    console.log("That email address is already in use!");
                  }
                  if (error.code === "auth/invalid-email") {
                    console.log("That email address is invalid!");
                  }
                  console.log(error);
                  alert(error);
            })},

        signOut: () => {
            firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("User signed out!");
                setLoggedIn(false);
              });
        }
    }}>
        {children}
    </AuthContext.Provider>
    );
}

export default AuthProvider;
