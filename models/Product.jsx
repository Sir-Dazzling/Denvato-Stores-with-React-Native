class Product
{
    constructor(id, ownerId, title, categoryIds, imageUrl, description, price) 
    {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.categoryIds = categoryIds;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

export default Product;