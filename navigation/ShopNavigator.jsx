import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/shop/HomeScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

//Creating a Stack Navigator Element
const ProductsNavigator = createStackNavigator({
    Home: 
    {
        screen: HomeScreen
    },
    Products: 
    {
        screen: ProductsOverviewScreen
    }
}, 
{
    defaultNavigationOptions: 
    {
        headerStyle: 
        {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor
    }
});

export default createAppContainer(ProductsNavigator);