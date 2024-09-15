import CityList from '../../components/CityList/CityList.jsx';
import Cta from '../../components/Cta/Cta.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import HotelList from '../../components/HotelList/HotelList.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PropertyList from '../../components/PropertyList/PropertyList.jsx';
import styles from './Home.module.css';

const Home = () => {
  return (
    <main>
      <section id={styles.headerWrapper}>
        <Header />
        <Navbar />
        <Hero />
      </section>
      <section id={styles.homepageWrapper}>
        <CityList />
        <PropertyList />
        <HotelList />
      </section>
      <Cta />
      <Footer />
    </main>
  );
};

export default Home;
