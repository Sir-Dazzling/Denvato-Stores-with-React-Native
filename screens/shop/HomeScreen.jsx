import React from 'react';
import {View, StyleSheet,ScrollView, Dimensions} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

import HeaderButton from '../../components/HeaderButton';
import CustomSearchBar from '../../components/SearchBar';
import SectionHeader from '../../components/SectionHeader';
import Colors from '../../constants/Colors';

//Getting dimension width of device
const DEVICE_WIDTH = Dimensions.get("window").width;

const HomeScreen = (props) => 
{
    return (
        <ScrollView>
            <View style = {styles.container}>
                <View style = {styles.searchBarContainer}>
                    <CustomSearchBar/>
                </View>
                <View style = {styles.sectionHeaderContainer}>
                    <SectionHeader sectionTitle = "Categories" vectorName = "ios-arrow-forward"/>
                </View>
            </View>
        </ScrollView>
            
    );
};

//Configuring the Navigation Options
HomeScreen.navigationOptions = 
{
    headerTitle: "Home",
    headerLeft: () => 
    (
        <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Menu" iconName = "ios-menu" onPress = {() => 
                {
                    
                }}/>
        </HeaderButtons>
    ),
    headerRight: () => 
    (
        <HeaderButtons HeaderButtonComponent = {HeaderButton} >
            <Item title = "Cart" iconName = "ios-cart" onPress = {() => 
                {

                }}/>
        </HeaderButtons>
    )
};

const styles = StyleSheet.create({
    container: 
    {
       flex: 1
    },
    searchBarContainer: 
    {
       flexDirection: "row"
    },
    sectionHeaderContainer : 
    {
        width: "150%"
    }
});

export default HomeScreen;