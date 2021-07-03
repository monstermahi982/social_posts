import React from 'react'
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'


export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
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
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
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