import React from 'react';
import {View, Text, Image, Button, StyleSheet, ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/HeaderButton';

const ProductsDetailsScreen = (props) => 
{
    const productId = props.navigation.getParam("productId");

    const selectedProduct = useSelector(state => state.products.allProducts).find(prod => prod.id === productId)

    return (
       <ScrollView>
            <Image style = {styles.image} source = {{uri: selectedProduct.imageUrl}} />
            <View style = {styles.actions}>
                <Text style = {styles.price}>Price: &#8358;{selectedProduct.price.toFixed(2)}</Text>
                <Button color = {Colors.primary} title = "Add To Cart" onPress = {() => {}} />
            </View>
            <View style = {styles.descriptionContainer}>
                <Text style = {styles.descriptionHeader}>Description</Text>
                <Text style = {styles.description}>{selectedProduct.description}</Text>
            </View> 
       </ScrollView>
    );
};

ProductsDetailsScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: navigationData.navigation.getParam("productTitle"),
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Cart" iconName = "ios-cart" onPress = {() => {
                    
                    }}/>
            </HeaderButtons>
        )
    };
};

//Creating the Stylesheet
const styles = StyleSheet.create({
    image: 
    {
        width: "100%",
        height: 300
    },
    price: 
    {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    descriptionContainer: 
    {
        
    },
    descriptionHeader: 
    {
        color: "red",
        fontWeight: "bold",
        fontSize: 22,
        marginHorizontal: 30,
        marginVertical: 10
    },
    description: 
    {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 40
    },
    actions: 
    {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 20
    }
});

export default ProductsDetailsScreen;