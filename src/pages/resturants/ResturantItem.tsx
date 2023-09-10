import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

function ResturantItem({
  name,
  address,
  logo,
  website,
  status,
  id,
  open_time,
  close_time,
  first_name,
  number,
}: any) {
  return (
    <li className=" flex gap-4 py-4">
      <div className="max-w-fit  rounded-xl border-2 border-stone-300 p-2">
        <Image src={logo} alt="logo" height={80} width={80} />
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex flex-col">
          <h2 className="text-md font-semibold uppercase">
            {name} <span>#{id}</span>
          </h2>
          <p className="text-md italic text-stone-500">{address}</p>
          <Button
            type="small"
            bgc="bg-green-300"
            className="mt-auto max-w-fit hover:bg-green-400"
          >
            {status}
          </Button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-md font-semibold">Resturant Person</h1>
          <p>{first_name}</p>
          <p className="font-medium text-stone-600">{number}</p>
          <p className="mt-auto text-sm font-bold text-stone-400">
            {open_time} - {close_time}
          </p>
        </div>
      </div>
    </li>
  );
}

export default ResturantItem;
