"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Correct import
const bookingControllers_1 = require("../controllers/bookingControllers"); // Ensure correct import
const router = (0, express_1.Router)();
// Define the routes and link to controller functions
router.post('/add', bookingControllers_1.addBooking); // POST route to create a booking
router.get('/', bookingControllers_1.getBookings); // GET route to get bookings
exports.default = router;
