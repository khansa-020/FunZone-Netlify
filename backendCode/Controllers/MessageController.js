import asyncHndler from "express-async-handler";
import ChatModel from "../Models/chatModel.js";
import MessageModel from "../Models/MessageModel.js";
import UserModel from "../Models/userModel.js";

export const sendMessage = asyncHndler(async (req, res) => {
  const id = req.params.id; //logged in user
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "username profilePicture");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "username profilePicture email",
    });
    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const allMessages = asyncHndler(async (req, res) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "username profilePicture email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
