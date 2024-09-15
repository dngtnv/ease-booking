import Header from '../../components/Header/Header.jsx';
import InfoBoard from '../../components/InfoBoard/InfoBoard.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Table from '../../components/Table/Table.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { data, loading } = useFetch('admin/latest-transactions');

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 130 },
    { field: 'hotel', headerName: 'Hotel', width: 200 },
    { field: 'room', headerName: 'Room', width: 130 },
    { field: 'date', headerName: 'Date', width: 180 },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'payment', headerName: 'Payment Payment', width: 150 },
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
          <section id={styles['dashboard-wrapper']}>
            <InfoBoard />
            {!loading && <Table title='Latest Transactions' rows={data.latestTransactions} columns={columns} />}
          </section>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
