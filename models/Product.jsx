class Product
{
    constructor(id, adminId, title, categoryIds, imageUrl, description, price) 
    {
        this.id = id;
        this.adminId = adminId;
        this.title = title;
        this.categoryIds = categoryIds;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

export default Product;