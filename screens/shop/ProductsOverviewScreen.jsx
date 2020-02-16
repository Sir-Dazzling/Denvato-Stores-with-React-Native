import React from 'react';
import {FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import ProductItem from '../../components/ProductItem';
import HeaderButton from '../../components/HeaderButton';

const ProductsOverviewScreen = (props) => 
{
    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts); 

    return (
        
            <FlatList data = {products}  renderItem = {itemData => <ProductItem image = {itemData.item.imageUrl} price = {itemData.item.price} title = {itemData.item.title} onViewDetail = {() => {props.navigation.navigate("ProductDetails", {productId: itemData.item.id, productTitle: itemData.item.title})}} onAddToCart = {() => {}} />} />
        
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
                    
                    }}/>
            </HeaderButtons>
        ),
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Cart" iconName = "ios-cart" onPress = {() => {
                    
                    }}/>
            </HeaderButtons>
        )
    };
};

export default ProductsOverviewScreen;