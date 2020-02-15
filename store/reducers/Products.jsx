import {PRODUCTS} from '../../data/dummy-data';

//Setting the Default Initial State of the Product.
const initialState = 
{
    allProducts: PRODUCTS,
    adminProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

const productsReducer = (state = initialState, action) => 
{
    return state;
};

export default productsReducer