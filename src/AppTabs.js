import React, { useContext } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Center from './ScreenContainer'
import { Text, Button } from "react-native"
import { AuthContext } from './AuthProvider';
import { AntDesign } from "@expo/vector-icons"
import { ScreenContainer } from 'react-native-screens';

const Tabs = createBottomTabNavigator();

// HOME--TAB
function Home(){
    const {signOut} = useContext(AuthContext);
    return (
      <ScreenContainer>
        <Text style={{paddingBottom:10}}>Home</Text>
        <Button
            color='black'
            title="   l o g  o u t   "
            onPress={() => signOut()}
        />
      </ScreenContainer>)
}

// SEARCH--TAB
function Search(){
    return (<Text>search</Text>) }


export default function AppTabs() {
    return (
        <Tabs.Navigator
        screenOptions={ ({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName ='home';
              } else if (route.name === 'Search') {
                iconName = 'search1';
              }
              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
          })}

          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'silver',
            // labelStyle: {fontSize:12}
          }}
        >
            <Tabs.Screen name='Home' component={Home}/>
            <Tabs.Screen name='Search' component={Search} />
        </Tabs.Navigator>
    );
}
