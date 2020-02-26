import React from 'react';
import {FlatList,Button,ToastAndroid} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import ProductItem from '../../components/ProductItem';
import HeaderButton from '../../components/HeaderButton';
import * as cartActions from '../../store/actions/Cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => 
{
    //Getting All Products from Reducers with Hooks
    const products = useSelector(state => state.products.allProducts);
    
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

    return (
        
            <FlatList 
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
export default ProductsOverviewScreen;