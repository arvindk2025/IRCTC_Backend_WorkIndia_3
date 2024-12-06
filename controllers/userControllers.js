
const db = require('../config/dbconfig');
const Train = require('../models/Train');
const Booking = require('../models/Booking');


//Feature: Getting  available trains and seats  using src and dest


exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;
  
    
    if (!source || !destination) {
      return res.status(400).json({ message: 'Source and destination are required' });
    }
  
    try {
      
      const trains = await Train.getTrainsByRoute(source, destination);
  
    
      if (trains.length === 0) {
        return res.status(404).json({ message: 'No trains available for the specified route' });
      }
  
      // Map the available trains with train number and available seats
      const availableTrains = trains.map(train => ({
        trainNumber: train.train_number,
        availableSeats: train.available_seats
      }));
  
      
      const trainsWithSeats = availableTrains.filter(train => train.availableSeats > 0);
  
      // count the number of available trains and seat details
      res.status(200).json({
        available: trainsWithSeats.length > 0,
        availableTrainCount: trainsWithSeats.length, 
        trains: availableTrains
      });
    } catch (err) {
      console.error('Error fetching seat availability:', err);
      res.status(500).json({ message: 'Error fetching seat availability', error: err.message });
    }
  };
  

//Feature : Booking the seat with implementataion of LOCKS 
exports.bookSeat = async (req, res) => {
    const { trainId, seatsToBook } = req.body;
    const userId = req.user.id;
  
    const connection = await db.getConnection();
    try {
      console.log("Booking started");
  
      
      await connection.beginTransaction();
      console.log("Transaction started");
  
      
      const [train] = await connection.query('SELECT total_seats, available_seats FROM trains WHERE id = ? FOR UPDATE', [trainId]);
      console.log("Train fetched:", train);
  
    
      if (!train.length) {
        console.log("Train not found");
        await connection.rollback();
        return res.status(404).json({ message: 'Train not found' });
      }
  
      const availableSeats = train[0].available_seats;
      console.log("Available seats:", availableSeats);
  
      if (availableSeats < seatsToBook) {
        console.log("Not enough seats available");
        await connection.rollback();
        return res.status(400).json({ message: 'Not enough seats available' });
      }
  
      // Update available seats
      await connection.query('UPDATE trains SET available_seats = available_seats - ? WHERE id = ?', [seatsToBook, trainId]);
      console.log("Seats updated");
  
      
      await Booking.create(userId, trainId, seatsToBook, connection);
      console.log("Booking Done"); 
  
      // Commit the transaction
      await connection.commit();
      res.json({ message: 'Seats booked successfully' });
    } catch (err) {
      console.error("Error during booking:", err.message); // Log error message
      await connection.rollback();
      res.status(500).json({ message: 'Error booking seats', error: err.message });
    } finally {
      
      connection.release();
    }
  };


  
//Feature: For Getting all the boooking details of user 
exports.getBookingDetails = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const query = `
        SELECT 
          b.id AS booking_id,
          b.seats AS number_of_seats,
          t.train_number,
          t.source,
          t.destination
        FROM bookings b
        JOIN trains t ON b.train_id = t.id
        WHERE b.user_id = ?
      `;
  
      const [rows] = await db.query(query, [userId]);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching booking details:', err.message);
      res.status(500).json({ message: 'Error fetching booking details' });
    }
  };
  