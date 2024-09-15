import styles from './Footer.module.css';

const footerList = [
  {
    col_number: 1,
    col_values: ['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels'],
  },
  {
    col_number: 2,
    col_values: ['Homes', 'Apartments', 'Resorts', 'Villas', 'Hostels', 'Guest houses'],
  },
  {
    col_number: 3,
    col_values: [
      'Unique places to stay',
      'Reviews',
      'Unpacked: Travel articles',
      'Travel communities',
      'Seasonal and holiday deals',
    ],
  },
  {
    col_number: 4,
    col_values: ['Car rental', 'Flight Finder', 'Restaurant reservations', 'Travel Agents'],
  },
  {
    col_number: 5,
    col_values: [
      'Curtomer Service',
      'Partner Help',
      'Careers',
      'Sustainability',
      'Press center',
      'Safety Resource Center',
      'Investor relations',
      'Terms & conditions',
    ],
  },
];

function Footer() {
  return (
    <footer>
      <div className={styles.footerWrapper}>
        {/* Map over the footerList to render each column */}
        {footerList.map((item) => (
          <div key={item.col_number} className={styles.footerBlock}>
            {item.col_values.map((link, index) => (
              <a key={index} href='#'>
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
