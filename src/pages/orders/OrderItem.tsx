import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function OrderItem({
  status,
  orderId,
  image,
  foodId,
  description,
  category,
  addressId,
  restaurant,
  title,
  price,
  address,
  cName,
  cNumber,
  fName,
  lName,
  email,
  orderTime,
  deliveryType,
}: any) {
  const router = useRouter();
  function handleViewDetail() {
    router.push({
      pathname: `/orders/${orderId}`,
      query: {
        status,
        foodId,
        restaurant,
        title,
        price,
        address,
        cName,
        cNumber,
        fName,
        lName,
        email,
        category,
        description,
        orderTime,
        deliveryType,
        addressId,
      },
    });
  }
  return (
    <li className="hover:duration-120 hover:scale-105  hover:shadow-lg hover:transition-all">
      <div className="min-h-full rounded-2xl bg-white px-2 py-8 text-center shadow-md">
        <div className="flex flex-grow flex-col items-center">
          <>
            <Image
              src={image}
              width={100}
              height={100}
              alt="foodIcon"
              className="mb-2 rounded-full bg-slate-200 p-2"
            />
            <h3 className="text-stone-600">
              OrderId: <span className="font-medium">{orderId}</span>
            </h3>
            <h3 className="text-stone-600">
              Status: <span className="text-sm font-medium">{status}</span>
            </h3>
          </>
          <Button
            type="small"
            onClick={handleViewDetail}
            bgc="bg-yellow-100"
            className="mt-6 hover:bg-yellow-200"
          >
            view details
          </Button>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
