import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EditProductsScreen = (props) => 
{
    return (
        <View>
            <Text>The Edit Product Screen!!!</Text>
        </View>
    )
};

EditProductsScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: "Edit Product",
    };
};

const styles = StyleSheet.create({

});

export default EditProductsScreen;