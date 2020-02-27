import React,{useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import HeaderButton from '../../components/HeaderButton';

const EditProductsScreen = (props) => 
{
    //Getting Product id via params from previous screen
    const prodId = props.navigation.getParam("productId");

    //Getting admin products based on id with use of Hooks
    const editedProduct = useSelector(state => state.products.adminProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : "");
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : "");
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "");

    return (
        <ScrollView>
            <View style = {styles.form}>
                <View style = {styles.formControl}>
                    <Text style = {styles.label}>Title</Text>
                    <TextInput style = {styles.input} value = {title} onChangeText = {text => setTitle(text)} />
                </View>
                <View style = {styles.formControl}>
                    <Text style = {styles.label}>Image URL</Text>
                    <TextInput style = {styles.input} value = {imageUrl} onChangeText = {text => setImageUrl(text)} />
                </View>
                {
                    //Checking if its new or existing product...if new gives option to input price else hides option
                    editedProduct ? null : (
                        <View style = {styles.formControl}>
                            <Text style = {styles.label}>Price</Text>
                            <TextInput style = {styles.input} value = {price} onChangeText = {text => setPrice(text)} />
                        </View>
                    )
                }
                <View style = {styles.formControl}>
                    <Text style = {styles.label}>Description</Text>
                    <TextInput style = {styles.input} value = {description} onChangeText = {text => setDescription(text)} />
                </View>
            </View>
        </ScrollView> 
    );
};

EditProductsScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: navigationData.navigation.getParam("productId") ? "Edit Product" : "Add Product",
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                    <Item
                        title = "Save"
                        iconName = {Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"} 
                        onPress = {() => 
                        {
                            
                        }}/>
            </HeaderButtons>
        ) 
    };
};

const styles = StyleSheet.create({
    form: 
    {
        margin: 20
    },
    formControl: 
    {
        width: "100%"
    },
    label: 
    {
        fontFamily: "open-sans-bold",
        marginVertical: 8
    },
    input: 
    {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    }
});

export default EditProductsScreen;