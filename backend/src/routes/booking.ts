import { Router } from 'express';
import { addBooking, getBookings } from '../controllers/bookingControllers'; // Ensure correct import

const router = Router();


router.post('/add', addBooking);
router.get('/', getBookings);

export default router;
