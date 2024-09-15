import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import styles from './SearchPopup.module.css';

function SearchPopup({
  destination,
  onSetDestination,
  openDate,
  onOpenDate,
  date,
  onSetDate,
  options,
  onSetOptions,
  onSearch,
}) {
  const adultRef = useRef();
  const childrenRef = useRef();
  const roomRef = useRef();
  const [searchTrigger, setSearchTrigger] = useState(false);

  // Trigger search when the search button is clicked
  useEffect(() => {
    if (searchTrigger) {
      onSearch();
      setSearchTrigger(false); // Reset trigger
    }
  }, [searchTrigger, onSearch]);

  function handleOptionsChange() {
    onSetOptions({
      adult: adultRef.current.value,
      children: childrenRef.current.value,
      room: roomRef.current.value,
    });
    setSearchTrigger(true); // Trigger search
  }

  return (
    <div id={styles.popupWrapper}>
      <p className={styles.popupHeading}>Search</p>
      <div className={styles.searchInputs}>
        <p className={styles.inputLabel}>Destination</p>
        <input
          className={styles.input}
          onChange={(e) => onSetDestination(e.target.value)}
          type='text'
          placeholder={destination}
        />
        <p className={styles.inputLabel}>Check-In-Date</p>
        <span className={styles.span} onClick={() => onOpenDate(!openDate)}>{`${format(
          date[0].startDate,
          'MM/dd/yyyy'
        )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
        {openDate && <DateRange onChange={(item) => onSetDate([item.selection])} minDate={new Date()} ranges={date} />}
      </div>
      <div>
        <p className={styles.inputLabel}>Options</p>
        <div className={styles.optionInput}>
          <span>Min price per night</span>
          <input className={styles.input} type='number' />
        </div>
        <div className={styles.optionInput}>
          <span>Max price per night</span>
          <input className={styles.input} type='number' />
        </div>
        <div className={styles.optionInput}>
          <span>Adult</span>
          <input ref={adultRef} className={styles.input} type='number' min={1} placeholder={options.adult} />
        </div>
        <div className={styles.optionInput}>
          <span>Children</span>
          <input ref={childrenRef} className={styles.input} type='number' min={0} placeholder={options.children} />
        </div>
        <div className={styles.optionInput}>
          <span>Room</span>
          <input ref={roomRef} className={styles.input} type='number' min={1} placeholder={options.room} />
        </div>
        <button className={styles.searchBtn} onClick={handleOptionsChange}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchPopup;
