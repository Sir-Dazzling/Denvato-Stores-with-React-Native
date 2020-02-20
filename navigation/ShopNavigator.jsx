import React from 'react';
import {Platform,Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Ionicons} from '@expo/vector-icons'; 
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../screens/shop/HomeScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import CategoryProductList from '../screens/shop/CategoryProductList';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';

//Configuring default Nav Stack styling
const defaultStackNavOptions =  
{
    headerStyle: 
    {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
    },
    headerTitleStyle: 
    {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: 
    {
        fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
    headerTitle: "App"
};

//Creating a Stack Navigator Element
const ProductsNavigator = createStackNavigator({
    Home: 
    {
        screen: HomeScreen
    },

    ProductsList: 
    {
        screen: CategoryProductList
    }
},
{
    defaultNavigationOptions: defaultStackNavOptions
});

//Creating a Stack Navigator Element
const recentNavigator = createStackNavigator({
    Recent: 
    {
        screen: HomeScreen
    }
},
{
    defaultNavigationOptions: defaultStackNavOptions
});

//Creating a Stack Navigator Element
const allProductsNavigator = createStackNavigator({
    allProducts: 
    {
        screen: ProductsOverviewScreen
    },
    ProductDetails: 
    {
        screen: ProductDetailsScreen
    },
    Cart: 
    {
        screen: CartScreen
    }
},
{
    defaultNavigationOptions: defaultStackNavOptions
});


//Configuring the BottomTab element
const tabScreenConfig = 
{
    Products: 
    {
        screen: ProductsNavigator,
        navigationOptions: 
        {
            tabBarIcon: (tabInfo) => 
            {
                return (
                    <Ionicons name = "ios-home" size = {25} color = {tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === "android" ? <Text>Home</Text> : "Meals"
        }
    },
    Favorites: 
    {
        screen: recentNavigator,
        navigationOptions:
        {
            tabBarIcon: (tabInfo) => 
            {
                return <Ionicons name = "ios-heart" size = {25} color = {tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    },
    Recent: 
    {
        screen: recentNavigator,
        navigationOptions:
        {
            tabBarIcon: (tabInfo) => 
            {
                return <Ionicons name = "ios-clock" size = {25} color = {tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Orders: 
    {
        screen: recentNavigator,
        navigationOptions:
        {
            tabBarIcon: (tabInfo) => 
            {
                return <Ionicons name = "ios-basket" size = {25} color = {tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
};

//Creating a Tab Navigator Element for Android or do the latter for Ios
const shoppingBottomTabNavigator = Platform.OS === "android" ?
createMaterialBottomTabNavigator(tabScreenConfig,
{
    activeTintColor: Colors.accentColor,
    shifting: true,
    barStyle: 
    {
        backgroundColor: Colors.primaryColor 
    }
}) 
: createBottomTabNavigator(tabScreenConfig,
{
    //Declaring a default tab styling
    tabBarOptions: 
    {
        activeTintColor: Colors.accentColor,
        labelStyle: 
        {
            //fontFamily: "open-sans"
        }
    }
});

//Creating a drawer Navigator Element
const MainNavigator =  createDrawerNavigator({
   Shopping: 
   {
       screen: shoppingBottomTabNavigator,
       navigationOptions: 
        {
            drawerLabel: "Home"
        }
   },
   allProducts: 
   {
       screen: allProductsNavigator,
       navigationOptions: 
       {
           drawerLabel: "All Products"
       }
   }
},
{
    contentOptions: 
    {
        activeTintColor: Colors.accentColor,
        labelStyle: 
        {
            //fontFamily: "open-sans-bold"
        }
    }
});

export default createAppContainer(MainNavigator);