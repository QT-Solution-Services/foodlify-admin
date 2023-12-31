import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import AppLayout from "@/components/layouts/AppLayout";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/Helper";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import useOrders from "@/hooks/useOrders";

function Index() {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const {
    approveOrder,
    rejectOrder,
    reqLoading,
    rejLoading,
    orderSentForDelivery,
    orderDelivered,
    fetchSingleOrders,
  } = useOrders();
  const [close, setClose] = useState(false);
  const [showLoader, setLoader] = useState(true);
  const [items, setItems] = useState([]);
  const currentPath = router.asPath;
  const splitedPath = currentPath.split("/");
  const extractedIdfromPath = splitedPath[2].split("?")[0];

  const {
    orderId,
    status,
    itemId,
    address,
    cName,
    cNumber,
    fName,
    lName,
    email,
    orderTime,
    deliveryType,
    itemCount,
    deliveryAddress,
    addressId,
  } = router.query;

  function handleStatusButton(status: string, action = "approve") {
    if (status === "PENDING" && action === "approve") {
      approveOrder(`${orderId}`);
    }
    if (status === "PENDING" && action === "reject") {
      rejectOrder(`${orderId}`);
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
    async function getSingleOrder() {
      const itemList = await fetchSingleOrders(extractedIdfromPath);
      const { body: orderList, message } = itemList || { body: [] };
      setItems(orderList);
    }
    getSingleOrder();
  }, [extractedIdfromPath]);
  console.log(items);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoader(false);
    }, 2000);
    const warningTimerId = setTimeout(() => {
      showToast(
        "warn",
        "Please be aware that actions cannot be undone once triggered.",
      );
    }, 7000);

    return () => {
      clearInterval(timerId);
      clearTimeout(warningTimerId);
    };
  }, []);

  return (
    <AppLayout>
      <Modal onclose={close}>
        <div className="mt-[10rem]  max-h-[700px] w-[750px] overflow-y-auto bg-yellow-200/90  pb-4 text-left shadow-sm">
          <div className="mt-2.5 flex flex-col justify-around  space-y-3 rounded-2xl bg-yellow-300/60 py-4 pt-4 text-center font-semibold text-stone-700 md:flex-row md:space-y-0 md:pt-2">
            <h3 className="">Ordr id: {orderId}</h3>
            <h3>
              status: {status}
              <span>
                {status === "PENDING" ? (
                  <div className="flex justify-center gap-2">
                    <Button
                      type="small"
                      loading={reqLoading}
                      onClick={() => handleStatusButton(`${status}`)}
                      bgc="bg-green-100"
                      className="ml-2 hover:bg-green-200"
                    >
                      approve
                    </Button>
                    or
                    <Button
                      type="small"
                      loading={rejLoading}
                      onClick={() => handleStatusButton(`${status}`, "reject")}
                      bgc="bg-red-400"
                      className="ml-2 hover:bg-red-500"
                    >
                      reject
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="small"
                    loading={reqLoading}
                    onClick={() => handleStatusButton(`${status}`, "d")}
                    bgc="bg-green-100"
                    className="ml-2 hover:bg-green-200"
                  >
                    {status === "APPROVED" &&
                      "🙂️click to sent for delivery🚀️"}
                    {status === "SENT_FOR_DELIVERY" &&
                      "🤠️click if delivered📝️"}
                    {status === "DELIVERED" && "🙂️Already Delivered✅️"}
                  </Button>
                )}
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
              <div className="flex flex-col justify-between rounded-xl bg-blue-50 p-4 font-light text-stone-600 md:flex-row">
                <p>This order was made at &nbsp; {formatDate(orderTime)} ,</p>
                <p>Delivery Type: {deliveryType}</p>
              </div>
              <div className="mb-16 flex flex-wrap justify-between gap-4 md:mb-2">
                {/* delivery details */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold uppercase text-stone-700">
                    Delivery Address
                    <div className="h-2 rounded-xl border-2 border-yellow-400 bg-yellow-300"></div>
                  </h3>
                  <ul className="my-2 space-y-1 font-medium text-stone-600">
                    <li>{deliveryAddress}</li>
                    {/* <li>#id {addressId}</li> */}
                    <li>contact name: {cName}</li>
                    <li>{cNumber}</li>
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
                {/* food details */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold uppercase text-stone-700">
                    Food Details
                    <div className="h-2 rounded-xl border-2 border-yellow-400 bg-yellow-300"></div>
                  </h3>

                  {items.map((item: any, idx) => {
                    return (
                      <div
                        className="my-2 flex w-full justify-between gap-4"
                        key={idx}
                      >
                        <ul className="my-2 space-y-1 font-medium text-stone-600">
                          <li>{item.restaurant}</li>
                          <li>#id {item.item_id}</li>
                          <li>{item.category}</li>
                          <li>{item.title}</li>
                          <li>{item.description}</li>
                          <li>{item.price}</li>
                        </ul>
                        <Image
                          src={item.image}
                          alt="item image"
                          width={200}
                          height={100}
                          className="max-h-[200px] max-w-[200px] rounded-2xl"
                        />
                      </div>
                    );
                  })}
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
