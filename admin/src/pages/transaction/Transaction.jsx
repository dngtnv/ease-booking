import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Table from '../../components/Table/Table.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Transaction.module.css';

const Transaction = () => {
  const { data, loading } = useFetch('admin/transactions');

  const columns = [
    { field: '_id', headerName: 'ID', width: 180 },
    { field: 'user', headerName: 'User', width: 130 },
    { field: 'hotel', headerName: 'Hotel', width: 150 },
    { field: 'room', headerName: 'Room', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'payment', headerName: 'Payment Method', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => {
        return (
          <span
            className={
              params.value === 'Booked' ? styles.booked : params.value === 'Checkin' ? styles.checkin : styles.checkout
            }
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['transaction-wrapper']}>
            {!loading && <Table title='Hotels list' rows={data.transactions} columns={columns} />}
          </section>
        </section>
      </main>
    </>
  );
};

export default Transaction;
