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
import AddPost from './screens/AddPost';



const App = () => {
  return (
    <>
      <StatusBar />
      {/* <Login /> */}
      {/* <Signin /> */}
      <MenuList />
      {/* <AddPost /> */}
    </>

  );
};

const styles = StyleSheet.create({

});

export default App;
