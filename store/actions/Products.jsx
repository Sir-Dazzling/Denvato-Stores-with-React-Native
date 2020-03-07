import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = "SET_PRODUCTS";

//Fetching latest products from Firebase
export const fetchProducts = () => 
{
  return async dispatch => {
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
      loadedProducts.push(new Product(key, "u1", resData[key].title, resData[key].categoryIds, resData[key].imageUrl, resData[key].description, resData[key].price));
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
  return async dispatch => {
    await fetch(`https://denvato-stores-mobile.firebaseio.com/products/${productId}.json`, 
    {
      method: "DELETE"
    });
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, categoryIds, imageUrl, description, price) => 
{
  return async dispatch => {
    //Executing async code
    //Fetching products from firebase server
    const response = await fetch("https://denvato-stores-mobile.firebaseio.com/products.json", 
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
        price
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
        price
      }
    });
  }
};

export const updateProduct = (id, title, categoryIds, imageUrl, description) => 
{
  return async dispatch => {
     await fetch(`https://denvato-stores-mobile.firebaseio.com/products/${id}.json`, 
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
