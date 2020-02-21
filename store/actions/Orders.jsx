export const ADD_ORDER = "ADD_ORDER";

export const addOrder = () => 
{
    return {
        type: ADD_ORDER,
        orderData: {items: cartItems, amount: totalAmount}
    };
};

