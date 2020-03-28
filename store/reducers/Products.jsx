import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actions/Products';
import Product from '../../models/Product';

const PRODUCTS = [];

const initialState = 
{
  availableProducts: PRODUCTS
};

export default (state = initialState, action) => 
{
  switch (action.type) {
    case SET_PRODUCTS: 
    return {
      availableProducts: action.products
    }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        action.productData.adminId,
        action.productData.title,
        action.productData.categoryIds,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      
      const updatedProduct = new Product(
        action.pid,
        state.availableProducts[availableProductIndex].adminId,
        action.productData.title,
        action.productData.categoryIds,
        action.productData.imageUrl,
        action.productData.description,
        state.availableProducts[availableProductIndex].price
      );
    
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
  }
  return state;
};