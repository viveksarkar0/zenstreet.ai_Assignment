"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = exports.addBooking = void 0;
const bookingSchema_1 = require("../model/bookingSchema");
// Add booking handler
const addBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, startTime, endTime } = req.body;
    try {
        // Check for overlapping bookings
        const overlappingSlots = yield bookingSchema_1.Booking.find({
            userId,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } },
                { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
            ],
        });
        // if (overlappingSlots.length > 0) {
        //   return res.status(409).json({ message: 'Booking overlaps with an existing event.' });
        // }
        // If there are overlapping bookings, delete them
        if (overlappingSlots.length > 0) {
            yield bookingSchema_1.Booking.deleteMany({ _id: { $in: overlappingSlots.map((slot) => slot._id) } });
        }
        const newBooking = new bookingSchema_1.Booking({ userId, startTime, endTime });
        yield newBooking.save();
        return res.status(201).json({ message: 'Booking created successfully', newBooking });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.addBooking = addBooking;
// Get bookings handler
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, startTime, endTime } = req.query;
        const filter = {};
        if (userId) {
            filter.userId = userId;
        }
        if (startTime || endTime) {
            if (startTime)
                filter.startTime = { $gte: new Date(startTime) };
            if (endTime)
                filter.endTime = { $lte: new Date(endTime) };
        }
        const bookings = yield bookingSchema_1.Booking.find(filter);
        if (bookings.length > 0) {
            return res.status(200).json(bookings);
        }
        else {
            return res.status(404).json({ message: 'No bookings found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getBookings = getBookings;
