import React from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

export default function Profile({ navigation }) {
    const userLogout = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('login'));
    }
    return (
        <View>
            <Text>{auth().currentUser.email}</Text>
            <Button icon="logout" mode="contained" onPress={() => auth().signOut()}>
                logout
            </Button>
        </View>
    )
}
