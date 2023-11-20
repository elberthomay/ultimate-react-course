import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleChange(sortby) {
    if (sortby === "") searchParams.delete("sortby");
    else searchParams.set("sortby", sortby);
    searchParams.delete("page");
    setSearchParams(searchParams);
  }
  const sortby = searchParams.get("sortby") ?? "";
  return <Select options={options} value={sortby} onChange={handleChange} />;
}

export default SortBy;
