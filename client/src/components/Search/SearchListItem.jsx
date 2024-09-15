import { Link } from 'react-router-dom';
import styles from './SearchListItem.module.css';

function SearchListItem({ hotel }) {
  return (
    <div className={styles.cardItem}>
      <div className={styles.cardContent}>
        <img className={styles.cardImg} src={hotel.photos[0]} alt={hotel.name} />
        <div className={styles.cardDetail}>
          <Link to={`/detail/${hotel._id}`}>
            <h3>{hotel.name}</h3>
          </Link>
          <p>{hotel.distance}m from center</p>
          <span className={styles.tag}>{hotel.rooms[0].title}</span>
          <p className={styles.description}>{hotel.rooms[0].desc}</p>
          <p className={styles.type}>{hotel.type}</p>
          {hotel.free_cancel && (
            <div className={styles.cancel}>
              <p>Free cancellation</p>
              <p>You can cancel later, so lock in this great price today!</p>
            </div>
          )}
        </div>
        <div className={styles.cardRight}>
          <div className={styles.cardRightTop}>
            <span className={styles.rateText}>Excellent</span>
            <span className={styles.rateNumber}>{hotel.rating}.0</span>
          </div>
          <div className={styles.cardRightBottom}>
            <span>${hotel.cheapestPrice}</span>
            <p>Includes taxes and fees</p>
            <Link to={`/detail/${hotel._id}`} className={styles.btn}>
              See availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchListItem;
