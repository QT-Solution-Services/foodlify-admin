import AppLayout from "@/components/layouts/AppLayout";
import React, { useEffect, useState } from "react";
import UserItem from "./UserItem";
import userData from "@/constant/Data/userData";
import useAuthentication from "@/hooks/useAuthentication";

function Index() {
  interface UsersProps {
    body: any[];
    message: string;
  }
  const [userData, setUserData] = useState<UsersProps>();
  const { fetchUsers, reqLoading: loading } = useAuthentication();
  useEffect(function () {
    async function getAllUser() {
      const userList = await fetchUsers();
      // console.log(userList);
      setUserData(userList);
    }
    getAllUser();
  }, []);
  const { body: usersList } = userData || { body: [] };

  return (
    <AppLayout pageTitle="All registered users">
      {loading ? (
        <>
          {[...Array(8)].map((_, idx) => {
            return (
              <div
                key={idx}
                className="mb-3 h-24 w-full animate-pulse rounded-md bg-yellow-400/20 p-8"
              ></div>
            );
          })}
        </>
      ) : (
        <ul className=" divide-y divide-stone-300 pb-20">
          {usersList.map((user: any) => (
            <UserItem {...user} key={user.user_id} />
          ))}
        </ul>
      )}
    </AppLayout>
  );
}

export default Index;
