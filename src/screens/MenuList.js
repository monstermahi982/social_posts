import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Avatar, Text, Button, Card, Title, Paragraph } from 'react-native-paper';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'

const image = { uri: "https://source.unsplash.com/1600x900/?computer,code" }


const DATA = [
    {
        id: 1,
        image: 'https://source.unsplash.com/1600x900/?computer,code',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, natus.',
    },
    {
        id: 2,
        image: 'https://source.unsplash.com/1600x900/?nature,earth',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, natus.',
    },
    {
        id: 3,
        image: 'https://source.unsplash.com/1600x900/?nature,code',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, natus.',
    },
    {
        id: 4,
        image: 'https://source.unsplash.com/1600x900/?computer,code',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, natus.',
    },
    {
        id: 5,
        image: 'https://source.unsplash.com/1600x900/?computer,code',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, natus.',
    },
    {
        id: 6,
        image: 'https://source.unsplash.com/1600x900/?computer,code',
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, natus.',
    },
];

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

    return (
        <>
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
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