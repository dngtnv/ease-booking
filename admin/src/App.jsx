import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import AddNewHotel from './pages/hotel/AddNewHotel.jsx';
import Hotel from './pages/hotel/Hotel.jsx';
import Login from './pages/login/Login.jsx';
import AddNewRoom from './pages/room/AddNewRoom.jsx';
import Room from './pages/room/Room.jsx';
import Transaction from './pages/transaction/Transaction.jsx';

// HOC for protected routes
function ProtectedRoute({ path, element: Component, ...rest }) {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('loggedIn');

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
}

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute />}>
        <Route index element={<Dashboard />} />
        <Route path='hotels' element={<Hotel />} />
        <Route path='hotels/add-new' element={<AddNewHotel />} />
        <Route path='hotels/edit/:hotelId' element={<AddNewHotel edit={true} />} />
        <Route path='rooms' element={<Room />} />
        <Route path='rooms/add-new' element={<AddNewRoom />} />
        <Route path='rooms/edit/:roomId' element={<AddNewRoom edit={true} />} />
        <Route path='transactions' element={<Transaction />} />
      </Route>
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
