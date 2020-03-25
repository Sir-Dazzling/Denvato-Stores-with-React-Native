import React, {useReducer, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/Auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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

const SignUpScreen = (props) => 
{
    //Enabling useDispatch
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, 
        {
            inputValues: 
            {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                cpassword: ""
            },
            inputValidities: 
            {
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                cpassword: false
        },
            formIsValid: false
      });

    //Handler of Sign Up process
    const signUpHandler = () => 
    {
        dispatch(authActions.signUp(formState.inputValues.firstName,formState.inputValues.lastName,formState.inputValues.email, formState.inputValues.password));
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

    //checking if password and confirm password matches
    // if(inputValues.password != inputValues.cpassword)
    // {
    //     Alert.alert('password doesnt match confirm password', 'Please check the errors in the form.', 
    //   [
    //     { text: 'Okay' }
    //   ]);
    // }

    return (
        <KeyboardAvoidingView 
            behavior = "padding"
            keyboardVerticalOffset = {50} 
            style = {styles.screen}>
            <View style = {styles.signupContainer}>
                <ScrollView>
                    <Input
                        style = {styles.input}
                        inputColor = {styles.inputCol} 
                        id = "firstName" 
                        label = "First Name" 
                        keyboardType = "default"
                        required
                        firstName
                        autoCapitalize = "none"
                        errorText = "Please enter a valid name."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""
                        />
                    <Input
                        style = {styles.input}
                        inputColor = {styles.inputCol} 
                        id = "lastName" 
                        label = "Last Name" 
                        keyboardType = "default"
                        required
                        lastName
                        autoCapitalize = "none"
                        errorText = "Please enter a valid name."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""
                        />
                    <Input
                        style = {styles.input}
                        inputColor = {styles.inputCol} 
                        id = "email" 
                        label = "E-mail" 
                        keyboardType = "email-address"
                        required
                        email
                        autoCapitalize = "none"
                        errorText = "Please enter a valid email address."
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
                        password
                        minLength = {5}
                        autoCapitalize = "none"
                        errorText = "Please enter a valid password."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""/>
                    <Input
                        style = {styles.input}
                        inputColor = {styles.inputCol} 
                        id = "cpassword" 
                        label = "Confirm Password" 
                        keyboardType = "default"
                        secureTextEntry
                        required
                        cpassword
                        minLength = {5}
                        autoCapitalize = "none"
                        errortest = "Please make sure it matches with your password."
                        onValueChange = {inputChangeHandler}
                        initialValue = ""/>
                        <View style = {styles.wrapper}>
                            <View style = {styles.confirmBtn}>
                                <TouchableOpacity onPress = {signUpHandler}>
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
    signupContainer: 
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
    }
});
export default SignUpScreen;