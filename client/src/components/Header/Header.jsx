import { Link, useNavigate } from 'react-router-dom';
import styles from '../Header/Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  let user;

  if (localStorage.getItem('loggedIn')) {
    user = JSON.parse(localStorage.getItem('loggedIn')).username;
  }

  function handleLogout() {
    localStorage.removeItem('loggedIn');
    navigate('/');
  }

  function renderBtn() {
    if (user) {
      return (
        <div className={styles.comboBtn}>
          <span>{user}</span>
          <Link to={'/transactions'} className={styles.btn}>
            Transactions
          </Link>
          <button to={'/logout'} className={styles.btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.comboBtn}>
          <Link to={'/signup'} className={styles.btn}>
            Register
          </Link>
          <Link to={'/login'} className={styles.btn}>
            Login
          </Link>
        </div>
      );
    }
  }

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.navbarTop}>
          <span className={styles.logo}>
            <a href='/'>Booking Website</a>
          </span>
          {renderBtn()}
        </div>
      </div>
    </header>
  );
};

export default Header;
