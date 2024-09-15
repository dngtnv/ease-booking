import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cta from '../../components/Cta/Cta.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Detail.module.css';

const Detail = () => {
  const { hotelId } = useParams();
  const { data: hotelDetail, loading } = useFetch(`api/hotel/${hotelId}`);

  // Scroll to top when the page is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main>
        <Header />
        <Navbar />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div id={styles.detailWrapper}>
            <div className={styles.detailHeader}>
              <div className={styles.detailInfo}>
                <div className={styles.detailHeaderLeft}>
                  <h2>{hotelDetail.name}</h2>
                  <div className={styles.addressGroup}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>{hotelDetail.address}</span>
                  </div>
                </div>
                <div className={styles.detailHeaderRight}>
                  <Link to={'/booking'} state={{ hotelDetail: hotelDetail }} className={styles.btn}>
                    Reserve or Book Now!
                  </Link>
                </div>
              </div>
              <p className={styles.distance}>Excellent location - {hotelDetail.distance}m from center</p>
              <p className={styles.price}>{hotelDetail.rooms[0].desc}</p>
            </div>
            <div className={styles.detailPhotos}>
              {hotelDetail.photos.map((photo, index) => (
                <img key={index} src={photo} alt='Hotel Photo' />
              ))}
            </div>
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
                <Link to={'/booking'} state={{ hotelDetail: hotelDetail }} className={styles.btn}>
                  Reserve or Book Now!
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Cta />
      <Footer />
    </>
  );
};

export default Detail;
