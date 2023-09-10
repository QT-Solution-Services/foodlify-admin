import AppLayout from "@/components/layouts/AppLayout";
import React, { useEffect, useState } from "react";
import { formatOrdersData } from "@/utils/Helper";
import OrderItem from "./OrderItem";
import useOrders from "@/hooks/useOrders";

function Index() {
  const { reqLoading: loading, fetchOrders } = useOrders();
  const [orders, setOrders] = useState([]);

  useEffect(function () {
    async function getOrders() {
      const orders = await fetchOrders();
      const { body: orderList, message } = orders || { body: [] };
      setOrders(orderList);
    }
    getOrders();
  }, []);

  const formatedOrders =
    orders.length > 0 ? orders.map((order) => formatOrdersData(order)) : [];
  return (
    <AppLayout pageTitle="All Orders">
      <ul className="mb-20 grid grid-cols-3  gap-4">
        {loading ? (
          <>
            {[...Array(8)].map((_, idx) => {
              return (
                <div
                  key={idx}
                  className="h-36 animate-pulse rounded-md bg-yellow-400/20 p-12"
                ></div>
              );
            })}
          </>
        ) : (
          <>
            {formatedOrders.map((order, idx) => (
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
