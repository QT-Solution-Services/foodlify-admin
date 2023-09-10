import { Spinner } from "@/components/Button";
import AppLayout from "@/components/layouts/AppLayout";
import { useDashboard } from "@/contexts/DashboardContext";
import Image from "next/image";
import React from "react";

function Dashboard() {
  return (
    <AppLayout pageTitle="Dashboard">
      <ul className="grid grid-cols-3 gap-6">
        <DashbaorbItem />
      </ul>
    </AppLayout>
  );
}

export default Dashboard;

function DashbaorbItem() {
  const dashboardData = useDashboard();
  const { reqLoading } = useDashboard();
  const dataArray = [
    { key: "usersCount", value: dashboardData.usersCount },
    { key: "resturantsCount", value: dashboardData.resturantsCount },
    { key: "ordersCount", value: dashboardData.ordersCount },
    { key: "todayOrdersCount", value: dashboardData.todayOrdersCount },
    { key: "deliveredCount", value: dashboardData.deliveredOrdersCount },
    { key: "pendingCount", value: dashboardData.pendingOrdersCount },
    { key: "approvedCount", value: dashboardData.approvedOrdersCount },
  ];

  const dataTitle = [
    "Total users",
    "Total Resuturants",
    "Total orders",
    "Today's Orders Count",
    "Delivered Orders",
    "Pending Orders",
    "Aprroved Orders",
  ];

  return dataArray.map((item, idx) => {
    return (
      <li key={idx}>
        <div className="min-h-full justify-between rounded-2xl bg-white px-6 py-4 shadow-md">
          <div className="flex gap-6">
            <div className="rounded-2xl bg-yellow-100 p-2">
              <Image src="./graph.svg" width={50} height={50} alt="svg" />
            </div>

            <div className="flex flex-col items-center">
              <h2 className=" font-medium  uppercase text-stone-700">
                {dataTitle[idx]}
              </h2>
              <h3 className="mt-auto text-2xl font-semibold">
                {reqLoading ? (
                  <Spinner borderColor="border-yellow-600" />
                ) : (
                  item.value
                )}
              </h3>
            </div>
          </div>
        </div>
      </li>
    );
  });
}
