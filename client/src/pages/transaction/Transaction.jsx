import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useFetch } from '../../hooks/useFetch';
import styles from './Transaction.module.css';

const Transaction = () => {
  const navigate = useNavigate();
  let user;
  if (localStorage.getItem('loggedIn')) {
    user = JSON.parse(localStorage.getItem('loggedIn'));
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const { data, loading } = useFetch(user ? `api/transactions?user=${user.username}` : null);

  return (
    <main>
      <Header />
      <Navbar />
      <section id={styles.transactionWrapper}>
        <h1>Your Transactions</h1>
        {/* create a table to display all transactions */}
        <table className={styles['transaction-table']}>
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {data &&
              data.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{index + 1}</td>
                  <td>{transaction.hotel.name}</td>
                  <td>{transaction.room.map((room) => room.roomNumbers.join(', ')).join(', ')}</td>
                  <td>{`${new Date(transaction.dateStart).toLocaleDateString()} - ${new Date(
                    transaction.dateEnd
                  ).toLocaleDateString()}`}</td>
                  <td>${transaction.price}</td>
                  <td>{transaction.payment}</td>
                  <td>
                    <span
                      className={
                        transaction.status === 'Booked'
                          ? styles.booked
                          : transaction.status === 'Checkin'
                          ? styles.checkin
                          : styles.checkout
                      }
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Transaction;
