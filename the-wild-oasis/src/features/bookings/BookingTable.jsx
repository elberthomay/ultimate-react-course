import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import usePaginationParams from "../../hooks/usePaginationParams";

/// client
// const filterFunctions = {
//   all: (bookings) => bookings,
//   unconfirmed: (bookings) =>
//     bookings.filter(({ status }) => status === "unconfirmed"),

//   "checked-out": (bookings) =>
//     bookings.filter(({ status }) => status === "checked-out"),

//   "checked-in": (bookings) =>
//     bookings.filter(({ status }) => status === "checked-in"),
// };

const sortFunctions = {
  created: (bookings) =>
    bookings.toSorted(
      ({ created_at: createdA }, { created_at: createdB }) =>
        new Date(createdA) - new Date(createdB)
    ),
  "startdate-asc": (bookings) =>
    bookings.toSorted(
      ({ startDate: startA }, { startDate: startB }) =>
        new Date(startA) - new Date(startB)
    ),
  "startdate-desc": (bookings) =>
    bookings.toSorted(
      ({ startDate: startA }, { startDate: startB }) =>
        new Date(startB) - new Date(startA)
    ),
  "totalprice-asc": (bookings) =>
    bookings.toSorted(
      (
        { cabinPrice: cabA, extraPrice: extraA },
        { cabinPrice: cabB, extraPrice: extraB }
      ) => cabA + extraA - cabB + extraB
    ),
  "totalprice-desc": (bookings) =>
    bookings.toSorted(
      (
        { cabinPrice: cabA, extraPrice: extraA },
        { cabinPrice: cabB, extraPrice: extraB }
      ) => cabB + extraB - cabA + extraA
    ),
};

function BookingTable() {
  const {
    isLoading,
    error,
    bookings: { data: bookings, count },
  } = useBookings();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Error fetching bookings</p>
      ) : (
        <Menus>
          <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
            <Table.Header>
              <div>Cabin</div>
              <div>Guest</div>
              <div>Dates</div>
              <div>Status</div>
              <div>Amount</div>
              <div></div>
            </Table.Header>
            <Menus>
              <Table.Body
                items={bookings}
                render={(booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                )}
              />
            </Menus>
            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          </Table>
        </Menus>
      )}
    </>
  );
}

export default BookingTable;
