import BookingTable from "../features/bookings/BookingTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SortBy from "../ui/SortBy";

const filterOptions = [
  { name: "all", value: "" },
  { name: "unconfirmed", value: "unconfirmed" },
  { name: "Checked out", value: "checked-out" },
  { name: "Checked in", value: "checked-in" },
];
const sortOptions = [
  { name: "Created", value: "" },
  { name: "Start Date(asc)", value: "startdate-asc" },
  { name: "Start Date(desc)", value: "startdate-desc" },
  { name: "Total Price(asc)", value: "totalprice-asc" },
  { name: "Total Price(desc)", value: "totalprice-desc" },
];
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <Filter name="status" options={filterOptions} />
        <SortBy options={sortOptions} />
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
