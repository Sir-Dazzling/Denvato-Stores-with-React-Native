import React from 'react';
import { StyleSheet, View, Text, FlatList, ToastAndroid } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import {CATEGORIES} from '../../data/dummy-data';
import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import * as cartActions from '../../store/actions/Cart';

const CategoryProductList = (props) => 
{
    //Geeting params passed from previous screen
    const catId = props.navigation.getParam("categoryId");

    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts);

    //Enabling useDispatch function
    const dispatch = useDispatch();

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
            <FlatList data = {displayedProducts} renderItem = {itemData => <ProductItem image = {itemData.item.imageUrl} price = {itemData.item.price} title = {itemData.item.title} onViewDetail = {() => 
              {
                props.navigation.navigate("ProductDetails",
                {
                  productId: itemData.item.id,
                  productTitle: itemData.item.title
                })
              }}
              onAddToCart = {() => 
                {
                  dispatch(cartActions.addToCart(itemData.item));
                  //Displaying a toast notification to show user added to cart successfully
                  ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
                }} />} />
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
                <Item title = "Cart" iconName = "ios-cart" onPress = {() => 
                    {
                      navigationData.navigation.navigate("Cart");
                    }}/>
            </HeaderButtons>
        )
    };
}; 

export default CategoryProductList;