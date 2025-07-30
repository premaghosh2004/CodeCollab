const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

const generateAIResponse = (prompt) => {
  const cleanPrompt = prompt.replace('/ai ', '');
  return `Of course! Here is a JavaScript function for: "${cleanPrompt}"

\`\`\`javascript
/**
 * This is an AI-generated code snippet.
 */
function generatedSolution() {
  console.log("This is the AI code for: ${cleanPrompt}");
  return true;
}

generatedSolution();
\`\`\`
  `;
};

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId, type } = req.body;
  if (!content || !chatId) {
    return res.status(400).send('Invalid data');
  }

  if (content.startsWith('/ai ')) {
    try {
      const aiUser = await User.findOneAndUpdate(
        { email: 'ai@codecollab.com' },
        { 
          name: 'AI Assistant',
          email: 'ai@codecollab.com',
          password: 'ai_password_placeholder',
          avatar: 'https://i.ibb.co/61fJvJg/ai-avatar.png'
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      const aiContent = generateAIResponse(content);
      let aiMessage = await Message.create({ sender: aiUser._id, content: aiContent, chat: chatId });
      
      aiMessage = await aiMessage.populate('sender', 'name avatar');
      aiMessage = await aiMessage.populate('chat');
      aiMessage = await User.populate(aiMessage, { path: 'chat.users', select: 'name avatar email' });
      
      await Chat.findByIdAndUpdate(chatId, { latestMessage: aiMessage });
      res.json(aiMessage);
    } catch (error) {
      res.status(500).send('Failed to get AI response.');
    }
    return;
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    type: type || 'text'
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate('sender', 'name avatar');
    message = await message.populate('chat');
    message = await User.populate(message, { path: 'chat.users', select: 'name avatar email' });
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.json(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name avatar email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { sendMessage, allMessages };