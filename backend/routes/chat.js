const express = require('express');
const router = express.Router();
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// 1. Get all conversations for a specific user
router.get('/conversations', async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  const db = getDb();
  try {
    // Find conversations where the user is a participant.
    const conversations = await db
      .collection('conversations')
      .find({ participants: userId })
      .sort({ updatedAt: -1 })
      .toArray();
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 2. Create a new conversation
router.post('/conversations', async (req, res) => {
  const { participants } = req.body;
  if (!participants || participants.length < 2) {
    return res.status(400).json({ message: 'At least two participants are required' });
  }

  const db = getDb();
  try {
    // Optionally, check if a conversation between these participants exists
    const newConversation = {
      participants,
      lastMessage: {
        text: '',
        senderId: null,
        timestamp: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('conversations').insertOne(newConversation);
    newConversation._id = result.insertedId;
    res.json(newConversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 3. Get messages for a specific conversation
router.get('/conversations/:id/messages', async (req, res) => {
  const conversationId = req.params.id;
  const db = getDb();
  try {
    const messages = await db
      .collection('messages')
      .find({ conversationId: conversationId })
      .sort({ timestamp: 1 })
      .toArray();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 4. Send a message in a conversation
router.post('/conversations/:id/messages', async (req, res) => {
  const conversationId = req.params.id;
  const { senderId, text } = req.body;
  if (!senderId || !text) {
    return res.status(400).json({ message: 'senderId and text are required' });
  }

  const db = getDb();
  try {
    const newMessage = {
      conversationId,
      senderId,
      text,
      timestamp: new Date(),
    };

    const result = await db.collection('messages').insertOne(newMessage);
    newMessage._id = result.insertedId;

    // Update the conversation's lastMessage and updatedAt timestamp
    await db.collection('conversations').updateOne(
      { _id: ObjectId(conversationId) },
      {
        $set: {
          lastMessage: {
            text,
            senderId,
            timestamp: new Date(),
          },
          updatedAt: new Date(),
        },
      }
    );

    res.json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// const { io } = require('../server'); // Import the Socket.IO instance
// io.to(conversationId).emit('new_message', newMessage);


module.exports = router;
