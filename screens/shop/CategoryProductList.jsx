import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import {CATEGORIES} from '../../data/dummy-data';
import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';

const CategoryProductList = (props) => 
{
    //Geeting params passed from previous screen
    const catId = props.navigation.getParam("categoryId");

    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts);

    //Filtering the products depending on Category picked
    const displayedProducts = products.filter(product => product.categoryIds.indexOf(catId) >= 0)

    if (displayedProducts.length === 0) 
    {
      return (
        <View style = {styles.content}>
          <Text>No products found</Text>
        </View>
      );
    }

    return (
        <ScrollView>
            <FlatList data = {displayedProducts} renderItem = {itemData => <ProductItem image = {itemData.item.imageUrl} price = {itemData.item.price} title = {itemData.item.title} onViewDetail = {() => {}} onAddToCart = {() => {}} />} />
        </ScrollView>
    );
};

//Creating Stylesheet
const styles = StyleSheet.create({

});

//Configuring and Styling Header
CategoryProductList.navigationOptions = (navigationData) =>
{
   const catId = navigationData.navigation.getParam("categoryId");

  //To find Category details in which user clicked on
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId );

    return {
        headerTitle: selectedCategory.categoryTitle,
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Cart" iconName = "ios-cart" onPress = {() => 
                    {
    
                    }}/>
            </HeaderButtons>
        )
    };
}; 

export default CategoryProductList;