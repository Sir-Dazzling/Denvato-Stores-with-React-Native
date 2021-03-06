import React, {useReducer, useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import Input from '../../components/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/Auth';
import { ActivityIndicator } from 'react-native-paper';

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
    //Montitoring loading process
    const [isLoading, setIsLoading] = useState(false);

    //Setting state of errors
    const [error, setError] = useState();

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

      useEffect(() => 
    {
        if(error)
        {
            Alert.alert("An error occured", error, [{text: "okay"}]);
        }
    }, [error]);

    //Handler of Sign Up process
    const signUpHandler = useCallback(async() => 
    {
        setError(null);
        setIsLoading(true);

        if(formState.inputValues.password != formState.inputValues.cpassword)
        {
            Alert.alert('Error!', 'Password and Confirm Password does not match', 
            [
                { text: 'Okay' }
            ]);
        }
        else
        {
            try 
            {
                await dispatch(authActions.signUp(formState.inputValues.firstName,formState.inputValues.lastName,formState.inputValues.email, formState.inputValues.password));
                props.navigation.navigate("Shop");
            }
            catch(err)
            {
                setError(err.message);
                setIsLoading(false);
            }   
        }  
    });

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
                        errorText = "Please make sure your password and confirm password are the same."
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
                        errortext = "Please make sure it matches with your password."
                        onInputChange = {inputChangeHandler}
                        initialValue = ""/>
                        <View style = {styles.wrapper}>
                            {isLoading ? <ActivityIndicator /> : <View style = {styles.confirmBtn}>
                                <TouchableOpacity onPress = {signUpHandler}>
                                    <View>
                                        <Ionicons name = "ios-arrow-round-forward" size = {50} color = "white"/>
                                    </View>
                                </TouchableOpacity>
                            </View>}
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