import React, {useState, useEffect,useCallback} from 'react';
import {FlatList,Button,ToastAndroid,ActivityIndicator,View,StyleSheet,Text} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/ProductItem';
import HeaderButton from '../../components/HeaderButton';
import * as cartActions from '../../store/actions/Cart';
import * as productActions from '../../store/actions/Products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => 
{
    //Setting state for app loading items or not
    const [isLoading, setIsLoading] = useState(false);

    //Setting state of screen refreshing
    const [isRefreshing, setIsRefreshing] = useState(false); 

    //Setting error of fetching process
    const [error, setError] = useState();

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

    //Checking if an error ocured during processing fetch requests
    if(error)
    {
        <View style = {styles.spinner}>
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

    //Checking if tere are no products to render or if list is empty
    if(!isLoading && products.length === 0)
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
                data = {products} 
                renderItem = {itemData => (
                    <ProductItem 
                        image = {itemData.item.imageUrl} 
                        price = {itemData.item.price} 
                        title = {itemData.item.title} 
                        onSelect = {() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }} 
                    >
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
                    navigationData.navigation.navigate("allProductsCart");
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
export default ProductsOverviewScreen;