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
  const [filterById, setFilterById] = useState([]);
  const [showSearchById, setShowSearchById] = useState(false);

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
  console.log(orders);

  return (
    <AppLayout pageTitle="All Orders">
      <SearchOrder
        hidden={false}
        filteredOrders={filteredOrders}
        setFilterById={setFilterById}
        setShowSearchById={setShowSearchById}
      />
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
            {/* {!showSearchById &&
              filteredOrders.map((order, idx) => (
                <OrderItem {...order} key={idx} />
              ))} */}

            {showSearchById
              ? filterById.map((order, idx) => (
                  <OrderItem {...order} key={idx} />
                ))
              : filteredOrders.map((order, idx) => (
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
function SearchOrder({
  hidden,
  filteredOrders,
  setFilterById,
  setShowSearchById,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  if (searchQuery.length < 5) setShowSearchById(false);

  function handleSearch(e) {
    e.preventDefault();
    // Create a new filtered array instead of modifying the original one
    const newFilteredOrders = filteredOrders.filter(
      (order: any) => order.orderId === searchQuery,
    );
    setShowSearchById(true);

    // Update the state with the new filtered array
    setFilterById(newFilteredOrders);
    console.log(newFilteredOrders);
  }

  return (
    <div className={`${hidden ? "hidden" : "block"}`}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search by order id"
          className="input  mb-6 w-80 transition-all duration-300 focus:w-60"
        />
      </form>
    </div>
  );
}
