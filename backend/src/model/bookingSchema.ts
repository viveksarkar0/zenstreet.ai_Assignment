import mongoose, { Schema, Document } from 'mongoose';

    // Define an interface for the Booking document
export interface IBooking extends Document {
  userId: number; 
  startTime: Date;
  endTime: Date;
}

   // Define the schema
const bookingSchema: Schema<IBooking> = new mongoose.Schema({
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


export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
