import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
function CountryList({ isLoading, cities }) {
  const countrySet = new Set();
  const countries = cities.reduce((countries, city) => {
    if (countrySet.has(city.country)) return countries;
    else {
      countrySet.add(city.country);
      return [...countries, { country: city.country, emoji: city.emoji }];
    }
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </div>
  );
}

export default CountryList;
