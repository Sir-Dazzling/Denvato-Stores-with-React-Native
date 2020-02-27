import React from 'react';
import {FlatList, Platform, Button, ToastAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/Products';

const AdminProductsScreen = (props) => 
{
    //Getting all products using concept of Hooks
    const adminProducts = useSelector(state => state.products.adminProducts);

    //Enabling useDispatch function
    const dispatch = useDispatch();

    const editProductHandler = (id) => 
    {
        props.navigation.navigate("editProduct", {productId: id});
    };

    return (
        <FlatList 
            data = {adminProducts} 
            keyExtractor = {item => item.id} 
            renderItem = {itemData => 
                <ProductItem 
                    title = {itemData.item.title}
                    image = {itemData.item.imageUrl} 
                    price = {itemData.item.price}
                    onSelect = {() => {
                        editProductHandler(itemData.item.id);
                    }} 
                >
                    <Button
                        color={Colors.primary}
                        title="Edit Product"
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                        />
                    <Button
                        color = {Colors.primary}
                        title = "Delete Product"
                        onPress = {() => {
                            dispatch(productActions.deleteProduct(itemData.item.id));
                            //Displaying a toast notification to show user added to cart successfully
                            ToastAndroid.show(itemData.item.title+" has been deleted", ToastAndroid.SHORT);
                        }} 
                        />  
                </ProductItem>
            } 
        />
    );
};

//Configuring the Navigation Options
AdminProductsScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: "Admin Hub",
        headerLeft: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                    <Item
                        title = "Menu"
                        iconName = {Platform.OS === "android" ? "md-menu" : "ios-menu"} 
                        onPress = {() => 
                    {
                        navigationData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        ),
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                    <Item
                        title = "Menu"
                        iconName = {Platform.OS === "android" ? "md-create" : "ios-create"} 
                        onPress = {() => 
                        {
                            navigationData.navigation.navigate("editProduct");
                        }}/>
            </HeaderButtons>
        )
    };
};

export default AdminProductsScreen;