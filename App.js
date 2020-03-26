import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/Products';
import categoriesReducer from './store/reducers/Categories';
import cartReducer from './store/reducers/Cart';
import ordersReducer from './store/reducers/Orders';
import authenticationReducer from './store/reducers/Auth';

//Creating a Root Reducer element
const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authenticationReducer
});

//Creating a Store element
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//Fetching fonts
const fetchFonts = () => 
{
  return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() 
{
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded)
  {
    return <AppLoading startAsync = {fetchFonts} onFinish = {() => {setFontLoaded(true)}} />
  }

  return (
    <Provider store = {store}>
      <ShopNavigator />
     
    </Provider>
  );
}
