import React, {useEffect, useState} from 'react';
import {View, FlatList, Platform, ActivityIndicator, StyleSheet} from 'react-native';
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

    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => 
        {
            setIsLoading(false);
        });
    }, [dispatch]);

    //Checking if app is still loading orders or not
    if(isLoading)
    {
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size = "large" color = {Colors.primary} />
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