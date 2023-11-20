import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const renderCabinRow = (item) => <CabinRow cabin={item} />;
const filterFunctions = {
  all: (cabins) => cabins,
  nodiscount: (cabins) => cabins.filter(({ discount }) => !discount),
  withdiscount: (cabins) => cabins.filter(({ discount }) => discount),
};
const sortFunctions = {
  default: (cabins) => cabins,
  "name-asc": (cabins) =>
    cabins.toSorted(({ name: nameA }, { name: nameB }) =>
      nameA.localeCompare(nameB)
    ),
  "name-desc": (cabins) =>
    cabins.toSorted(({ name: nameA }, { name: nameB }) =>
      nameB.localeCompare(nameA)
    ),
  "regprice-asc": (cabins) =>
    cabins.toSorted(
      ({ regularPrice: priceA }, { regularPrice: priceB }) => priceA - priceB
    ),
  "regprice-desc": (cabins) =>
    cabins.toSorted(
      ({ regularPrice: priceA }, { regularPrice: priceB }) => priceB - priceA
    ),
  "capacity-asc": (cabins) =>
    cabins.toSorted(
      ({ maxCapacity: capA }, { maxCapacity: capB }) => capA - capB
    ),
  "capacity-desc": (cabins) =>
    cabins.toSorted(
      ({ maxCapacity: capA }, { maxCapacity: capB }) => capB - capA
    ),
};

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortby") || "default";
  const filteredCabins = filterFunctions[discountFilter](cabins);
  const sortedCabins = sortFunctions[sortBy](filteredCabins);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>{error?.message}</p>
      ) : (
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header role="row">
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Menus>
            <Table.Body items={sortedCabins} render={renderCabinRow} />
          </Menus>
        </Table>
      )}
    </>
  );
}

export default CabinTable;
