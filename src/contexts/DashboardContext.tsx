import useAuthentication from "@/hooks/useAuthentication";
import useOrders from "@/hooks/useOrders";
import {
  checkIfOrderDateIsSameAsCurrentDate,
  formatDate,
} from "@/utils/Helper";
import { log } from "console";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DashbaordContextProps {
  orders: any[];
  usersCount: number;
  ordersCount: number;
  todayOrdersCount: number;
  deliveredOrdersCount: number;
  pendingOrdersCount: number;
  approvedOrdersCount: number;

  reqLoading: boolean;
  resturantsCount: number;
}

const DashboardContext = createContext<DashbaordContextProps>({
  orders: [],
  usersCount: 0,
  ordersCount: 0,
  todayOrdersCount: 0,
  deliveredOrdersCount: 0,
  pendingOrdersCount: 0,
  approvedOrdersCount: 0,
  reqLoading: false,
  resturantsCount: 0,
});

export const DashbaordProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { fetchUsers, fetchResutrants, reqLoading } = useAuthentication();
  const { fetchOrders } = useOrders();

  const [users, setUsers] = useState([]);
  const [resturants, setResturants] = useState([]);
  const [orders, setOrders] = useState<any>([]);

  const deliveredOrdersCount = orders.filter(
    (orders: any) => orders.status === "DELIVERED",
  ).length;
  const pendingOrdersCount = orders.filter(
    (orders: any) => orders.status === "PENDING",
  ).length;
  const approvedOrdersCount = orders.filter(
    (orders: any) => orders.status === "APPROVED",
  ).length;
  // const todayOrdersCount = orders.map((orders: any) =>
  //   formatDate(orders.order_at),
  // );
  const todayOrdersCount = orders.filter((order: any) => {
    const orderDateStr = order.order_at; // Assuming it's a string in the format "02:49 PM | September 1, 2023"
    checkIfOrderDateIsSameAsCurrentDate(orderDateStr);
  }).length;

  useEffect(() => {
    async function getAllUsers() {
      const res = await fetchUsers();
      const { body: users, message } = (await res) || { body: [] };
      setUsers(users);
    }

    async function getAllResturants() {
      const res = await fetchResutrants();
      const { body: resturants, message } = (await res) || { body: [] };
      setResturants(resturants);
    }

    async function getAllOrders() {
      const res = await fetchOrders();
      const { body: orders, message } = (await res) || { body: [] };
      setOrders(orders);
    }
    getAllUsers();
    getAllResturants();
    getAllOrders();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        orders,
        ordersCount: orders.length,
        todayOrdersCount,
        deliveredOrdersCount,
        pendingOrdersCount,
        approvedOrdersCount,
        usersCount: users.length,
        resturantsCount: resturants.length,
        reqLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboard() {
  const content = useContext(DashboardContext);
  return content;
}
