import express, { Application } from 'express';
import mongoose from 'mongoose';
import bookingRoutes from './routes/booking';
import cors from 'cors';

const app: Application = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Use the booking routes
app.use('/api/bookings', bookingRoutes);

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/vivek')
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

// Set up a basic route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Booking System');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
