import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({
  filter,
  sortBy,
  resultPerPage,
  currentPage,
}) {
  const startItem = (currentPage - 1) * resultPerPage;
  const endItem = currentPage * resultPerPage - 1;

  let query = supabase
    .from("bookings")
    .select("* , cabins(name), users(fullName, email)", { count: "exact" });

  if (filter) {
    const { field, value, method } = filter;
    query = query[method ?? "eq"](field, value);
  }

  if (sortBy) {
    const { field, ascending } = sortBy;
    query = query.order(field, { ascending });
  }

  query = query.limit(resultPerPage ?? 10);

  query = query.range(startItem, endItem);

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), users(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  console.log(date);
  console.log(getToday({ end: true }));
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, cabinPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  console.log(date);
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, users(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, users(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
