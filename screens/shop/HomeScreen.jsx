import React from 'react';
import {View, StyleSheet,ScrollView, Dimensions, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import CustomSearchBar from '../../components/SearchBar';
import SectionHeader from '../../components/SectionHeader';
import CategoryItem from '../../components/CategoryItem';
import {CATEGORIES} from '../../data/dummy-data';

//Getting dimension width of device
const DEVICE_WIDTH = Dimensions.get("window").width;

const HomeScreen = (props) => 
{
    //To render grid items to screen
    const renderCategoryItems = (itemData) => 
    {
        return (
            <CategoryItem categoryTitle = {itemData.item.categoryTitle} vectorName = {itemData.item.vectorName}  onSelect = {() => 
            {
                //Added a param of categoryId
                props.navigation.navigate({routeName: "ProductsList", params:{categoryId: itemData.item.id}});
            }} />
        );
    };

    return (
        <ScrollView>
            <View style = {styles.container}>
                <View style = {styles.searchBarContainer}>
                    <CustomSearchBar/>
                </View>
                <View style = {styles.sectionHeaderContainer}>
                    <SectionHeader sectionTitle = "Categories" vectorName = "ios-arrow-forward" onSelect = {() => 
                        {
                            
                        }}/>
                </View>
               <FlatList horizontal = {true} data = {CATEGORIES} renderItem = {renderCategoryItems} showsHorizontalScrollIndicator = {false} />
            </View>
        </ScrollView>
            
    );
};

//Configuring the Navigation Options
HomeScreen.navigationOptions = (navigationData) => 
{
    return {
        headerTitle: "Home",
        headerLeft: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                    <Item title = "Menu" iconName = "ios-menu" onPress = {() => 
                    {
                        navigationData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        ),
        headerRight: () => 
        (
            <HeaderButtons HeaderButtonComponent = {HeaderButton} >
                <Item title = "Cart" iconName = "ios-cart" onPress = {() => 
                    {
                        navigationData.navigation.navigate("homeCart");
                    }}/>
            </HeaderButtons>
        )
    };
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