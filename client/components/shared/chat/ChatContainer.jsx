import React from "react";
import Message from "./Message";

const ChatContainer = () => {
  const messages = [
    {
      id: 1,
      text: "Hey! 😊 How's everything going on your end?",
      sender: "receiver",
    },
    {
      id: 2,
      text: "Hey! Not too bad, just got off work. What about you?",
      sender: "sender",
    },
    {
      id: 3,
      text: "I'm doing alright. Just wrapped up a project that had me working late every night this week. Finally, some time to relax! 😅",
      sender: "receiver",
    },
    { id: 4, text: "That sounds exhausting! 😩", sender: "sender" },
    {
      id: 5,
      text: "It really was. But at least it's done now, so I can focus on other things.",
      sender: "receiver",
    },
    { id: 6, text: "Any plans for the weekend?", sender: "sender" },
    {
      id: 7,
      text: "I’m thinking of taking a day trip to the mountains. 🏞️ Just need a break from the city, you know?",
      sender: "receiver",
    },
    {
      id: 8,
      text: "That sounds amazing! I’ve been meaning to get out of the city too, but I just haven’t found the time.",
      sender: "sender",
    },
    {
      id: 9,
      text: "You should definitely make time for it! It’s so refreshing to disconnect and be in nature for a while.",
      sender: "receiver",
    },
    {
      id: 10,
      text: "Totally agree! I might just join you if you don’t mind. 😄",
      sender: "sender",
    },
  ];

  return (
    <div className="h-[82vh] overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatContainer;
