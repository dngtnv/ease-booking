import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Table from '../../components/Table/Table.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Hotel.module.css';

const Hotel = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch('admin/hotels');

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [hotels, setHotels] = useState([]);

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
      const response = await fetch(`http://localhost:5000/admin/hotels/${selectedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        throw new Error(`${response.status}: ${data.message}`);
      }

      // Filter out the deleted hotel from the hotels state
      setHotels(hotels.filter((hotel) => hotel._id !== selectedId));

      console.log('Hotel deleted successfully');
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 180 },
    { field: 'name', headerName: 'Name', width: 260 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'title', headerName: 'Title', width: 260 },
    { field: 'city', headerName: 'City', width: 150 },
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
                navigate(`/hotels/edit/${params.row._id}`);
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
    if (data && data.hotels) {
      setHotels(data.hotels);
    }
  }, [data]);

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['hotel-wrapper']}>
            {!loading && (
              <Table
                title='Hotels list'
                rows={hotels}
                columns={columns}
                button={{ title: 'Add New', to: '/hotels/add-new' }}
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
            Are you sure you want to delete this hotel?
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

export default Hotel;
