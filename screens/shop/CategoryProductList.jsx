import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, View, Text, FlatList, ToastAndroid, Button, ActivityIndicator } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import {CATEGORIES} from '../../data/dummy-data';
import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/Cart';
import * as productActions from '../../store/actions/Products';

const CategoryProductList = (props) => 
{
    //Setting state for app loading items or not
    const [isLoading, setIsLoading] = useState(false);

    //Setting state of screen refreshing
    const [isRefreshing, setIsRefreshing] = useState(false); 

    //Setting error of fetching process
    const [error, setError] = useState();

    //Getting params passed from previous screen
    const catId = props.navigation.getParam("categoryId");

    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.availableProducts);

    //Enabling useDispatch function
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => 
    {
        console.log("Loading Products");
        setError(null);
        setIsRefreshing(true);
        try
        {
            await dispatch(productActions.fetchProducts());
        } 
        catch(err)
        {
            setError(err.message);
        }
        setIsRefreshing(false);
    },[dispatch, setIsLoading, setError]);

    useEffect(() => 
    {
      setIsLoading(true);
      loadProducts().then(() => 
      {
        setIsLoading(false);
      });
    },[dispatch, loadProducts]);

    //adding navigation listener
    useEffect(() => 
    {
        const willFocusSub = props.navigation.addListener("willFocus", loadProducts);

        return (() => {
            willFocusSub.remove();
        });
    }, [loadProducts]);

    const selectItemHandler = (id, title) => 
    {
        props.navigation.navigate("ProductDetails", 
            {
                productId: id,
                productTitle: title
            });
    };

    //Filtering the products depending on category picked
    const displayedProducts = products.filter(product => product.categoryIds.indexOf(catId) >= 0)

    //Checking if an error ocured during processing fetch requests
    if(error)
    {
        <View style = {styles.centered}>
            <Text>An Error Occured</Text>
            <Button title = "Try again" onPress = {loadProducts} color = {Colors.primary} />
        </View>
    }

    //Checking if app is still loading items or not
    if(isLoading)
    {
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size = "large" color = {Colors.primary} />
            </View>
        );
    }

    //Checking if there are no products to render or if list is empty
    if(!isLoading && displayedProducts.length === 0)
    {
        return (
            <View style = {styles.centered}>
                <Text>No Products Found</Text>
            </View>
        );
    }

    return (
            <FlatList
              onRefresh = {loadProducts}
              refreshing = {isRefreshing}  
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

const styles = StyleSheet.create({
  centered: 
  {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  }
});
export default CategoryProductList;