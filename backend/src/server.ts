import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Get all messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('new_message', async (data) => {
    try {
      const { author, content } = data;
      const result = await pool.query(
        'INSERT INTO messages (author, content) VALUES ($1, $2) RETURNING *',
        [author || 'Anonymous', content]
      );
      const newMessage = result.rows[0];
      // Broadcast the new message to all connected clients
      io.emit('message_added', newMessage);
    } catch (err) {
      console.error('Error adding message:', err);
    }
  });

  socket.on('like_message', async (messageId) => {
    try {
      const result = await pool.query(
        'UPDATE messages SET likes = likes + 1 WHERE id = $1 RETURNING *',
        [messageId]
      );
      if (result.rows.length > 0) {
        const updatedMessage = result.rows[0];
        // Broadcast the updated like count
        io.emit('message_liked', updatedMessage);
      }
    } catch (err) {
      console.error('Error liking message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
