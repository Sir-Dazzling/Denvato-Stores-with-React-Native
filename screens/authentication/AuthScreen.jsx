import React from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Input from '../../components/Input';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => 
{
    return (
        <KeyboardAvoidingView 
            behavior = "padding"
            keyboardVerticalOffset = {50} 
            style = {styles.screen}>
            <View style = {styles.loginContainer}>
                <ScrollView>
                    <Input
                        style = {styles.input} 
                        id = "email" 
                        label = "E-mail" 
                        keyboardType = "email-address"
                        required
                        email
                        autoCapitalize = "none"
                        errorMessage = "Please enter a valid email address."
                        onValueChange = {() => {}}
                        initialValue = ""
                        />
                        <Input
                        style = {styles.input} 
                        id = "password" 
                        label = "Password" 
                        keyboardType = "default"
                        secureTextEntry
                        required
                        minLength = {5}
                        autoCapitalize = "none"
                        errorMessage = "Please enter a valid password."
                        onValueChange = {() => {}}
                        initialValue = ""/>
                        <View style = {styles.forgotPasswordContainer}>
                            <TouchableOpacity>
                                <Text style = {styles.forgotPassword}>Forgot email/password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.confirmBtn}>
                            <TouchableOpacity >
                                <View>
                                    <Ionicons name = "ios-arrow-round-forward" size = {50} color = "white"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    loginContainer: 
    {
        width: "100%",
        paddingHorizontal: 20
    },
    input: 
    {
        color: Colors.secondaryColor
    },
    confirmBtn: 
    {
        marginLeft: 270,
        marginVertical: 10,
        backgroundColor: Colors.secondaryColor,
        borderRadius: 30,
        width: 50,
        height: 50,
        alignItems: "center"
    },
    forgotPasswordContainer: 
    {
        marginLeft: 160,
        marginVertical: 20,
        width: 200
    },
    forgotPassword: 
    {
        color: "white"
    }
});
export default AuthScreen;