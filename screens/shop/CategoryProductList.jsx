import React from 'react';
import { StyleSheet, View, Text, FlatList, ToastAndroid, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import {CATEGORIES} from '../../data/dummy-data';
import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/Cart';

const CategoryProductList = (props) => 
{
    //Geeting params passed from previous screen
    const catId = props.navigation.getParam("categoryId");

    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.availableProducts);

    //Enabling useDispatch function
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => 
    {
        props.navigation.navigate("ProductDetails", 
            {
                productId: id,
                productTitle: title
            });
    };

    //Filtering the products depending on Category picked
    const displayedProducts = products.filter(product => product.categoryIds.indexOf(catId) >= 0)

    //In case no product is found
    if (displayedProducts.length === 0) 
    {
      return (
        <View style = {styles.content}>
          <Text>No products found</Text>
        </View>
      );
    }

    return (
            <FlatList 
              data = {displayedProducts} 
              renderItem = {itemData => (
                <ProductItem 
                  image = {itemData.item.imageUrl} 
                  price = {itemData.item.price} 
                  title = {itemData.item.title} 
                  onSelect = {() => {
                    selectItemHandler(itemData.item.id, itemData.item.title);
                  }}
                  onAddToCart = {() => 
                  {
                    dispatch(cartActions.addToCart(itemData.item));
                    //Displaying a toast notification to show user added to cart successfully
                    ToastAndroid.show("Added to Cart", ToastAndroid.SHORT);
                  }}>
                    <Button
                      color={Colors.primary}
                      title="View Details"
                      onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                      }}
                    />
                    <Button
                      color = {Colors.primary}
                      title = "Add To Cart"
                      onPress = {() => {
                        dispatch(cartActions.addToCart(itemData.item));
                        //Displaying a toast notification to show user added to cart successfully
                        ToastAndroid.show(itemData.item.title+" has been added to Cart", ToastAndroid.SHORT);
                      }} 
                        />
                  </ProductItem>)} />
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
                      navigationData.navigation.navigate("homeCart");
                    }}/>
            </HeaderButtons>
        )
    };
}; 

export default CategoryProductList;