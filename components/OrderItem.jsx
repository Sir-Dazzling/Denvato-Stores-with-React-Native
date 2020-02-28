import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import CartItem from '../components/CartItem';
import Card from '../components/Card';

const OrderItem = (props) => 
{
    const [showDetails, setShowDetails] = useState(false); 
    return (
        <Card style = {styles.orderItem}>
            <View style = {styles.summary}>
                <Text style = {styles.totalAmount}>TOTAL VALUE: &#8358;{props.amount.toFixed(2)}</Text>
                <Text style = {styles.date}>{props.date}</Text>
            </View>
            <Button 
                color = {Colors.secondaryColor} 
                title = {showDetails ? "Hide Details" : "Show Details"}
                onPress = {() => {
                    setShowDetails(prevState => !prevState);
                }}
            />
            {showDetails && 
                <View style = {styles.detailItems}>
                    {props.items.map(cartItem => 
                        <CartItem
                            key = {cartItem.productId} 
                            quantity = {cartItem.quantity} 
                            amount = {cartItem.sum}
                            title = {cartItem.productTitle}
                        /> 
                    )}
                </View>}
        </Card>
    );
};

//Creating Stylesheet Element
const styles = StyleSheet.create({
    orderItem: 
    {
        margin: 20,
        padding: 20,
        justifyContent: "space-between"
    },
    summary: 
    {
        flexDirection: "column",
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
    },
    detailItems: 
    {
        width: "100%"
    }
});

export default OrderItem;