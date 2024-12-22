type SelectOptionType = string | {value: string | number, text: string};

type FoodDeliveryFormType = {
    address: DeliveryAddressFormType
    foodItems: FoodItemType[]
  } & FoodDeliveryMasterFormType & CheckoutFormType;

type FoodDeliveryMasterFormType = {
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

type FoodItemType = {name: string}
