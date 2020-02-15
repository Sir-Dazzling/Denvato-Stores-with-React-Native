import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

const SectionHeader = (props) => 
{
    return (
        <View style = {styles.container}>
            <Text style = {{fontWeight: "bold"}}>{props.sectionTitle}</Text>
            <TouchableOpacity onPress = {() => 
                {
                    //Added a param of categoryId
                    props.navigation.navigate({routeName: "CategoryProductList", params:{categoryId: itemData.item.id}});
                }}>
                <View style = {styles.seeAll}>
                    <Text>See All</Text>
                    <Ionicons name = {props.vectorName} size = {18} color = {Colors.primaryColor}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

//Creating the StyleSheet
const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        flexDirection: "row",
        width: "78%",
        marginVertical: 20,
        marginHorizontal: 25,
        justifyContent: "space-between"
    },
    seeAll: 
    {
        flexDirection: "row",
        width: "35%",
        justifyContent: "space-around"
    }
});

export default SectionHeader;