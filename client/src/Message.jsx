import React from "react";

const Message = ({ items }) => {
  return (
    <div className="w-fit">
      <p className="message-username">{items.username}</p>
      <p className="message-text">{items.text}</p>
    </div>
  );
};

export default Message;
