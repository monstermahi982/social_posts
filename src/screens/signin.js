import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth';


export default function signin() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const creatAccount = async () => {
        if (!email && !password) {
            alert("please fill all the feilds")
            return
        }
        const result = await auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }

                if (error.code === 'auth/weak-password') {
                    alert('Password should be at least 6 characters');
                }

                console.error(error);
            });
        setEmail('')
        setPassword('')
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <SimpleIcon name="social-instagram" size={200} color="red" style={styles.img} />
                <View style={styles.form}>
                    <Text style={styles.text}>Create account  <MaterialIcon name="card-account-details-outline" size={35} /></Text>
                    <TextInput
                        label="Email"
                        value={email}
                        mode="outlined"
                        placeholder="enter your email"
                        right={<TextInput.Icon name="email" />}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        mode="outlined"
                        outlineColor="red"
                        placeholder="enter your password"
                        secureTextEntry
                        right={<TextInput.Icon name="eye" />}
                        onChangeText={text => setPassword(text)}
                    />
                    <Button mode="contained" onPress={() => creatAccount()}>
                        Submit
                    </Button>
                </View>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    form: {
        marginHorizontal: 20,
        height: "40%",
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    img: {
        margin: 40,
        textAlign: "center",
    }
});