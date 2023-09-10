import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext } from "@/contexts/ToastContext";
import { useContext, useState } from "react";
import useSecureRequest from "./useRequest";
import {
  ordersRoute,
  approveOrderRoute,
  sentForDeliveryRoute,
  orderDeliveredRoute,
} from "@/constant/apiRoutes";
import { Router, useRouter } from "next/router";

export default function useOrders() {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { get, put, patch } = useSecureRequest();
  const [reqLoading, setReqLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setReqLoading(true);
      const res = await get({ url: ordersRoute });
      if (res.success) {
        return res.data;
      }
    } catch (error) {
      showToast("error", "Error while fetching order");
      throw error;
    } finally {
      setReqLoading(false);
    }
  };

  const approveOrder = async (orderId: string) => {
    try {
      setReqLoading(true);
      const res = await put({ data: orderId, url: approveOrderRoute(orderId) });
      if (res.success) {
        showToast("success", res.message);
        router.push("/orders");
      }
    } catch (error) {
      throw error;
    } finally {
      setReqLoading(false);
    }
  };

  const orderSentForDelivery = async (orderId: string) => {
    try {
      setReqLoading(true);
      const res = await put({
        data: orderId,
        url: sentForDeliveryRoute(orderId),
      });
      if (res.success) {
        showToast("success", res.message);
        router.push("/orders");
      }
    } catch (error) {
      throw error;
    } finally {
      setReqLoading(false);
    }
  };

  const orderDelivered = async (orderId: string) => {
    try {
      setReqLoading(true);
      const res = await put({
        data: orderId,
        url: orderDeliveredRoute(orderId),
      });
      if (res.success) {
        showToast("success", res.message);
        router.push("/orders");
      }
    } catch (error) {
      throw error;
    } finally {
      setReqLoading(false);
    }
  };

  return {
    fetchOrders,
    reqLoading,
    approveOrder,
    orderSentForDelivery,
    orderDelivered,
  };
}
