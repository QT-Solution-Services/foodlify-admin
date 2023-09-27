export function formatResturantData(data: any) {
  const {
    name,
    address,
    logo,
    website,
    status,
    restaurant_id: id,
    open_time,
    close_time,
    restaurant_person,
  } = data;
  const { first_name, phone_number: number } = restaurant_person?.[0] ?? {
    first_name: "",
    phone_number: "",
  };

  const resturantdata = {
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
  };
  return resturantdata;
}

export function formatOrdersData(order: any) {
  const {
    delivery_address,
    status,
    user,
    restaurant,
    item_count: itemCount,
    order_at: orderTime,
    order_id: orderId,
    delivery_type: deliveryType,
  } = order;

  const {
    name: restaurantName,
    address: restaurantAddress,
    logo,
    restaurant_id: restaurantId,
  } = restaurant;

  // const {
  //   item_id: itemId,
  //   restaurant,
  //   title,
  //   price,
  //   image,
  //   description,
  //   category,
  // } = items[0];

  const {
    address: deliveryAddress,
    address_id: addressId,
    contact_name: cName,
    phone_number: cNumber,
  } = delivery_address;

  const { first_name: fName, last_name: lName, email } = user;

  const formatedOrder = {
    restaurantName,
    restaurantAddress,
    logo,
    restaurantId,
    deliveryAddress,
    cName,
    cNumber,
    status,
    fName,
    lName,
    email,
    itemCount,
    orderId,
    addressId,
    orderTime,
    deliveryType,
  };
  return formatedOrder;
}

export function formatDate(inputDate: any) {
  const dateObj = new Date(inputDate);
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedTime = dateObj.toLocaleTimeString("en-US", timeOptions);

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", dateOptions);

  const formattedDateTime = `${formattedTime} | ${formattedDate}`;
  return formattedDateTime;
}

export function checkIfOrderDateIsSameAsCurrentDate(orderDateStr: string) {
  const dateParts = orderDateStr.split(" | ");
  if (dateParts.length === 2) {
    const [time, date] = dateParts;
    const [month, day, year] = date.split(" ");
    const orderDate = new Date(`${month} ${day}, ${year} ${time}`);
    const currentDate = new Date();

    // Check if the order date is on the same day as the current date
    return (
      orderDate.getDate() === currentDate.getDate() &&
      orderDate.getMonth() === currentDate.getMonth() &&
      orderDate.getFullYear() === currentDate.getFullYear()
    );
  }
  return false; // Invalid date format
}
