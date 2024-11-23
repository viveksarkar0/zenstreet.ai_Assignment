"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema
const bookingSchema = new mongoose_1.default.Schema({
    userId: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});
//  pre-save hook
bookingSchema.pre('save', function (next) {
    if (this.startTime >= this.endTime) {
        return next(new Error('End time must be after start time.'));
    }
    next();
});
exports.Booking = mongoose_1.default.model('Booking', bookingSchema);
