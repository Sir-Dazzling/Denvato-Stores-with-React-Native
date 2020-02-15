import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import ProductItem from '../../components/ProductItem';

const ProductsOverviewScreen = (props) => 
{
    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts); 

    return (
        
            <FlatList data = {products}  renderItem = {itemData => <ProductItem image = {itemData.item.imageUrl} price = {itemData.item.price} title = {itemData.item.title} onViewDetail = {() => {}} onAddToCart = {() => {}} />} />
        
    );
};

ProductsOverviewScreen.navigationOptions = 
{
    headerTitle: "All Products"
};

export default ProductsOverviewScreen;