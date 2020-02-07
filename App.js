import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

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
      <View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
