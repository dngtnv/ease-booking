import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import getFormValues from '../../utils/getFormValues.js';
import styles from './AddNewRoom.module.css';

const AddNewRoom = ({ edit }) => {
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  const { data, loading } = useFetch('admin/hotels');

  const onSubmit = async (e) => {
    e.preventDefault();
    const { isEmpty, data } = getFormValues(e.currentTarget);

    if (isEmpty) {
      alert('Please fill in all fields');
      return;
    }

    console.log(data);
    try {
      const response = await fetch(`https://ease-booking.onrender.com/admin/rooms/${edit ? roomId : ''}`, {
        method: edit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
    // clear inputs
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (edit) {
      fetch(`https://ease-booking.onrender.com/admin/rooms/${roomId}`)
        .then((response) => response.json())
        .then((data) => setRoom(data.room));
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['addnew-wrapper']}>
            <h1>{edit ? 'Edit Room' : 'Add New Room'}</h1>
            <div className={styles['form-wrapper']}>
              <form onSubmit={onSubmit}>
                <div className={styles['form-top']}>
                  <div className={styles['form-left']}>
                    <div className={styles['form-control']}>
                      <label htmlFor='title'>Title</label>
                      <input
                        type='text'
                        id='title'
                        name='title'
                        defaultValue={edit ? room.title : ''}
                        placeholder='2 bed room'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='price'>Price</label>
                      <input
                        type='number'
                        id='price'
                        defaultValue={edit ? room.price : ''}
                        name='price'
                        placeholder='100'
                        required
                      />
                    </div>
                  </div>
                  <div className={styles['form-right']}>
                    <div className={styles['form-control']}>
                      <label htmlFor='description'>Description</label>
                      <input
                        type='text'
                        id='description'
                        name='description'
                        defaultValue={edit ? room.desc : ''}
                        placeholder='King size bed, 1 bathroom'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='maxPeople'>Max People</label>
                      <input
                        type='number'
                        id='maxPeople'
                        name='maxPeople'
                        defaultValue={edit ? room.maxPeople : ''}
                        placeholder='2'
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className={styles['form-bottom']}>
                  <div className={styles['form-control']}>
                    <label htmlFor='rooms'>Rooms</label>
                    <textarea
                      name='rooms'
                      id='rooms'
                      rows='2'
                      defaultValue={edit && room && room.roomNumbers ? room.roomNumbers.join(', ') : ''}
                      placeholder='give comma between room numbers'
                    ></textarea>
                  </div>
                  {!edit && (
                    <div className={styles['form-control']}>
                      <label htmlFor='hotel'>Choose a hotel</label>
                      <select name='hotel' id='hotel'>
                        {loading ? (
                          <option>Loading...</option>
                        ) : (
                          data.hotels.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>
                              {hotel.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  )}
                  <button type='submit' className={styles.btn}>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default AddNewRoom;
