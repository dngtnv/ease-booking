import { format } from 'date-fns';
import { useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

function Hero() {
  // Create state to handle the show/hide of date picker
  const [openDate, setOpenDate] = useState(false);
  // Create state to handle the selected date range
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  // Create state to handle the show/hide of options
  const [openOptions, setOpenOptions] = useState(false);
  // Create state to handle the options
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const destinationRef = useRef();
  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // Redirects to /search on Search button click
  const handleSearch = () => {
    const destination = destinationRef.current.value;
    // save to context
    navigate('/search', { state: { destination, date, options } });
  };
  return (
    <section>
      <div className={styles.headerWrapper}>
        <div className={styles.intro}>
          <h1>A life of discounts? It&apos;s Genius.</h1>
          <p>Get rewarded for your travels - unlock instant savings of 10% or more with a free account</p>
          <button>Sign in / Register</button>
        </div>
        <div className={styles.searchInput}>
          <div className={styles.searchInputs}>
            <div className={styles.inputGroup}>
              <i className='fa fa-bed'></i>
              <select ref={destinationRef} className={styles.select} required>
                <option value=''>Where are you going?</option>
                <option value='Ha Noi'>Ha Noi</option>
                <option value='Ho Chi Minh'>Ho Chi Minh</option>
                <option value='Da Nang'>Da Nang</option>
              </select>
            </div>
            <div className={`${styles.dateRange} ${styles.inputGroup}`}>
              <i className='fa fa-calendar'></i>
              <span onClick={() => setOpenDate(!openDate)} className={styles.heroSearchText}>{`${format(
                date[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
            </div>
            <div className={styles.inputGroup}>
              <i className='fa fa-female'></i>
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className={styles.heroSearchText}
              >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
              {openOptions && (
                <div className={styles.options}>
                  <div className={styles.optionItem}>
                    <span className={styles.optionText}>Adult</span>
                    <div className={styles.optionCounter}>
                      <button
                        disabled={options.adult <= 1}
                        className={styles.optionCounterButton}
                        onClick={() => handleOption('adult', 'd')}
                      >
                        -
                      </button>
                      <span className={styles.optionCounterNumber}>{options.adult}</span>
                      <button className={styles.optionCounterButton} onClick={() => handleOption('adult', 'i')}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.optionItem}>
                    <span className={styles.optionText}>Children</span>
                    <div className={styles.optionCounter}>
                      <button
                        disabled={options.children <= 0}
                        className={styles.optionCounterButton}
                        onClick={() => handleOption('children', 'd')}
                      >
                        -
                      </button>
                      <span className={styles.optionCounterNumber}>{options.children}</span>
                      <button className={styles.optionCounterButton} onClick={() => handleOption('children', 'i')}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.optionItem}>
                    <span className={styles.optionText}>Room</span>
                    <div className={styles.optionCounter}>
                      <button
                        disabled={options.room <= 1}
                        className={styles.optionCounterButton}
                        onClick={() => handleOption('room', 'd')}
                      >
                        -
                      </button>
                      <span className={styles.optionCounterNumber}>{options.room}</span>
                      <button className={styles.optionCounterButton} onClick={() => handleOption('room', 'i')}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {/* DateRange component from 'react-date-range' library. It is used for selecting a range of dates */}
      {openDate && (
        <DateRange
          className={styles.date}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={(item) => setDate([item.selection])}
          ranges={date}
          minDate={new Date()}
        />
      )}
    </section>
  );
}

export default Hero;
