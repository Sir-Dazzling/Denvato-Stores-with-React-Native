import React,{useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/Auth';

const StartUpScreen = (props) => 
{
    //Enabling useDispatch
    const dispatch = useDispatch();

    //checking the Async storage for a valid token
    useEffect(() => 
    {
        const tryLogin = async () => 
        {
            const userData = await AsyncStorage.getItem("userData");

            //if User Data is not found ..redirect to authentication screen
            if(!userData) 
            {
                props.navigation.navigate("Auth");
                return;
            }

            const transformedData = JSON.parse(userData);

            //Destructuring elements of the JSON object
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            //Checking if token is actually valid
            if(expirationDate <= new Date() || !token || !userId)
            {
                props.navigation.navigate("Auth");
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            //Else automatically redirect user to Main Shop screen
            props.navigation.navigate("Shop");
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style = {styles.screen}>
            <ActivityIndicator size = "large" color = {Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default StartUpScreen;