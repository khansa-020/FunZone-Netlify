export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id
    ? users[1]?.username
    : users[0]?.username;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, currentMessage, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== currentMessage.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id // that message actually exists
  );
};

export const isSameSenderMargin = (messages, currentMessage, index, userId) => {
  // console.log(i === messages.length - 1);

  if (
    index < messages.length - 1 &&
    messages[index + 1].sender._id === currentMessage.sender._id &&
    messages[index].sender._id !== userId
  )
    return 33;
  else if (
    (index < messages.length - 1 &&
      messages[index + 1].sender._id !== currentMessage.sender._id &&
      messages[index].sender._id !== userId) ||
    (index === messages.length - 1 && messages[index].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, currentMessage, index) => {
  return (
    index > 0 && messages[index - 1].sender._id === currentMessage.sender._id
  );
};
