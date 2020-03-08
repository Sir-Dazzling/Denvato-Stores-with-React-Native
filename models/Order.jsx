import moment from 'moment';

class Order 
{
    constructor(id, items, totalAmount, date)
    {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    //To get LocalDate from OS
    get readableDate() 
    {
        return moment(this.date).format("MMMM Do YYYY, hh:mm a");
    }
};

export default Order;