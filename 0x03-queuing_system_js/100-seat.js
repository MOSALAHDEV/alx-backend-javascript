// 100-seat.js

import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';
import kue from 'kue';

// Redis Setup
const client = createClient();
client.on('connect', () => console.log('Redis client connected to the server'));
client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

// Initialize seat count and reservation flag
let reservationEnabled = true;

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return parseInt(seats, 10);
}

// Set initial seat count
reserveSeat(50);

// Kue Queue
const queue = kue.createQueue();

// Express App
const app = express();
const port = 1245;

// Routes

// GET /available_seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats.toString() });
});

// GET /reserve_seat
app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    return res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// GET /process
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    let seats = await getCurrentAvailableSeats();

    if (seats <= 0) {
      reservationEnabled = false;
      return done(new Error('Not enough seats available'));
    }

    seats -= 1;
    await reserveSeat(seats);

    if (seats === 0) {
      reservationEnabled = false;
    }

    return done();
  });
});

// Start server
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});

