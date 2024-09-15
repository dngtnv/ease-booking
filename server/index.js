const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 5000;

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const hotelRoutes = require('./routes/hotel');
const transactionRoutes = require('./routes/transaction');

const mongoose = require('mongoose');

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use('/api', hotelRoutes);
app.use('/api', transactionRoutes);

mongoose
  .connect(
    'mongodb+srv://kakalupin:mnlXBK7cZr9c0K0l@cluster0.m8gjdlk.mongodb.net/booking?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => {
    app.listen(PORT);
    console.log('Server started');
  })
  .catch((err) => {
    console.error(err);
  });
