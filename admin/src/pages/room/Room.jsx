import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Table from '../../components/Table/Table.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Room.module.css';

const Room = () => {
  const { data, loading } = useFetch('admin/rooms');

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // Use selectedId for the delete operation
    try {
      const response = await fetch(`https://ease-booking.onrender.com/admin/rooms/${selectedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        throw new Error(`${response.status}: ${data.message}`);
      }

      // Filter out the deleted hotel from the hotels state
      setRooms(rooms.filter((room) => room._id !== selectedId));

      console.log('Hotel deleted successfully');
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 180 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'desc', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'maxPeople', headerName: 'Max People', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <span
              className={styles['edit-btn']}
              onClick={(event) => {
                event.stopPropagation(); // Prevent the event from propagating up
                console.log('Edit hotel:', params.row._id);
                navigate(`/rooms/edit/${params.row._id}`);
              }}
            >
              Edit
            </span>
            <span
              className={styles['delete-btn']}
              onClick={(event) => {
                event.stopPropagation(); // Prevent the event from propagating up
                handleClickOpen(params.row._id);
              }}
            >
              Delete
            </span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (data && data.rooms) {
      setRooms(data.rooms);
    }
  }, [data]);

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['room-wrapper']}>
            {!loading && (
              <Table
                title='Rooms list'
                rows={rooms}
                columns={columns}
                button={{ title: 'Add New', to: '/rooms/add-new' }}
              />
            )}
          </section>
        </section>
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Room;
