import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import SearchList from '../../components/Search/SearchList.jsx';
import SearchPopup from '../../components/Search/SearchPopup.jsx';
import styles from './Search.module.css';

const Search = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  // Lifting up the states
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ease-booking.onrender.com/api/hotels/search?city=${destination}&duration=${`${format(
          date[0].startDate,
          'MM/dd/yyyy'
        )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}&adult=${options.adult}&children=${options.children}&room=${
          options.room
        }`
      );
      const data = await response.json();
      setSearchData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(); // Fetch data when the search button is clicked
  };

  useEffect(() => {
    fetchData(); // Fetch data when the page is loaded
  }, []);

  return (
    <>
      <main>
        <Header />
        <Navbar />
        <div id={styles.searchWrapper}>
          <SearchPopup
            destination={destination}
            onSetDestination={setDestination}
            openDate={openDate}
            onOpenDate={setOpenDate}
            date={date}
            onSetDate={setDate}
            options={options}
            onSetOptions={setOptions}
            onSearch={handleSearch}
          />
          <SearchList hotels={searchData} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Search;
