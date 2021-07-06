import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Avatar, Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import firestore from '@react-native-firebase/firestore';

const CardItem = (item) => {

    return (
        <>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: item.image }} />
                <Paragraph style={styles.content}>{item.desc}</Paragraph>
                <Card.Actions style={styles.actions}>
                    <Button style={styles.btn} mode="text" onPress={() => { }} > <SimpleIcon name="dislike" size={25} color="red" />    30</Button>
                    <Button style={styles.btn} mode="text" onPress={() => { }}><SimpleIcon name="like" size={25} color="green" />     50</Button>
                </Card.Actions>
            </Card>
        </>
    )
}

export default function MenuList() {

    const [dataItems, setDataItems] = React.useState([])

    React.useEffect(() => {
        postData()
        return () => {
            console.log("clean up");
        }
    }, [])

    const postData = async () => {
        const querySnap = await firestore().collection('posts').get()
        const result = querySnap.docs.map(docSnap => docSnap.data())
        setDataItems(result)
    }

    return (
        <>
            <FlatList
                data={dataItems.reverse()}
                keyExtractor={(item) => item.image}
                renderItem={({ item }) => CardItem(item)}
            />
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
    }
});