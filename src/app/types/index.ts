type SelectOptionType = string | {value: string | number, text: string};

type FoodDeliveryFormType = {
    address: DeliveryAddressFormType
    foodItems: OrderedFoodItemType[]
  } & MasterFoodDeliveryFormType & CheckoutFormType;

type MasterFoodDeliveryFormType = {
    customerName: string;
    customerField: string;
    mobile: string;
    orderNo: number;
    Email: string;
}

type CheckoutFormType = {
    paymentMethod: string;
    deliveryIn: number;
}

type DeliveryAddressFormType = {
    streetAddress: string;
    landmark: string;
    city: string;
    state: string;
}

type OrderedFoodItemType = {foodId: number, price: number, totalPrice: number, quantity: number}

type FoodType= {
    foodId: number,
    name:string,
    price: number
}
