import React from 'react';
import {FlatList,Text, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => 
{
    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts); 

    return (
        <ScrollView>
            <FlatList data = {products}  renderItem = {itemData => <ProductItem image = {itemData.item.imageUrl} price = {itemData.item.price} title = {itemData.item.title} onViewDetail = {() => {}} onAddToCart = {() => {}} />} />
        </ScrollView>
    );
};

ProductsOverviewScreen.navigationOptions = 
{
    headerTitle: "All Products"
};

export default ProductsOverviewScreen;