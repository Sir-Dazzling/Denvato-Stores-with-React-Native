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
import OrdersScreen from '../screens/shop/OrdersScreen';
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
    },
    homeCart: 
    {
        screen: CartScreen
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
    allProductsCart: 
    {
        screen: CartScreen
    }
},
{
    navigationOptions: 
    {
        //Putting icons to display at the side drawer
        drawerIcon: drawerConfig => (
            <Ionicons 
                name = {Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultStackNavOptions
});

const ordersNavigator = createStackNavigator({
    Orders: 
    {
        screen: OrdersScreen
    }
},
{
    navigationOptions: 
    {
        //Putting icons to display at the side drawer
        drawerIcon: drawerConfig => (
            <Ionicons 
                name = {Platform.OS === "android" ? "md-create" : "ios-list"}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
    },
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
    activeTintColor: Colors.tertiaryColor,
    shifting: true,
    barStyle: 
    {
        backgroundColor: Colors.primaryColor
    },
    navigationOptions: 
    {
        //Putting icons to display at the side drawer
        drawerIcon: (drawerConfig) => (
            <Ionicons 
                name = {Platform.OS === "android" ? "md-home" : "ios-home"}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
    }
}) 
: createBottomTabNavigator(tabScreenConfig,
{
    //Declaring a default tab styling
    tabBarOptions: 
    {
        activeTintColor: Colors.tertiaryColor,
        labelStyle: 
        {
            //fontFamily: "open-sans"
        }
    },
    navigationOptions: 
    {
        //Putting icons to display at the side drawer
        drawerIcon: drawerConfig => (
            <Ionicons 
                name = {Platform.OS === "android" ? "md-home" : "ios-home"}
                size = {23}
                color = {drawerConfig.tintColor}
            />
        )
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
   },
   userOrders: 
   {
       screen: ordersNavigator,
       navigationOptions: 
       {
           drawerLabel: "Your Orders"
       }
   }
},
{
    contentOptions: 
    {
        activeTintColor: Colors.secondaryColor,
        labelStyle: 
        {
            //fontFamily: "open-sans-bold"
        }
    }
});

export default createAppContainer(MainNavigator);