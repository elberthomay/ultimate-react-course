import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const navigate = new useNavigate();
  function handleChangePos() {
    setSearchParam({ lat: 10, lng: 30 });
  }
  function openForm() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={openForm}>
      {lat}
      {lng}
      {/* <button onClick={handleChangePos}>change position</button> */}
    </div>
  );
}

export default Map;
