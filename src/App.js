import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './screens/Login';
import Signin from './screens/signin';
import MenuList from './screens/MenuList';
import AddPost from './screens/AddPost';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import auth from '@react-native-firebase/auth';
import Profile from './screens/Profile';
import FeatherIcon from 'react-native-vector-icons/Feather'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {
  const [user, setUser] = useState(false)
  // const user = ""
  useEffect(() => {
    console.log("app called");
    const unsubscribe = auth().onAuthStateChanged((userExit) => {
      if (userExit) {
        setUser(true)
      } else {
        setUser(false)
      }
    })
    // return () => unsubscribe
  }, [user])

  return (
    <NavigationContainer>
      <StatusBar />
      {
        user ?
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {
                let iconName = ""
                if (route.name == 'Home') {
                  iconName = 'home'
                } else if (route.name == 'AddPost') {
                  iconName = 'plus-circle'
                } else {
                  iconName = 'user'
                }

                return <View style={{ borderWidth: 10, borderColor: "white", borderRadius: 40, height: 70 }}><FeatherIcon name={iconName} size={35} color={color} /></View>;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}

          >
            <Tab.Screen name="Home" component={MenuList} options={{ title: "" }} />
            <Tab.Screen name="AddPost" component={AddPost} options={{ title: "" }} />
            <Tab.Screen name="Profile" component={Profile} options={{ title: "" }} />
          </Tab.Navigator>
          :
          <Stack.Navigator>
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
          </Stack.Navigator>
      }
    </NavigationContainer>






  );
};

const styles = StyleSheet.create({

});

export default App;
