import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import AppLayout from "@/components/layouts/AppLayout";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/Helper";
import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import useOrders from "@/hooks/useOrders";

function Index() {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { approveOrder, reqLoading, orderSentForDelivery, orderDelivered } =
    useOrders();
  const [close, setClose] = useState(false);
  const [showLoader, setLoader] = useState(true);
  const {
    orderId,
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
    orderTime,
    deliveryType,
    description,
    category,
    addressId,
  } = router.query;

  function handleStatusButton(status: string) {
    if (status === "PENDING") {
      approveOrder(`${orderId}`);
    }
    if (status === "APPROVED") {
      orderSentForDelivery(`${orderId}`);
    }
    if (status === "SENT_FOR_DELIVERY") {
      orderDelivered(`${orderId}`);
    }
    if (status === "DELIVERED") {
      showToast("success", "No action needed");
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoader(false);
    }, 3000);
    const warningTimerId = setTimeout(() => {
      showToast(
        "warn",
        "Please be aware that actions cannot be undone once triggered.",
      );
    }, 6000);

    return () => {
      clearInterval(timerId);
      clearTimeout(warningTimerId);
    };
  }, []);

  return (
    <AppLayout>
      <Modal onclose={close}>
        <div className=" w-[750px] bg-yellow-200/90  text-left shadow-sm">
          <div className="flex justify-around rounded-2xl bg-yellow-300/60 py-4 font-semibold text-stone-700">
            <h3 className="">Ordr id: {orderId}</h3>
            <h3>
              status: {status}
              <span>
                <Button
                  type="small"
                  loading={reqLoading}
                  onClick={() => handleStatusButton(`${status}`)}
                  bgc="bg-green-100"
                  className="ml-2 hover:bg-green-200"
                >
                  {status === "PENDING" && "👍️click to approve order💯️"}
                  {status === "APPROVED" && "🙂️click to sent for delivery🚀️"}
                  {status === "SENT_FOR_DELIVERY" && "🤠️click if delivered📝️"}
                  {status === "DELIVERED" && "🙂️Already Delivered✅️"}
                </Button>
              </span>
            </h3>
            <Button
              type="small"
              onClick={() => setClose(true)}
              bgc="bg-red-200"
              className="hover:bg-red-300"
            >
              close
            </Button>
          </div>
          {showLoader ? (
            <div className=" flex  items-center justify-center bg-yellow-300/60 p-48">
              <Loader type="small" />
            </div>
          ) : (
            <div className="flex flex-col gap-6 px-6  py-4">
              <div className="flex justify-between rounded-xl bg-blue-50 p-4 font-light text-stone-600">
                <p>This order was made at &nbsp; {formatDate(orderTime)} ,</p>
                <p>Delivery Type: {deliveryType}</p>
              </div>
              <div className="flex flex-wrap justify-between gap-4 ">
                {/* delivery details */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold uppercase text-stone-700">
                    Delivery Address
                    <div className="h-2 rounded-xl border-2 border-yellow-400 bg-yellow-300"></div>
                  </h3>
                  <ul className="my-2 space-y-1 font-medium text-stone-600">
                    <li>{address}</li>
                    <li>#id {addressId}</li>
                    <li>contact name: {cName}</li>
                    <li>{cNumber}</li>
                  </ul>
                </div>
                {/* food details */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold uppercase text-stone-700">
                    Food Details
                    <div className="h-2 rounded-xl border-2 border-yellow-400 bg-yellow-300"></div>
                  </h3>

                  <ul className="my-2 space-y-1 font-medium text-stone-600">
                    <li>{restaurant}</li>
                    <li>#id {foodId}</li>
                    <li>{category}</li>
                    <li>{title}</li>
                    {/* <li>{description}</li> */}
                    <li>{price}</li>
                  </ul>
                </div>
                {/* user details */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold uppercase text-stone-700">
                    user Details
                    <div className="h-2 rounded-xl border-2 border-yellow-400 bg-yellow-300"></div>
                  </h3>
                  <ul className="my-2 space-y-1 font-medium text-stone-600">
                    <li>{fName}</li>
                    <li>{lName}</li>
                    <li>{email}</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </AppLayout>
  );
}

export default Index;
