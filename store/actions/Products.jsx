export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, categoryIds, imageUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      categoryIds,
      imageUrl,
      description,
      price
    }
  };
};

export const updateProduct = (id, title, categoryIds, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      categoryIds,
      imageUrl,
      description
    }
  };
};
