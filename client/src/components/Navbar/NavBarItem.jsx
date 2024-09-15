import styles from './NavBarItem.module.css';

function NavBarItem({ type, icon, active }) {
  return (
    <li className={`${active ? styles.active : ''} ${styles.navLink}`}>
      <i className={`fa ${icon}`}></i>
      {type}
    </li>
  );
}

export default NavBarItem;
