import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperation() {
  const filterOptions = [
    { name: "All", value: "" },
    { name: "No Discount", value: "nodiscount" },
    { name: "With Discount", value: "withdiscount" },
  ];
  const sortOptions = [
    { name: "regular sort", value: "" },
    { name: "Sort by Name(A-Z)", value: "name-asc" },
    { name: "Sort by Name(Z-A)", value: "name-desc" },
    { name: "Regular Price(Asc)", value: "regprice-asc" },
    { name: "Regular Price(Desc)", value: "regprice-desc" },
    { name: "Max Capacity(ASC)", value: "capacity-asc" },
    { name: "Max Capacity(DESC)", value: "capacity-desc" },
  ];
  return (
    <TableOperations>
      <SortBy options={sortOptions} />
      <Filter name="discount" options={filterOptions} />
    </TableOperations>
  );
}

export default CabinTableOperation;
