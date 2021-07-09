import React from 'react'
import { View, StyleSheet, SafeAreaView, ToastAndroid, Image, ActivityIndicator } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


export default function AddPost({ navigation }) {
    const [image, setImage] = React.useState(null);
    const [desc, setDesc] = React.useState('');
    const [actloading, setActloading] = React.useState(false)

    const showImage = { uri: image }

    const takeImage = () => {
        launchImageLibrary({ quality: 0.5 }, (fileObj) => {
            setActloading(true)
            const result = storage().ref().child(`/images/${Date.now()}`).putFile(fileObj.assets[0].uri)
            result.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) {
                        setActloading(false)
                        ToastAndroid.show("Image uploaded Successfully", ToastAndroid.SHORT);
                    }
                },
                (error) => {
                    setActloading(false)
                    ToastAndroid.show("errro :- " + error, ToastAndroid.SHORT);
                },
                () => {
                    setActloading(false)
                    result.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImage(downloadURL)
                    });
                }
            );

        })
    }

    const submitPost = async () => {
        setActloading(true)
        if (!desc && !image) {
            setActloading(false)
            alert("enter all details")
            return
        }
        try {
            await firestore().collection('posts').add({
                image, desc,
                uid: auth().currentUser.uid,
                likes: 0,
                dislikes: 0
            }).then(() => {
                setActloading(false)
                ToastAndroid.show("Post Uploaded Successfully", ToastAndroid.SHORT);
            }).catch((err) => {
                setActloading(false)
                ToastAndroid.show("error :- " + err, ToastAndroid.SHORT)

            })

        } catch (error) {
            setActloading(false)
            ToastAndroid.show("error :- " + error, ToastAndroid.SHORT)
        }

        setImage('')
        setDesc('')
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.container}>
            {image ?
                <Image source={showImage} style={styles.imageShow} />
                :
                <SimpleIcon name="social-instagram" size={200} color="red" style={styles.img} />}

            {
                actloading ?
                    <ActivityIndicator style={styles.loading} size="large" color="red" />
                    :
                    <View style={styles.form}>
                        <Text style={styles.text}>Add POST  <MaterialIcon name="post" size={30} /></Text>
                        <TextInput
                            label="Description"
                            value={desc}
                            mode="outlined"
                            outlineColor="red"
                            placeholder="enter the descritpion"
                            right={<TextInput.Icon name="text" />}
                            multiline={true}
                            onChangeText={text => setDesc(text)}
                        />
                        <Button mode="outlined" onPress={() => takeImage()}>Upload Image</Button>
                        <Button disabled={image ? false : true} mode="contained" onPress={() => submitPost()}>
                            Submit
                        </Button>
                    </View>
            }


        </SafeAreaView>
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
    imageShow: {
        width: "100%",
        height: 250,
        marginVertical: 50
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});