import AppLayout from "@/components/layouts/AppLayout";
import React, { use, useEffect, useState } from "react";
import { formatOrdersData } from "@/utils/Helper";
import OrderItem from "./OrderItem";
import useOrders from "@/hooks/useOrders";
// import dummyData from "@/constant/Data/ordersData";

function Index() {
  const { reqLoading: loading, fetchOrders } = useOrders();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [count, setcount] = useState(0);

  useEffect(function () {
    async function getOrders() {
      const orders = await fetchOrders();
      const { body: orderList, message } = orders || { body: [] };
      setOrders(orderList);
    }
    getOrders();
  }, []);

  const filterOptions: any = {
    all: "",
    pending: "PENDING",
    approved: "APPROVED",
    rejected: "REJECTED",
    sentForDelivery: "SENT_FOR_DELIVERY",
    delivered: "DELIVERED",
  };

  // const fakedata = dummyData.map((order) => formatOrdersData(order));

  const formatedOrders =
    orders.length > 0 ? orders.map((order) => formatOrdersData(order)) : [];

  const filteredOrders = formatedOrders.filter((order: any) =>
    filter === "all" ? true : order.status === filterOptions[filter],
  );

  const orderCount = filteredOrders.length;
  return (
    <AppLayout pageTitle="All Orders">
      <div className="flex justify-between">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/3 bg-yellow-400 p-0.5 md:p-4"
        >
          {Object.keys(filterOptions).map((option) => (
            <option value={option} key={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <div className="w-1/3 rounded-md bg-yellow-400 p-0.5 text-center text-black md:p-4  ">
          {filter.toUpperCase()} {" -> "} {orderCount}
        </div>
      </div>

      <ul className="my-4 mb-20 grid grid-cols-1 gap-4  md:grid-cols-3">
        {loading ? (
          <>
            {[...Array(8)].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="h-1 animate-pulse rounded-md bg-yellow-400/20 p-12 md:h-36"
                ></div>
              );
            })}
          </>
        ) : (
          <>
            {filteredOrders.map((order, idx) => (
              <OrderItem {...order} key={idx} />
            ))}
          </>
        )}
      </ul>
      {!loading && formatedOrders.length === 0 && <p>No Orders found</p>}
    </AppLayout>
  );
}

export default Index;
