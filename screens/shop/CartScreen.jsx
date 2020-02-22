import React from 'react';
import {View,Text,FlatList,Button, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import CartItem from '../../components/CartItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/Cart';
import * as orderActions from '../../store/actions/Orders'; 

const CartScreen = (props) => 
{
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);

    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for(const key in state.cart.items)
        {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    //Enabling useDispatch function
    const dispatch = useDispatch();

    return (
        <View style = {styles.screen}>
            <View style = {styles.summary}>
                <Text style = {styles.summaryText}>
                    Total:{''} <Text style = {styles.amount}>&#8358;{cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    title = "Order Now" 
                    color = {Colors.accent} 
                    disabled = {cartItems.length === 0} 
                    onPress = {() => {
                        dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
                        props.navigation.navigate("userOrders");
                    }} />
            </View>
            <FlatList 
                data = {cartItems} 
                keyExtractor = {item => item.productId} 
                renderItem = {itemData => 
                    <CartItem
                        title = {itemData.item.productTitle} 
                        quantity = {itemData.item.quantity} 
                        amount = {itemData.item.sum} 
                        onRemove = {() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }} 
                    />
                } 
            />
        </View>
    );
};

CartScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: "Cart"
    };
};

const styles = StyleSheet.create({
    screen: 
    {
        margin: 20
    },
    summary: 
    {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white"
    },
    summaryText: 
    {
        fontFamily: "open-sans-bold",
        fontSize: 18
    },
    amount: 
    {
        color: Colors.accentColor
    }
});

export default CartScreen;