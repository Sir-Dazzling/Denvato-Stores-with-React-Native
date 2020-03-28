import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = "SET_PRODUCTS";

//Fetching latest products from Firebase
export const fetchProducts = () => 
{
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    //Executing async code
    try
    {
      //Fetching products from firebase server
    const response = await fetch("https://denvato-stores-mobile.firebaseio.com/products.json");

    if(!response.ok)
    {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedProducts = [];
    
    for (const key in resData)
    {
      loadedProducts.push(new Product(key, userId, resData[key].title, resData[key].categoryIds, resData[key].imageUrl, resData[key].description, resData[key].price));
    }

    console.log(resData);
    dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch(err)
    {
      //Send to custom analytics server
      throw err;
    }
    
  };
};

export const deleteProduct = (productId) => 
{
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://denvato-stores-mobile.firebaseio.com/products/${productId}.json?auth=${token}`, 
    {
      method: "DELETE"
    });

    if(!response.ok)
    {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, categoryIds, imageUrl, description, price) => 
{
  return async (dispatch, getState) => {
    //Executing async code
    //Fetching products from firebase server
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`https://denvato-stores-mobile.firebaseio.com/products.json?auth=${token}`, 
    {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        categoryIds,
        imageUrl,
        description,
        price,
        adminId: userId
      })
    });

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: 
      {
        title,
        categoryIds,
        imageUrl,
        description,
        price,
        adminId: userId
      }
    });
  }
};

export const updateProduct = (id, title, categoryIds, imageUrl, description) => 
{
  return async(dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`https://denvato-stores-mobile.firebaseio.com/products/${id}.json?auth=${token}`, 
    {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        categoryIds,
        imageUrl,
        description
      })
    });

    if(!response.ok)
    {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        categoryIds,
        imageUrl,
        description
      }
    });
  };
};