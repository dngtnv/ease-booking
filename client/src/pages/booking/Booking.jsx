import { differenceInDays, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/header/Header.jsx';
import styles from './Booking.module.css';

const Booking = () => {
  const navigate = useNavigate();
  let user = {};
  // check if user is logged in and get user data
  if (localStorage.getItem('loggedIn')) {
    user = JSON.parse(localStorage.getItem('loggedIn'));
  }
  // Create state to handle the selected date range
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [userData, setUserData] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    cardNumber: '',
  });
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [payment, setPayment] = useState('');
  const [totalBill, setTotalBill] = useState(0);

  // Handle user data input
  const handleUserData = (name) => {
    return (e) => {
      setUserData({ ...userData, [name]: e.target.value });
    };
  };

  const handleDateChange = (item) => {
    setDate([item.selection]);
    setRooms([]);
    setSelectedRooms([]); // Reset selectedRooms state
    setTotalBill(0); // Reset totalBill state
  };

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedRooms((prevSelectedRooms) => {
      let newSelectedRooms;
      const selectedRoom = rooms.find((room) => room.roomNumbers.includes(+value));
      const existingRoomIndex = prevSelectedRooms.findIndex((room) => room._id === selectedRoom._id);

      if (checked) {
        if (existingRoomIndex !== -1) {
          // If the room object already exists in selectedRooms, update the roomNumbers array
          newSelectedRooms = [...prevSelectedRooms];
          // Check if the room number already exists in the roomNumbers array before adding it
          if (!newSelectedRooms[existingRoomIndex].roomNumbers.includes(+value)) {
            newSelectedRooms[existingRoomIndex].roomNumbers.push(+value);
          }
        } else {
          // If the room object doesn't exist in selectedRooms, add it
          newSelectedRooms = [
            ...prevSelectedRooms,
            { _id: selectedRoom._id, roomNumbers: [+value], price: selectedRoom.price },
          ];
        }
      } else {
        // If the checkbox is deselected, remove the room number from the room object in selectedRooms
        newSelectedRooms = [...prevSelectedRooms];
        newSelectedRooms[existingRoomIndex].roomNumbers = newSelectedRooms[existingRoomIndex].roomNumbers.filter(
          (roomNumber) => roomNumber !== +value
        );
        if (newSelectedRooms[existingRoomIndex].roomNumbers.length === 0) {
          // If the roomNumbers array is empty, remove the room object from selectedRooms
          newSelectedRooms = newSelectedRooms.filter((room, index) => index !== existingRoomIndex);
        }
      }

      return newSelectedRooms;
    });
  };

  const handlePaymentMethod = (event) => {
    setPayment(event.target.value);
  };

  const handleReserve = async () => {
    // Check if all the fields are filled
    if (
      !userData.fullName ||
      !userData.email ||
      !userData.phoneNumber ||
      !userData.cardNumber ||
      !payment ||
      selectedRooms.length === 0
    ) {
      alert('Please fill your infomation and select rooms to reserve!');
      return;
    }
    // handle request to server
    try {
      const response = await fetch('https://ease-booking.onrender.com/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.username,
          hotel: hotelDetail._id,
          room: selectedRooms,
          dateStart: date[0].startDate,
          dateEnd: date[0].endDate,
          price: totalBill,
          payment,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to reserve');
      }
      const data = await response.json();
      console.log(data);
      navigate('/transactions');
    } catch (err) {
      console.error(err);
    }
  };

  // Get the hotel detail from the location state
  const location = useLocation();
  const hotelDetail = location.state ? location.state.hotelDetail : {};

  useEffect(() => {
    const { startDate, endDate } = date[0];
    if (startDate && endDate) {
      const fetchRooms = async () => {
        try {
          const response = await fetch(
            `https://ease-booking.onrender.com/api/hotel/${hotelDetail._id}/rooms?duration=${format(
              date[0].startDate,
              'MM/dd/yyyy'
            )} to ${format(date[0].endDate, 'MM/dd/yyyy')}`
          );
          const data = await response.json();
          setRooms(data);
        } catch (error) {
          console.error('Failed to fetch rooms:', error);
        }
      };

      fetchRooms();
    }
  }, [date]);

  useEffect(() => {
    let bill = 0;
    // Calculate the number of days between the start and end date
    const numberOfDays = differenceInDays(date[0].endDate, date[0].startDate) + 1;
    // Calculate the total bill based on the selected rooms and the number of days
    selectedRooms.forEach((room) => {
      // Multiply the price of the room by the number of selected roomNumbers and the number of days
      bill += room.price * room.roomNumbers.length * numberOfDays;
    });
    setTotalBill(bill);
  }, [selectedRooms, date]);

  return (
    <main>
      <Header />
      <Navbar />
      <section id={styles.bookingWrapper}>
        <div className={styles.detailFooter}>
          <div className={styles.detailFooterDescription}>
            <h2>{hotelDetail.title}</h2>
            <p>{hotelDetail.desc}</p>
          </div>
          <div className={styles.detailAction}>
            <p>Perfect for a 9-nights stay!</p>
            <p>Located in the real heart of Krakow, this property has an excellent location off 9.8</p>
            <p className={styles.nightPrice}>
              <span>${hotelDetail.cheapestPrice}</span> (1 night)
            </p>
            <button className={styles.btn}>Reserve or Book Now!</button>
          </div>
        </div>
        <div className={styles.bookingInputs}>
          <div className={styles.datesInput}>
            <h2>Dates</h2>
            <DateRange
              className={styles.date}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              onChange={(item) => handleDateChange(item)}
              ranges={date}
              minDate={new Date()}
            />
          </div>
          <div className={styles.reserveInfo}>
            <h2>Reserve Info</h2>
            <form className={styles.bookingForm}>
              <div className={styles['form-control']}>
                <label htmlFor='name'>Your Full Name:</label>
                <input
                  value={userData.fullName}
                  onChange={handleUserData('fullName')}
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Full Name'
                  required
                />
              </div>
              <div className={styles['form-control']}>
                <label htmlFor='email'>Your Email:</label>
                <input
                  value={userData.email}
                  onChange={handleUserData('email')}
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                  required
                />
              </div>
              <div className={styles['form-control']}>
                <label htmlFor='phone'>Your Phone Number:</label>
                <input
                  value={userData.phoneNumber}
                  onChange={handleUserData('phoneNumber')}
                  type='tel'
                  id='phone'
                  name='phone'
                  placeholder='Phone Number'
                  required
                />
              </div>
              <div className={styles['form-control']}>
                <label htmlFor='card-number'>Your Identity Card Number:</label>
                <input
                  onChange={handleUserData('cardNumber')}
                  type='text'
                  id='card-number'
                  name='card-number'
                  placeholder='Card Number'
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <div className={styles['select-rooms']}>
          <h2>Select Rooms</h2>
          <div className={styles['room-list']}>
            {rooms.length !== 0 &&
              rooms.map((room, index) => (
                <div key={index} className={styles['room-item']}>
                  <div className={styles['room-info']}>
                    <h3>{room.title}</h3>
                    <p>{room.desc}</p>
                    <small>
                      Max people: <span>{room.maxPeople}</span>
                    </small>
                    <p className={styles.price}>${room.price}</p>
                  </div>
                  <div className={styles['room-numbers']}>
                    <form className={styles['room-checkboxes']}>
                      {room.roomNumbers.map((number, index) => (
                        <div key={index} className={styles['form-control']}>
                          <label htmlFor={`room${number}`}>{number}</label>
                          <input
                            type='checkbox'
                            id={`room${index + 1}`}
                            name={`room${number}`}
                            value={number}
                            onChange={handleCheckboxChange}
                          />
                        </div>
                      ))}
                    </form>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles['booking-bills']}>
          <p>Total Bill: ${totalBill}</p>
          <div className={styles['booking-actions']}>
            <select value={payment} onChange={handlePaymentMethod} name='payment'>
              <option value=''>Select Payment Method</option>
              <option value='Credit Card'>Credit Card</option>
              <option value='Cash'>Cash</option>
            </select>
            {/* check if user is logged in */}
            <button onClick={handleReserve} className={styles.btn}>
              Reserve Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Booking;
