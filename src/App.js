import React from 'react';
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



const App = () => {
  return (
    <>
      <StatusBar />
      {/* <Login /> */}
      <Signin />
      {/* <MenuList /> */}
    </>

  );
};

const styles = StyleSheet.create({

});

export default App;
