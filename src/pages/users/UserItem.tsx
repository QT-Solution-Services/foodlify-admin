import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

function UserItem({
  email,
  user_id,
  first_name,
  last_name,
  profile_completed,
}: any) {
  return (
    <li className="my-4  flex items-center gap-4 rounded-2xl bg-yellow-100 py-1 hover:scale-105 hover:bg-yellow-200 hover:shadow-md hover:transition-all hover:duration-300">
      <div className="rounded-xl border-l-2 border-stone-500 p-2">
        <Image src="/avatar.svg" alt="avatar" height={80} width={80} />
      </div>
      <div className="mt-2 flex flex-grow justify-between">
        <div>
          <h1 className="font-medium">
            {first_name} {last_name}
          </h1>
          <h1 className="text-stone-600">userId #{user_id}</h1>
        </div>
        <div className="mr-8 flex flex-col items-end text-right ">
          <p className="font-semibold text-stone-600">{email}</p>
          <p className=" text-stone-600">Profile Completed </p>
          <Button
            type="small"
            bgc="bg-red-300"
            className="mt-2 max-w-fit justify-end hover:bg-red-400"
          >
            {profile_completed ? "True" : "false"}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default UserItem;
