import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/Auth.jsx';
import Booking from './pages/booking/Booking.jsx';
import Detail from './pages/detail/Detail';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Transaction from './pages/transaction/Transaction.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/detail/:hotelId' element={<Detail />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='transactions' element={<Transaction />} />
        <Route path='/login' element={<Auth type='login' />} />
        <Route path='/signup' element={<Auth type='signup' />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
