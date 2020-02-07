import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import ShopNavigator from './navigation/ShopNavigator';
import productsReducer from './store/reducers/Products';


//Creating a Root Reducer element
const rootReducer = combineReducers({
  products: productsReducer
});

//Creating a Store element
const store = createStore(rootReducer);

export default function App() 
{
  return (
    <Provider store = {store}>
      <ShopNavigator />
    </Provider>
  );
}
