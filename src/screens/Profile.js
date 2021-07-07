import React from 'react'
import auth from '@react-native-firebase/auth';
import { View, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import { Avatar, Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const CardItem = (item) => {


    const deletePost = (id, image) => {
        const storageRef = storage().refFromURL(image)
        const imageRef = storage().ref(storageRef.fullPath)
        imageRef.delete().then(() => console.log("image deleted"))
        firestore().collection('posts').doc(id).delete().then(() => {
            ToastAndroid.show("Post deleted successfully", ToastAndroid.SHORT)
            setState(!state)
        })

    }

    return (
        <>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: item.image }} />
                <Paragraph style={styles.content}>{item.desc}</Paragraph>
                <Card.Actions style={styles.actions}>
                    <Button style={styles.btn} mode="text" onPress={() => { }} > <SimpleIcon name="dislike" size={25} color="red" />    30</Button>
                    <Button style={styles.btn} mode="text" onPress={() => { }}><SimpleIcon name="like" size={25} color="green" />     50</Button>
                    <Button style={styles.btn} mode="text" onPress={() => deletePost(item.id, item.image)}><SimpleIcon name="trash" size={25} color="red" />     50</Button>
                </Card.Actions>
            </Card>
        </>
    )
}

export default function Profile() {
    const [state, setState] = React.useState(false)

    const userLogout = () => {
        auth().signOut()
        setState(!state)
        ToastAndroid.show("Successfully Logout", ToastAndroid.SHORT);
    }

    const [dataItems, setDataItems] = React.useState([])
    React.useEffect(() => {
        postData()
        // return () => {
        //     console.log("clean up");
        // }
    }, [])



    const postData = async () => {
        const querySnap = await firestore().collection('posts').where('uid', '==', auth().currentUser.uid).get()
        const result = querySnap.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id }))
        setDataItems(result)
    }
    return (
        <>
            <View>
                <Text style={styles.name}>{state ? "" : auth().currentUser.email}</Text>
                <Button style={styles.logbtn} icon="logout" mode="contained" onPress={() => userLogout()}>
                    logout
                </Button>
            </View>
            <View>
                <Text style={styles.heading}>Your Uploads <SimpleIcon name="arrow-down-circle" size={25} color="black" /> </Text>
                <FlatList
                    data={dataItems.reverse()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => CardItem(item)}
                    style={styles.menulist}
                />
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    actions: {
        flexDirection: "row"
    },
    card: {
        margin: 10,
        elevation: 10
    },
    btn: {
        width: "33.3%",
    },
    content: {
        color: "blue",
        marginVertical: 10,
        marginHorizontal: 30,
        fontSize: 15
    },
    name: {
        textAlign: 'center',
        fontSize: 40,
        paddingVertical: 20
    },
    logbtn: {
        width: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20
    },
    menulist: {
        marginBottom: 180
    },
    heading: {
        textAlign: 'center',
        fontSize: 30
    }
});