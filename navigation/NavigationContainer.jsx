import React,{useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import ShopNavigator from '../navigation/ShopNavigator';

const NavigationContainer = (props) => 
{
    const navRef = useRef();

    //!! forces the token to be either true or false
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => 
    {
        //checking if user is authenticated or not...if not it redirects to Auth Screen
        if(!isAuth)
        {
            navRef.current.dispatch(NavigationActions.navigate({routeName: "Auth"}));
        }
    }, [isAuth]);

    return (
        <ShopNavigator ref = {navRef} />
    );
};

export default NavigationContainer;