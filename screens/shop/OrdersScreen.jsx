import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Platform, ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';
import * as ordersActions from '../../store/actions/Orders';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => 
{
     //Setting state for app loading items or not
     const [isLoading, setIsLoading] = useState(false);

     //Setting error of fetching process
     const [error, setError] = useState();

    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    const loadOrders = useCallback(async () => 
    {
        console.log("Loading Orders");
        setError(null);
        setIsLoading(true);
        try
        {
            await dispatch(ordersActions.fetchOrders());
        } 
        catch(err)
        {
            setError(err.message);
        }
        setIsLoading(false);
    },[dispatch, setIsLoading, setError]);

    useEffect(() => 
    {
        loadOrders();
    }, [dispatch, loadOrders]);

    //adding navigation listener
    useEffect(() => 
    {
        const willFocusSub = props.navigation.addListener("willFocus", loadOrders);

        return (() => {
            willFocusSub.remove();
        });
    }, [loadOrders]);

    //Checking if an error ocured during processing fetch requests
    if(error)
    {
        <View style = {styles.spinner}>
            <Text>An Error Occured</Text>
            <Button title = "Try again" onPress = {loadOrders} color = {Colors.primary} />
        </View>
    }

    //Checking if app is still loading orders or not
    if(isLoading)
    {
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size = "large" color = {Colors.primary} />
            </View>
        );
    }

    //Checking if tere are no products to render or if list is empty
    if(!isLoading && orders.length === 0)
    {
        return (
            <View style = {styles.centered}>
                <Text>No Products Found</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data = {orders}
            keyExtractor = {item => item.id}
            renderItem = {itemData => 
                <OrderItem
                    amount = {itemData.item.totalAmount} 
                    date = {itemData.item.readableDate}
                    items = {itemData.item.items}
                />
            } 
        />
    );
};

OrdersScreen.navigationOptions = (navigationData) =>
{
    return {
        headerTitle: "Your Orders",
        headerLeft: () =>
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Menu" iconName = {Platform.OS === "android" ? "md-menu" : "ios-menu"} onPress = {() => {
                    navigationData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    centered: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default OrdersScreen;