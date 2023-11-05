import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList({ isLoading, cities }) {
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {cities.length === 0 ? (
            <Message message="add your first city by clicking on the map" />
          ) : (
            <ul className={styles.cityList}>
              {cities.map((city) => (
                <CityItem city={city} key={city.id} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default CityList;
