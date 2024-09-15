import { faCartShopping, faSackDollar, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFetch } from './../../hooks/useFetch';
import styles from './InfoBoard.module.css';

const InfoBoard = () => {
  const { data, loading } = useFetch('admin/dashboard');

  return (
    <section>
      {!loading && (
        <div className={styles['info-list']}>
          <div className={styles['info-item']}>
            <h2>USERS</h2>
            <p>{data.users}</p>
            <div className={`${styles['info-icon']} ${styles['info-users']}`}>
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
          <div className={styles['info-item']}>
            <h2>ORDERS</h2>
            <p>{data.transactions}</p>
            <div className={`${styles['info-icon']} ${styles['info-orders']}`}>
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
          </div>
          <div className={styles['info-item']}>
            <h2>EARNINGS</h2>
            <p>$ {data.earnings}</p>
            <div className={`${styles['info-icon']} ${styles['info-earnings']}`}>
              <FontAwesomeIcon icon={faSackDollar} />
            </div>
          </div>
          <div className={styles['info-item']}>
            <h2>AVERAGE</h2>
            <p>$ {data.balance}</p>
            <div className={`${styles['info-icon']} ${styles['info-balance']}`}>
              <FontAwesomeIcon icon={faWallet} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InfoBoard;
