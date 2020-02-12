import React from 'react';
import {View, StyleSheet, Platform, Text, ScrollView, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons'

import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';

//Fetching local images to use in Carousel
const images = [
    require('../../images/UnitedAwayJersey.jpg'),
    require('../../images/NikeInterkit.jpg'),
    require('../../images/NikeJordanDna.jpg'),
];



const HomeScreen = (props) => 
{
    return (
        <ScrollView>
            <View style = {styles.container}>
                <View>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                </View>
                <View>
                <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>Hey</Text>
                    <Text>wey</Text>
                    <Text>wey</Text>
                    <Text>wey</Text>
                    <Text>wey</Text>

                </View>
            </View>
        </ScrollView>
            
    );
};

HomeScreen.navigationOptions = 
{
    headerTitle: "Home",
    headerLeft: () => 
    (
        <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Menu" iconName = "ios-menu" onPress = {() => {
                    
                }}/>
        </HeaderButtons>
    )
};

const styles = StyleSheet.create({
    container: 
    {
       flex: 1,
       alignItems: "baseline",
       backgroundColor: "transparent",
       marginTop: 1,
       maxHeight: "70%"
    },
    searchBarContainer: 
    {
        position: "absolute",
        opacity: 0.5,
        width: "100%",
        marginLeft: 30
    },
    cartContainer: 
    {
        position: "absolute",
        right: 15,
        top: 10,
        borderRadius: 20,
        backgroundColor: Colors.secondaryColor,
        padding: 6,
        marginRight: 15,
        width: "12%",
        alignItems: "center"
    }
});

export default HomeScreen;