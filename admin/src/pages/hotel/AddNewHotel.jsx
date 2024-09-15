import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import getFormValues from '../../utils/getFormValues.js';
import styles from './AddNewHotel.module.css';

const AddNewHotel = ({ edit }) => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    const { isEmpty, data } = getFormValues(e.currentTarget);

    if (isEmpty) {
      alert('Please fill in all fields');
      return;
    }

    console.log(data);
    try {
      const response = await fetch(`http://localhost:5000/admin/hotels/${edit ? hotelId : ''}`, {
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
    // this is not working for now
    e.currentTarget.reset();
  };

  useEffect(() => {
    if (edit) {
      fetch(`http://localhost:5000/api/hotel/${hotelId}`)
        .then((response) => response.json())
        .then((data) => setHotel(data));
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['addnew-wrapper']}>
            <h1>{edit ? 'Edit Product' : 'Add New Product'}</h1>
            <div className={styles['form-wrapper']}>
              <form onSubmit={onSubmit}>
                <div className={styles['form-top']}>
                  <div className={styles['form-left']}>
                    <div className={styles['form-control']}>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        defaultValue={edit ? hotel.name : ''}
                        placeholder='My Hotel'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='city'>City</label>
                      <input
                        type='text'
                        id='city'
                        name='city'
                        defaultValue={edit ? hotel.city : ''}
                        placeholder='New York'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='distance'>Distance from City Center</label>
                      <input
                        type='number'
                        id='distance'
                        name='distance'
                        defaultValue={edit ? hotel.distance : ''}
                        placeholder='500'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='description'>Description</label>
                      <input
                        type='text'
                        id='description'
                        name='description'
                        defaultValue={edit ? hotel.desc : ''}
                        placeholder='description'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='images'>Images</label>
                      <textarea
                        name='images'
                        id='images'
                        rows='1'
                        defaultValue={edit && hotel && hotel.photos ? hotel.photos.join('\n') : ''}
                      ></textarea>
                    </div>
                  </div>
                  <div className={styles['form-right']}>
                    <div className={styles['form-control']}>
                      <label htmlFor='type'>Type</label>
                      <select name='type' id='type' defaultValue={edit ? hotel.type : 'hotel'}>
                        <option value='hotel'>Hotel</option>
                        <option value='apartment'>Apartments</option>
                        <option value='resort'>Resorts</option>
                        <option value='villa'>Villas</option>
                        <option value='cabin'>Cabins</option>
                      </select>
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='address'>Address</label>
                      <input
                        type='text'
                        id='address'
                        name='address'
                        defaultValue={edit ? hotel.address : ''}
                        placeholder='elton st 216'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='title'>Title</label>
                      <input
                        type='text'
                        id='title'
                        name='title'
                        defaultValue={edit ? hotel.title : ''}
                        placeholder='The best Hotel'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='price'>Price</label>
                      <input
                        type='number'
                        id='price'
                        defaultValue={edit ? hotel.cheapestPrice : ''}
                        name='price'
                        placeholder='100'
                        required
                      />
                    </div>
                    <div className={styles['form-control']}>
                      <label htmlFor='featured'>Featured</label>
                      <select
                        name='featured'
                        id='featured'
                        defaultValue={edit && hotel && hotel.featured ? hotel.featured.toString() : 'false'}
                      >
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={styles['form-bottom']}>
                  <div className={styles['form-control']}>
                    <label htmlFor='rooms'>Rooms</label>
                    <textarea
                      name='rooms'
                      id='rooms'
                      rows='5'
                      defaultValue={
                        edit && hotel && hotel.rooms ? hotel.rooms.map((room) => room.title).join('\n') : ''
                      }
                    ></textarea>
                  </div>
                </div>
                <button type='submit' className={styles.btn}>
                  Send
                </button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default AddNewHotel;
