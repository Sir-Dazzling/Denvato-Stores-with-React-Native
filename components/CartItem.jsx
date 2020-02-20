import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const CartItem = (props) => 
{
    return (
        <View style = {styles.cartItem}>
            <Text style = {styles.itemData}>
                <Text style = {styles.quantity}>{props.quantity} </Text>
                <Text style = {styles.mainText}>{props.title}</Text>
            </Text>
            <View style = {styles.itemData}>
                <Text style = {styles.mainText}>&#8358;{props.amount.toFixed(2)}</Text>
                <TouchableOpacity onPress = {props.onRemove} style = {styles.deleteButton}>
                    <Ionicons name = {Platform.OS === "android" ? 'md-trash' : 'ios-trash'} size = {23} color = "red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

//Creating the Stylesheet
const styles = StyleSheet.create({
    cartItem: 
    {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10
    },
    itemData: 
    {
        flexDirection: "row",
        alignItems: "center"
    },
    quantity: 
    {
        fontFamily: "open-sans",
        color: "#888",
        fontSize: 16
    },
    mainText: 
    {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    deleteButton: 
    {
        marginLeft: 20
    }
});

export default CartItem;