import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/Cart";
import CartItem from "../../models/Cart-item";

const initialState = 
{
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => 
{
    switch (action.type)
    {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            //Checking if product has already been added to cart
            if(state.items[addedProduct.id])
            {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            }
            else
            {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }

            return {
                ...state,
                items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pId];
            const currentQty = state.items[action.pId].quantity;
            let updatedCartItems;
            if(currentQty > 1)
            {
                //Reducing Quantity not erasing it
                const updatedCartItem = new CartItem(selectedCartItem.quantity - 1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.sum - selectedCartItem.productPrice);

                updatedCartItems = {...state.items, [action.pId]: updatedCartItem};
            } 
            else
            {
                //Deleting cart Item
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pId];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
    }
    return state;
};