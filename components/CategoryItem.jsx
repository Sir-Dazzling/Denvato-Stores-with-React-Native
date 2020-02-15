import React from 'react';
import {View,Text,StyleSheet,Platform,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CategoryItem = (props) => 
{
    let TouchableComponent = TouchableOpacity;

    if(Platform.OS === "android" && Platform.Version >= 21)
    {
        TouchableComponent = TouchableNativeFeedback
    }

    return (
        <View style = {styles.categoryContainer}>
            <TouchableComponent style = {{flex: 1}}  onPress = {props.onSelect}>
                <View style = {styles.categoryItem}>
                    <Ionicons name = {props.vectorName} size = {40} color = {Colors.secondaryColor} />
                    <Text style = {styles.title}>{props.categoryTitle}</Text>
                </View>
            </TouchableComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: 
    {
        height: 150,
        margin: 15,
        overflow: Platform.OS == "android" && Platform.Version >= 21 ? "hidden" : "visible",
        elevation: 5,
        borderRadius: 10
    },
    categoryItem: 
    {
        backgroundColor: "#ffffff",
        flex: 1,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 10,
        padding: 10,
        justifyContent: "center",
        padding: 45,
        textAlign: "center",
        alignItems: "center"
    },
    title: 
    {
        marginVertical: 10,
        fontWeight: "bold"
    }
});

export default CategoryItem;