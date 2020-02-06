import PRODUCTS from '../../data/dummy-data';

//Setting the Default Initial State of the Product.
const initialState = 
{
    allProducts: PRODUCTS,
    adminProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

export default (state = initialState, action) => 
{
    return state;
};