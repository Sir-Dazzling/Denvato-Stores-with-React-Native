import React from 'react';
import {View, Text, FlatList, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import HeaderButton from '../../components/HeaderButton';

const OrdersScreen = (props) => 
{
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList 
            data = {orders}
            keyExtractor = {item => item.id}
            renderItem = {itemData => <Text>{itemData.item.totalAmount}</Text>} 
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
                <Item title = "Menu" iconName = {Platform.OS === "android" ? "md-menu" : "ios-menu"}onPress = {() => {
                    navigationData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    };
};

export default OrdersScreen;