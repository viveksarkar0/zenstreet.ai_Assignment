"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const booking_1 = __importDefault(require("./routes/booking"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Use the booking routes
app.use('/api/bookings', booking_1.default);
// MongoDB connection
mongoose_1.default
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
