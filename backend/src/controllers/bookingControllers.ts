import { Request, Response } from 'express';
import { Booking } from '../model/bookingSchema';

interface IBooking {
  userId: number;
  startTime: Date;
  endTime: Date;
}

// Add booking handler
const addBooking = async (req: Request, res: Response): Promise<any> => {
  const { userId, startTime, endTime }: IBooking = req.body;

  try {
    // Check for overlapping bookings
    const overlappingSlots = await Booking.find({
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
        await Booking.deleteMany({ _id: { $in: overlappingSlots.map((slot: { _id: any; }) => slot._id) } });
      }

    const newBooking = new Booking({ userId, startTime, endTime });
    await newBooking.save();

    return res.status(201).json({ message: 'Booking created successfully', newBooking });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


const getBookings = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, startTime, endTime } = req.query;
    const filter: any = {};

    if (userId) {
      filter.userId = userId;
    }

    if (startTime || endTime) {
      if (startTime) filter.startTime = { $gte: new Date(startTime as string) };
      if (endTime) filter.endTime = { $lte: new Date(endTime as string) };
    }

    const bookings = await Booking.find(filter);

    if (bookings.length > 0) {
      return res.status(200).json(bookings);
    } else {
      return res.status(404).json({ message: 'No bookings found' });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { addBooking, getBookings };
