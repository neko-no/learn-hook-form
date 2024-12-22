type SelectOptionType = string | {value: string | number, text: string};

type FoodDeliveryFormType = {
    customerName: string;
    customerField: string;
    mobile: string;
    orderNo: number;
    Email: string;
    address: {
      streetAddress: string;
      landmark: string;
      city: string;
      state: string;
    };
  } & CheckoutFormType;

type CheckoutFormType = {
    paymentMethod: string;
    deliveryIn: number;
}
