import styles from './SearchList.module.css';
import SearchListItem from './SearchListItem.jsx';

// const searchList = [
//   {
//     name: 'Tower Street Apartments',
//     distance: '500m',
//     tag: 'Free airport taxi',
//     type: 'Entire studio • 1 bathroom • 21m² 1 full bed',
//     description: 'Studio Apartment with Air conditioning',
//     free_cancel: true,
//     price: 112,
//     rate: 8.9,
//     rate_text: 'Excellent',
//     image_url: './images/hotel_search_1.webp',
//   },
//   {
//     name: 'Comfort Suites Airport',
//     distance: '200m',
//     tag: 'Free Breakfast',
//     type: 'Entire studio • 2 bathroom • 100m² 2 full bed',
//     description: 'Studio Apartment',
//     free_cancel: true,
//     price: 140,
//     rate: 9.3,
//     rate_text: 'Exceptional',
//     image_url: './images/hotel_search_2.jpg',
//   },
//   {
//     name: 'Four Seasons Hotel',
//     distance: '100m',
//     tag: 'Free Parking',
//     type: '1 bathroom • 51m² 2 full bed',
//     description: 'Hotel in Lisbon',
//     free_cancel: false,
//     price: 99,
//     rate: 8.8,
//     rate_text: 'Excellent',
//     image_url: './images/hotel_search_3.jpg',
//   },
// ];

function SearchList({ hotels: searchList, isLoading }) {
  return (
    <div id={styles.searchList}>
      {!isLoading && searchList.length > 0 ? (
        searchList.map((item, index) => (
          // Passing content as a prop to SearchListItem
          <SearchListItem key={index} hotel={item} />
        ))
      ) : (
        <p>{searchList.length === 0 ? 'Not Found' : 'Loading...'}</p>
      )}
    </div>
  );
}

export default SearchList;
