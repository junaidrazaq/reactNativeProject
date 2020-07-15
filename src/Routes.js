import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { ActivityIndicator} from 'react-native'
import { ScreenContainer } from "./ScreenContainer"
import { AuthContext } from './AuthProvider'
import AppTabs from './AppTabs'
import * as firebase from 'firebase'
import { SetUpScreens } from "./setUpScreens"

function Routes() {
    const { isLoggedIn, initializing } = useContext(AuthContext);

    if (initializing){ //If initialising is true ->
    console.log(initializing)
    //onAuthStateChanged listener is asynchronous and will trigger an
    //initial state once a connection with Firebase has been established.
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" />
      </ScreenContainer>
    );}

    //When initializing is false
      console.log(initializing)
    return ( 
        //If isLogged in is true, open loggedIn home screen,
        //If isLogged in is false, open the beginning screen(login, register screen)
        <NavigationContainer> 
            {isLoggedIn ? <AppTabs /> : <SetUpScreens/>}
        </NavigationContainer>
    );
}
export default Routes;