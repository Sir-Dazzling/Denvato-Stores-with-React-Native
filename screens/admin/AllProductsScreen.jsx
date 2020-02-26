import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';

const AllProductsScreen = (props) => 
{
    //Getting all products using concept of Hooks
    const adminProducts = useSelector(state => state.products.adminProducts);

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
                />
            } 
        />
    );
};

//Configuring the Navigation Options
AllProductsScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: "Admin Hub",
        headerLeft: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                    <Item title = "Menu" iconName = "ios-menu" onPress = {() => 
                    {
                        navigationData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    };
};

export default AllProductsScreen;