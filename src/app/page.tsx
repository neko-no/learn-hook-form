"use client";

import { FC } from "react";
import { FoodDeliveryForm } from "./FoodDelivery/FoodDeliveryForm";

const Page: FC = () => {
  return (
    <div className="container">
      <div className="mx-5">
        <FoodDeliveryForm />
      </div>
    </div>
  );
};

export default Page;
