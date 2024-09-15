import { faCreditCard, faGauge, faHotel, faRightFromBracket, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const sidebarItems = [
  {
    title: 'MAIN',
    items: [{ name: 'Dashboard', to: '/', icon: faGauge }],
  },
  {
    title: 'LISTS',
    items: [
      { name: 'Users', to: '/users', icon: faUser },
      { name: 'Hotels', to: '/hotels', icon: faHotel },
      { name: 'Rooms', to: '/rooms', icon: faCreditCard },
      { name: 'Transactions', to: '/transactions', icon: faTruck },
    ],
  },
  {
    title: 'NEW',
    items: [
      { name: 'New Hotel', to: '/hotels/add-new', icon: faHotel },
      { name: 'New Room', to: '/rooms/add-new', icon: faCreditCard },
    ],
  },
  {
    title: 'USER',
    items: [{ name: 'Logout', to: '/logout', icon: faRightFromBracket }],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  }

  return (
    <aside id={styles['sidebar-wrapper']}>
      <nav className={styles.nav}>
        {sidebarItems.map((item, index) => (
          <div key={index} className={styles['sidebar-items']}>
            <h3 className={styles['main-title']}>{item.title}</h3>
            <ul>
              {item.items.map((subitem, subindex) => (
                <li key={subindex} className={styles['nav-item']}>
                  {subitem.name === 'Logout' ? (
                    <button onClick={handleLogout} className={styles['logout-btn']}>
                      <FontAwesomeIcon icon={subitem.icon} /> {subitem.name}
                    </button>
                  ) : (
                    <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={subitem.to} end>
                      <FontAwesomeIcon icon={subitem.icon} /> {subitem.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
