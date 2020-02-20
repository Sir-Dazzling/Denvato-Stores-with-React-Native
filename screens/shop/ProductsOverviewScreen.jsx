import React from 'react';
import {FlatList, ToastAndroid} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/ProductItem';
import HeaderButton from '../../components/HeaderButton';
import * as cartActions from '../../store/actions/Cart';

const ProductsOverviewScreen = (props) => 
{
    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts);
    
    //Enabling useDispatch function
    const dispatch = useDispatch();

    return (
        
            <FlatList 
                data = {products} renderItem = {itemData => <ProductItem image = {itemData.item.imageUrl} price = {itemData.item.price} title = {itemData.item.title} onViewDetail = {() => {props.navigation.navigate("ProductDetails", {productId: itemData.item.id, productTitle: itemData.item.title})}} onAddToCart = {() => 
                    {dispatch(cartActions.addToCart(itemData.item)); 
                    //Displaying a toast notification to show user added to cart successfully
                    ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);}} />} />
        
    );
};

ProductsOverviewScreen.navigationOptions = (navigationData) =>
{
    return {
        headerTitle: "All Products",
        headerLeft: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Menu" iconName = "ios-menu" onPress = {() => {
                    navigationData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        ),
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Cart" iconName = "ios-cart" onPress = {() => {
                    navigationData.navigation.navigate("Cart");
                    }}/>
            </HeaderButtons>
        )
    };
};

export default ProductsOverviewScreen;