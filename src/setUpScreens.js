import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Text, Button, TextInput, ActivityIndicator, AsyncStorage, View } from 'react-native'
import { ScreenContainer } from "./ScreenContainer"
import { AuthContext } from './AuthProvider';
import fire from './config/fire'
import * as firebase from 'firebase';


/* -- R E G I S T E R -- S C R E E N -- */
function Register({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {signUp} = useContext(AuthContext);

    return (
        <ScreenContainer>
          <Text>Register</Text>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} />  
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry />
          <Button
            title="Sign Up"
            onPress={() => {
              if (password === confirmPassword) {
                signUp({ email, password, navigation });
              } else {
                alert("passwords don't match");
              } }} />
        </ScreenContainer>
      );
}

/* -- L O G I N -- S C R E E N -- */
function SignIn({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useContext(AuthContext)

    return (
        <ScreenContainer>
            <Text style={{paddingBottom:20}}>Login</Text>
            <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} />  
            <TextInput
                style={{paddingBottom:10}}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry />
            {/* Buttons */}
            <View style={{padding:3}}>
              <Button 
                  variant='contained'
                  type="clear"
                  title="  l o g  m e  i n  " 
                  onPress={() => {
                  signIn({email, password});}}
              />
            </View>
            <View style={{padding:3}}>
              <Button 
                  color='black'
                  title="  g o  t o  r e g i s t e r  " 
                  onPress={() => {
                  navigation.navigate("Register"); }}/>
            </View>
            <View style={{padding:3}}>
              <Button
                color='black'
                  title=" F o r g o t  P a s s w o r d "
                  onPress={() => { 
                  navigation.navigate('ForgotPassword'); }}/>
            </View>
        </ScreenContainer> 
    );
}

/* -- F O R G O T -- P A S S W O R D -- S C R E E N -- */
function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("")

  return(
      <ScreenContainer>
          <Text>Forgotten Password Screen</Text>
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
          <Button
          title="Forgot Password"
          onPress={() => {
              sendForgotPassword(email);
              navigation.push("SignIn")
          }}
          />
      </ScreenContainer>
  )
}
function sendForgotPassword(email){
  const auth = firebase.auth()

  auth
      .sendPasswordResetEmail(email)
      .then(() => {
          console.log('email sent')
          alert('Email    Sent')
      })
      .catch((error) => {
          console.log('Forgot password email not sent! error message:' + error)
          alert("Please contact support to reset your password");
      })
}

/* -- E M A I L -- L I N K -- S C R E E N -- */
function VerificationScreen({ navigation }){
    return(
        <ScreenContainer>
            <Text>An Email with a verification link has been
                 sent to the specified email. Allow some time 
                 before the email is received in to your inbox
                 before clicking the link to sign in. If you
                 are yet to receive an email, please resend
                 using the button below. 
            </Text>
            <Button onPress={() => navigation.navigate(SignIn)} title="Sign In"/>
            <Button onPress={() => sendEmailVerification()} title="Resend Email"/>
        </ScreenContainer>
    )
}
function sendEmailVerification(){
    const currentUser = firebase.auth().currentUser;
    currentUser
    .sendEmailVerification()
    .then(() => {
        alert("email verification has been sent")
        console.log("email verification has been sent");
      })
    .catch( (error) => {
        console.log(error + ": verification email failed to send");
      });
}


    
const Stack = createStackNavigator()

//All Screens
export const SetUpScreens = () => (
    <Stack.Navigator>
      <Stack.Screen
          name='SignIn' //This must be same name as component{} below
          component={SignIn}
          options={{headerTitle: "Sign In"}}
            />
      <Stack.Screen 
          name='Register' 
          options={{headerTitle: "Sign Up"}}
          component={Register} />
      <Stack.Screen 
          name='ForgotPassword' 
          options={{headerTitle: "Forgotten Password"}}
          component={ForgotPassword} />
      <Stack.Screen 
          name='VerificationScreen' 
          options={{headerTitle: "Email Verification"}}
          component={VerificationScreen} />
    </Stack.Navigator> 
)