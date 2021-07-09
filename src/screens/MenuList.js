import React from 'react'
import { View, StyleSheet, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import { Avatar, Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function MenuList() {

    const [dataItems, setDataItems] = React.useState([])
    const [like, setLike] = React.useState(true)
    const [dislike, setDislike] = React.useState(true)
    const [loading, setLoading] = React.useState(false)
    const [actloading, setActloading] = React.useState(false)

    React.useEffect(() => {
        postData()
    }, [like, dislike])

    const postData = async () => {
        const querySnap = await firestore().collection('posts').get()
        const result = querySnap.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id }))
        setDataItems(result)
    }

    const postLike = async (id) => {
        try {
            const checkUser = await firestore().collection('actions').where('userId', '==', auth().currentUser.uid).where('postId', '==', id).get()
            if (checkUser.docs.length == 0) {
                // getting old likes
                const getDate = await firestore().collection('posts').doc(id).get()
                const getLike = getDate.data()['likes']
                // setting updated like
                const updateLike = await firestore().collection('posts').doc(id).update({
                    likes: getLike + 1
                }).then(() => ToastAndroid.show("Thanku for liking the post", ToastAndroid.SHORT))
                // adding the id , uid in action table
                await firestore().collection('actions').add({
                    postId: id,
                    userId: auth().currentUser.uid
                }).then(() => { setLike(!like) })
                    .catch((err) => ToastAndroid.show("error :- " + err, ToastAndroid.SHORT))
            } else {
                ToastAndroid.show("Response is already recorded", ToastAndroid.SHORT)
            }

        } catch (error) {
            ToastAndroid.show("error :- " + error, ToastAndroid.SHORT)
        }
    }


    const postDislike = async (id) => {
        try {
            const checkUser = await firestore().collection('actions').where('userId', '==', auth().currentUser.uid).where('postId', '==', id).get()
            if (checkUser.docs.length == 0) {
                // getting old likes
                const getDate = await firestore().collection('posts').doc(id).get()
                const getDislike = getDate.data()['dislikes']
                // setting updated like
                const updateLike = await firestore().collection('posts').doc(id).update({
                    dislikes: getDislike + 1
                }).then(() => ToastAndroid.show("Thanku for disliking the post", ToastAndroid.SHORT))
                // adding the id , uid in action table
                await firestore().collection('actions').add({
                    postId: id,
                    userId: auth().currentUser.uid
                }).then(() => { setDislike(!dislike) })
                    .catch((err) => ToastAndroid.show("error :- " + err, ToastAndroid.SHORT))
            } else {
                ToastAndroid.show("Response is already recorded", ToastAndroid.SHORT)
            }

        } catch (error) {
            ToastAndroid.show("error :- " + error, ToastAndroid.SHORT)
        }
    }



    return (
        <>
            {
                actloading ?
                    <ActivityIndicator style={styles.loading} size="large" color="red" />
                    :
                    <FlatList
                        data={dataItems.reverse()}
                        keyExtractor={(item) => item.image}
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
                                    <Button style={styles.btn} mode="text" onPress={() => { postDislike(item.id) }} > <SimpleIcon name="dislike" size={25} color="red" />    {item.dislikes}</Button>
                                    <Button style={styles.btn} mode="text" onPress={() => { postLike(item.id) }}><SimpleIcon name="like" size={25} color="green" />     {item.likes}</Button>
                                </Card.Actions>
                            </Card>

                        }
                    />
            }
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
        width: "50%",
    },
    content: {
        color: "blue",
        marginVertical: 10,
        marginHorizontal: 30,
        fontSize: 15
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    }
});