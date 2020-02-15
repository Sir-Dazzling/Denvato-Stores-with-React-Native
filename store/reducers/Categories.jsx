import {CATEGORIES} from '../../data/dummy-data';
import { State } from 'react-native-gesture-handler';

//Setting the Default Initial State of the Product.
const initialState = 
{
    allCategories: CATEGORIES
};

const categoriesReducer = (state = initialState, action) => 
{
    return State;
};

export default categoriesReducer;