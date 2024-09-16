import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import styles from '../auth/Auth.module.css';

const Auth = ({ type }) => {
  const [error, setError] = useState('');
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://ease-booking.onrender.com/auth/${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Log:', data);
        if (type === 'login') {
          localStorage.setItem('loggedIn', JSON.stringify(data.user));
          navigate('/');
        } else {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setError('Username or password is incorrect!');
      });
  };

  return (
    <main>
      <Header />
      <section className={styles['auth-wrapper']}>
        <div className={styles['auth-body']}>
          <h1>{type === 'login' ? 'Login' : 'Sign up'}</h1>
          <form onSubmit={handleSubmit} className={styles['auth-form']}>
            <input
              className={error ? styles.errorInput : ''}
              type='text'
              ref={usernameRef}
              placeholder='Username'
              required
            />
            <input
              className={error ? styles.errorInput : ''}
              type='password'
              ref={passwordRef}
              placeholder='Password'
              required
            />
            <button type='submit'>{type === 'login' ? 'Login' : 'Create Account'}</button>
          </form>
          <p className={styles.error}>{error}</p>
        </div>
      </section>
    </main>
  );
};

export default Auth;
