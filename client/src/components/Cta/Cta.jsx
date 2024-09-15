import styles from './Cta.module.css';

function Cta() {
  return (
    <div id={styles.ctaWrapper}>
      <div className={styles.ctaMain}>
        <p className={styles.ctaTitle}>Save time, save money!</p>
        <p>Sign up and we&apos;ll send the best deals to you</p>
        <div className={styles.ctaForm}>
          <input type='text' placeholder='Your Email' />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Cta;
