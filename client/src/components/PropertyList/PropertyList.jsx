import { useFetch } from '../../hooks/useFetch.js';
import styles from './PropertyList.module.css';

function PropertyList() {
  const { data: propertyType, loading } = useFetch('api/hotels/type/');
  return (
    <div id={styles.propertyType}>
      <h2>Browser by property type</h2>
      <div className={styles.propertyList}>
        {!loading &&
          propertyType.map((type) => (
            <div key={type.name} className={styles.propertyCard}>
              <div className={styles.propertyImg}>
                <img src={type.image} alt={type.name} />
              </div>
              <div className={styles.propertyText}>
                <h3>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}s</h3>
                <p>{type.count} hotels</p>
              </div>
            </div>
          ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default PropertyList;
