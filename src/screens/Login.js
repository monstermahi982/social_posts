import React from 'react'
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const signinAccount = async () => {
        if (!email && !password) {
            alert("please fill all the feilds")
            return
        }
        const result = await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('User signin successfully');
            })
            .catch(error => {
                if (error.code === 'auth/wrong-password') {
                    alert('The password is invalid or the user does not have a password.');
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
                    <Text style={styles.text}>Login  <SimpleIcon name="login" size={30} /></Text>
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
                    <Button mode="contained" onPress={() => signinAccount()}>
                        Submit
                    </Button>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={styles.switchText}>Create new account</Text></TouchableOpacity>
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
    },
    switchText: {
        textAlign: 'center',
        fontSize: 20,
        textDecorationLine: 'underline',
        textTransform: 'capitalize'
    }
});