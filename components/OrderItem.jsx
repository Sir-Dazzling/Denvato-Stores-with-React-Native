import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

const OrderItem = (props) => 
{
    return (
        <View style = {styles.orderItem}>
            <View style = {styles.summary}>
                <Text style = {styles.totalAmount}>&#8358;{props.amount.toFixed(2)}</Text>
                <Text style = {styles.date}>{props.date}</Text>
            </View>
            <Button color = {Colors.secondaryColor} title = "Show Details"/>
        </View>
    );
};

//Creating Stylesheet Element
const styles = StyleSheet.create({
    orderItem: 
    {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
        padding: 20
    },
    summary: 
    {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    totalAmount: 
    {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    date: 
    {
        fontFamily: "open-sans",
        fontSize: 16,
        color: "#888"
    }
});

export default OrderItem;