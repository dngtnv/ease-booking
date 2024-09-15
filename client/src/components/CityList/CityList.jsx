import { useFetch } from '../../hooks/useFetch.js';
import styles from './CityList.module.css';

function CityList() {
  const { data: cityList, loading } = useFetch('api/hotels/city/');

  return (
    <div id={styles.cityList}>
      {/* Map over cityList to render each city item */}
      {!loading &&
        cityList.map((city) => (
          <div key={city.name} className={styles.cityCard}>
            <div className={styles.cityImg}>
              <img src={city.image} alt={city.name + ' ' + city.numberOfHotels + 'properties'} />
            </div>
            <div className={styles.cityText}>
              <h3>{city.name}</h3>
              <p>{city.numberOfHotels} properties</p>
            </div>
          </div>
        ))}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default CityList;
