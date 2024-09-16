const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 5000;

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const hotelRoutes = require('./routes/hotel');
const transactionRoutes = require('./routes/transaction');

const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.m8gjdlk.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use('/api', hotelRoutes);
app.use('/api', transactionRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
    console.log('Server started');
  })
  .catch((err) => {
    console.error(err);
  });
