import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './HotelList.module.css';

function HotelList() {
  const { data: hotelList, loading } = useFetch('api/hotels/top');

  return (
    <div id={styles.hotelWrapper}>
      <h2>Homes guests love</h2>
      <div className={styles.hotelList}>
        {!loading &&
          hotelList.hotels.map((hotel) => (
            <div key={hotel._id} className={styles.hotelCard}>
              <div className={styles.hotelImg}>
                <img src={hotel.photos[0]} alt={hotel.name} />
              </div>
              <div className={styles.hotelText}>
                <Link to={`/detail/${hotel._id}`}>{hotel.name}</Link>
                <div className={styles.hotelDetail}>
                  <p>{hotel.city}</p>
                  <p className={styles.hotelPrice}>{`Starting from $${hotel.cheapestPrice}`}</p>
                  <div className={styles.hotelBottomCard}>
                    <span className={styles.hotelRate}>{hotel.rating}.0</span>
                    <span className={styles.hotelType}>{hotel.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default HotelList;
