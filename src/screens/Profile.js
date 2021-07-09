import React from 'react'
import auth from '@react-native-firebase/auth';
import { View, StyleSheet, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import { Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Profile() {
    const [state, setState] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [actloading, setActloading] = React.useState(false)

    const userLogout = () => {
        setActloading(true)
        auth().signOut()
        setState(!state)
        setActloading(false)
        ToastAndroid.show("Successfully Logout", ToastAndroid.SHORT);
    }

    const [dataItems, setDataItems] = React.useState([])
    React.useEffect(() => {
        postData()
    }, [state, dataItems])



    const postData = async () => {
        const querySnap = await firestore().collection('posts').where('uid', '==', auth().currentUser.uid).get()
        const result = querySnap.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id }))
        setDataItems(result)
    }

    const deletePost = (id, image) => {
        const storageRef = storage().refFromURL(image)
        const imageRef = storage().ref(storageRef.fullPath)
        imageRef.delete().then(() => { })
        firestore().collection('posts').doc(id).delete().then(() => {
            ToastAndroid.show("Post deleted successfully", ToastAndroid.SHORT)
            setState(!state)
        })

    }
    return (
        <>
            {
                actloading ?
                    <ActivityIndicator style={styles.loading} size="large" color="red" />
                    :
                    <View>
                        <Text style={styles.name}>{state ? "" : auth().currentUser.email}</Text>
                        <Button style={styles.logbtn} icon="logout" mode="contained" onPress={() => userLogout()}>
                            logout
                        </Button>
                    </View>
            }
            <View>
                <Text style={styles.heading}>Your Uploads <SimpleIcon name="arrow-down-circle" size={25} color="black" /> </Text>
                <FlatList
                    data={dataItems.reverse()}
                    keyExtractor={(item) => item.id}
                    onRefresh={() => {
                        setLoading(true)
                        postData()
                        setLoading(false)
                    }}
                    refreshing={loading}
                    renderItem={({ item }) =>
                        <Card style={styles.card}>
                            <Card.Cover source={{ uri: item.image }} />
                            <Paragraph style={styles.content}>{item.desc}</Paragraph>
                            <Card.Actions style={styles.actions}>
                                <Button style={styles.btn} mode="text" onPress={() => deletePost(item.id, item.image)}><SimpleIcon name="trash" size={25} color="red" />     50</Button>
                            </Card.Actions>
                        </Card>
                    }
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
        width: 100,
        marginHorizontal: 120
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
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 50,
        padding: 50
    }
});