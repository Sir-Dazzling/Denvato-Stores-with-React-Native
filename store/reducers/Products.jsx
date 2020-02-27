import {PRODUCTS} from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/Products';

//Setting the Default Initial State of the Product.
const initialState = 
{
    allProducts: PRODUCTS,
    adminProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

const productsReducer = (state = initialState, action) => 
{
    switch (action.type){
        case DELETE_PRODUCT: 
            return {
                ...state,
                adminProducts: state.adminProducts.filter(product => product.id !== action.pId),
                allProducts: state.allProducts.filter(product => product.id !== action.pId)
            };
    }
    return state;
};

export default productsReducer