import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native"
import { View, Text, Button, ActivityIndicator, AsyncStorage } from 'react-native'
import Center from "./Center"
import { AuthContext } from './AuthProvider';
import AppTabs from './AppTabs';

const Stack = createStackNavigator()

// --LOGIN--SCREEN--
function Login({navigation}){
    const { login } = useContext(AuthContext)
    return (
        <Center>
            <Text style={{paddingBottom:20}} >I am a Login Screen</Text>
            <Button 
                style={{paddingBottom:10}}
                color='black'
                title="  l o g  m e  i n  " 
                onPress={() => {
                    login();}}
            />
            <View style={{paddingTop:10}}>
            <Button 
                color='black'
                title="  g o  t o  r e g i s t e r  " 
                onPress={() => {
                    navigation.navigate("Register");
                }}
            />
            </View>
        </Center> 
    );
}

// --REGISTER--SCREEN--
function Register({navigation}){
    return (
        <Center>
            <Text>I am a Register Scnnn=</Text>
            <Button title="go to login" onPress={() => {
                navigation.goBack();}}/>
        </Center>
    );
}


function Routes() {
    const { user, login } = useContext(AuthContext);
    const [loading, setLoading]= useState(true)

    // Once the DOM renders,..
    useEffect(() => {
        // AsyncStorage.clear()
        // check if user is logged in or not
        AsyncStorage.getItem('user').then(userString => 
            { 
            if(userString) 
            { login() }
            setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    console.log('loading: ', loading)
    if(loading){
        return <Center>
                    <ActivityIndicator size='large'/>
                </Center>
    }

    return ( 
        <NavigationContainer>
            {user ? 
                <AppTabs />
                 :
            <Stack.Navigator 
                screenOptions={{header: () => null}}
                initialRouteName="Login">
                    <Stack.Screen
                        name='Login' 
                        options={{headerTitle: "Sign In"}}
                        component={Login} />
                    <Stack.Screen 
                        name='Register' 
                        options={{headerTitle: "Sign Up"}}
                        component={Register} />
            </Stack.Navigator> }
        </NavigationContainer>
    );
}

export default Routes;
