# Hotel Booking System

This project is a full-stack hotel booking system with separate admin and client interfaces. The admin interface allows hotel administrators to manage hotels, rooms, and transactions, while the client interface allows users to search for hotels, view details, and make bookings.

## Technologies Used

### Frontend (Admin & Client)

- React
- React Router
- Vite
- CSS Modules
- MUI (Material-UI)
- FontAwesome

### Backend

- Node.js
- Express
- Mongoose (MongoDB)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/dngtnv/ease-booking.git
cd ease-booking
```

2. Install dependencies for the admin, client, and server:

```sh
cd admin
npm install
cd ../client
npm install
cd ../server
npm install
```

## Running the Project

1. Start the server:

```sh
cd server
npm start
```

2. Start the admin interface:

```sh
cd admin
npm run dev
```

3. Start the client interface:

```sh
cd client
npm run dev
```

## Environment Variables

Create a `.env` file in the server directory and add the following environment variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Features

### Admin Interface

- **Login:** Admins can log in to access the dashboard.
- **Dashboard:** Overview of the system.
- **Manage Hotels:** Add, edit, and delete hotels.
- **Manage Rooms:** Add, edit, and delete rooms.
- **Manage Transactions:** View and manage transactions.

### Client Interface

- **Home:** View a list of cities, properties, and hotels.
- **Search:** Search for hotels based on criteria.
- **Detail:** View detailed information about a hotel.
- **Booking:** Book a room in a hotel.
- **Transactions:** View booking transactions.
- **Authentication:** Login and signup for users.

## API Endpoints

### Admin Routes

- `POST /admin/login`: Admin login.
- `GET /admin/dashboard`: Get dashboard data.
- `GET /admin/latest-transactions`: Get 8 latest transactions
- `GET /admin/hotels`: Get all hotels
- `POST /admin/hotels`: Add a new hotel.
- `PUT /admin/hotels/:hotelId`: Edit a hotel.
- `DELETE /admin/hotels/:hotelId`: Delete a hotel.
- `GET /admin/rooms`: Get all rooms
- `POST /admin/rooms`: Add a new room.
- `PUT /admin/rooms/:roomId`: Edit a room.
- `DELETE /admin/rooms/:roomId`: Delete a room.

### Client Routes

- `GET /api/hotels/city`: Get hotels depend on city.
- `GET /api/hotels/type`: Get number of hotels depend on type
- `GET /api/hotels/top`: Get top 3 hotels with the highest rating
- `GET /api/hotels/:id`: Get hotel details.
- `GET /api/hotel/hotelId/rooms`: Get available rooms in a hotel

### Transaction Routes

- `POST /api/transaction` : Create a new transaction
- `GET /api/transactions`: Get all transactions

### DEMO

- **Demo Link:** [Client](https://ease-booking-client.netlify.app)
- **Demo Link:** [Admin](https://ease-booking-admin.netlify.app)
- **Demo Link:** [Server](https://ease-booking.onrender.com)
