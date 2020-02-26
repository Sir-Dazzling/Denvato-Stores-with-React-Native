import React from 'react';
import {FlatList, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import OrderItem from '../../components/OrderItem';

const OrdersScreen = (props) => 
{
    const orders = useSelector(state => state.orders.orders);

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

export default OrdersScreen;