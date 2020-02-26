import React from 'react';
import {FlatList, Platform, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';

const AdminProductsScreen = (props) => 
{
    //Getting all products using concept of Hooks
    const adminProducts = useSelector(state => state.products.adminProducts);

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
            data = {adminProducts} 
            keyExtractor = {item => item.id} 
            renderItem = {itemData => 
                <ProductItem 
                    title = {itemData.item.title}
                    image = {itemData.item.imageUrl} 
                    price = {itemData.item.price}
                    onViewDetail = {() => {}}
                    onAddToCart = {() => {}} 
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
        )
    };
};

export default AdminProductsScreen;