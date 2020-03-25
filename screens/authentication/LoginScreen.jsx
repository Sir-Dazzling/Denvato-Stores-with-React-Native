import React, {useReducer, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/Auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//Form reducer to manage form state
const formReducer = (state, action) => 
{
  if (action.type === FORM_INPUT_UPDATE)
  {
    const updatedValues = 
    {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = 
    {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) 
    {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const LoginScreen = (props) => 
{
    //Enabling useDispatch
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, 
    {
        inputValues: 
        {
            email: "",
            password: "",
        },
        inputValidities: 
        {
            email: false,
            password: false
        },
        formIsValid: false
    });

    //Handler of Sign Up process
    const signInHandler = () => 
    {
        dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password));
    };

    //Handler for input chnage
    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => 
    {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
        [dispatchFormState]
    );

    return (
        <KeyboardAvoidingView 
            behavior = "padding"
            keyboardVerticalOffset = {50} 
            style = {styles.screen}>
            <View style = {styles.loginContainer}>
                <ScrollView>
                    <Input
                        style = {styles.input}
                        inputColor = {styles.inputCol}
                        id = "email" 
                        label = "E-mail" 
                        keyboardType = "email-address"
                        required
                        email
                        autoCapitalize = "none"
                        errorMessage = "Please enter a valid email address."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""
                        />
                    <Input
                        style = {styles.input}
                        inputColor = {styles.inputCol} 
                        id = "password" 
                        label = "Password" 
                        keyboardType = "default"
                        secureTextEntry
                        required
                        minLength = {5}
                        autoCapitalize = "none"
                        errorMessage = "Please enter a valid password."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""/>
                    
                    <View style = {styles.wrapper}>
                        <View style = {styles.forgotPasswordContainer}>
                            <TouchableOpacity>
                                <Text style = {styles.forgotPassword}>Forgot email/password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.confirmBtn}>
                             <TouchableOpacity onPress = {signInHandler}>
                                <View>
                                     <Ionicons name = "ios-arrow-round-forward" size = {50} color = "white"/>
                                </View>
                            </TouchableOpacity>
                        </View>
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
    inputCol: 
    {
        color: "white"
    },
    wrapper: 
    {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginVertical: 30,
        marginRight: 10

    },
    confirmBtn: 
    {
        backgroundColor: Colors.secondaryColor,
        borderRadius: 30,
        width: 50,
        height: 50,
        alignItems: "center"
    },
    forgotPasswordContainer: 
    {
        marginVertical: 20
    },
    forgotPassword: 
    {
        color: "white"
    },
    placeHolderTextCol: 
    {
        color: "white"
    }
});
export default LoginScreen;