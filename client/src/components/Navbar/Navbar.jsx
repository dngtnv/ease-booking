import NavBarItem from './NavBarItem.jsx';
import styles from './Navbar.module.css';

const navbarItems = [
  {
    type: 'Stays',
    icon: 'fa-bed',
    active: true,
  },
  {
    type: 'Flights',
    icon: 'fa-plane',
    active: false,
  },
  {
    type: 'Car rentals',
    icon: 'fa-car',
    active: false,
  },
  {
    type: 'Attractions',
    icon: 'fa-bed',
    active: false,
  },
  {
    type: 'Airport taxis',
    icon: 'fa-taxi',
    active: false,
  },
];

function Navbar() {
  return (
    <nav id={styles.navbar}>
      <div className={styles.navbarWrapper}>
        <ul id={styles.navList}>
          {/* Map over navbarItems to render each item */}
          {navbarItems.map((item, index) => (
            // Passing a spread object item as props to NavBarItem
            <NavBarItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
