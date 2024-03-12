
export async function getVendor(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/find/${id}`);
    const data = await res.json();
    return data;
}

export const getAllVendorIds = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/vendors/list/ids`);
    const data = await res.json();
    return data.map((vendor) => {
      return {
        params: {
          id: vendor.id.toString(),
        },
      };
    });
}
  
export const getAllBookingIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/bookings/list/ids`);
  const data = await res.json();
  return data.map((booking) => {
    return {
      params: {
        id: booking._id.toString(),
      },
    };
  });
}

export async function getBooking(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/bookings/find/${id}`);
  const data = await res.json();
  return data;
}

