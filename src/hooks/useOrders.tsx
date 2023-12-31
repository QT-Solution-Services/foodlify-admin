import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext } from "@/contexts/ToastContext";
import { useContext, useState } from "react";
import useSecureRequest from "./useRequest";
import {
  ordersRoute,
  approveOrderRoute,
  rejetOrderRoute,
  sentForDeliveryRoute,
  orderDeliveredRoute,
  singleOrderRoute,
} from "@/constant/apiRoutes";
import { Router, useRouter } from "next/router";

export default function useOrders() {
  const router = useRouter();
  const { showToast } = useContext(ToastContext);
  const { get, put, patch } = useSecureRequest();
  const [reqLoading, setReqLoading] = useState(false);
  const [rejLoading, setRejLoading] = useState(false);

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

  const fetchSingleOrders = async (orderId: string) => {
    try {
      setReqLoading(true);
      const res = await get({ url: singleOrderRoute(orderId) });
      if (res.success) {
        return res.data;
      }
    } catch (error) {
      showToast("error", "Error while fetching single order");
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

  const rejectOrder = async (orderId: string) => {
    try {
      setRejLoading(true);
      const res = await put({ data: orderId, url: rejetOrderRoute(orderId) });
      if (res.success) {
        showToast("success", res.message);
        router.push("/orders");
      }
    } catch (error) {
      throw error;
    } finally {
      setRejLoading(false);
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
    fetchSingleOrders,
    reqLoading,
    rejLoading,
    rejectOrder,
    approveOrder,
    orderSentForDelivery,
    orderDelivered,
  };
}
