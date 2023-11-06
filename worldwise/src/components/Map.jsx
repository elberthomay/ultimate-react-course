import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlLocation from "../hooks/useUrlLocation";

function Map() {
  const [lat, lng, setSearchParams] = useUrlLocation();
  const navigate = new useNavigate();
  const {
    cities: { isLoading, cities },
  } = useCities();

  const [position, setPosition] = useState([lat ?? 50, lng ?? 0]);

  const {
    isLoading: geoIsLoading,
    position: geoPosition,
    getPosition: getGeoPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition !== null) setPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  function handleMapClick({ lat, lng }) {
    navigate(`form?lat=${lat}&lng=${lng}`);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {!geoPosition && (
            <Button type="position" onClick={() => getGeoPosition()}>
              {geoIsLoading ? "Loading..." : "Use current position"}
            </Button>
          )}
          <div className={styles.mapContainer}>
            <MapContainer
              center={position}
              zoom={8}
              scrollWheelZoom={true}
              className={styles.map}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cities.map(
                ({ id, emoji, position: { lat, lng }, cityName, notes }) => (
                  <Marker key={id} position={[lat, lng]}>
                    <Popup>
                      <span>{emoji}</span>
                      <span>{cityName}</span>
                      <br />
                      {notes}
                    </Popup>
                  </Marker>
                )
              )}
              <ChangeCenter position={position} />
              <DetectClick onClick={handleMapClick} />
            </MapContainer>
          </div>
        </>
      )}
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({ onClick }) {
  useMapEvent({ click: (e) => onClick(e.latlng) });
}

export default Map;
