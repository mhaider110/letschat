import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { Chat } from './types';
import userImage from './images/user.jpg';

const mockData: Chat[] = [
  { userId: 1, userName: 'Best friend #1', messages: [] },
  { userId: 2, userName: 'Just friend #1', messages: [] },
];

function App() {

  const [chats, setChats] = useState<Chat[]>(mockData);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const chatSectionBottom = useRef<HTMLDivElement>(null);


  useEffect(() => {
    chatSectionBottom!.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [activeChat?.messages]);


  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (currentMessage && activeChat) {
      const newNessages = [...activeChat.messages];
      newNessages.push({ message: currentMessage, timestamp: new Date(), type: 'message-sent' });
      newNessages.push({ message: "I'm still learnig will reply back soon :) ", timestamp: new Date(), type: 'message-received' });
      setActiveChat({ ...activeChat, messages: newNessages });
      const updatedChat = chats.map((chat) => {
        if (chat.userId === activeChat.userId)
          chat.messages = [...newNessages];
        return chat;
      });
      setChats(updatedChat);
      setCurrentMessage('');
    }
  }



  return (
    <div className="container">
      <div className="header">
        <div className="logo-wrapper">
          <div className={`logo ${activeChat ? 'logo-dynamic-width' : 'logo-default-width'}`}></div>
        </div>
        {activeChat && <div className='user'>
          <div className='flex items-center'>
            <img src={userImage} alt="user-default-image" className='user-image'></img>
            <h2>{activeChat.userName}</h2>
          </div>
          <button className='close-btn' onClick={() => { setActiveChat(null) }}>X</button>
        </div>}
      </div>
      <div className="chat-container">
        <div className={`chat-list ${activeChat ? 'side-bar-display': 'chat-list-default-width'}`}>
          {chats.map((chat, index) => <div className="chat-item" key={`chat-item${index}`} onClick={() => setActiveChat(chat)}>
            <img src={userImage} alt="user-default-image" className='user-image'></img>
            <h2>{chat.userName}</h2>
          </div>)}
        </div>
        {activeChat && <div className="message-container">
          <div className="messages">
            {activeChat.messages.map((message, index) =>
              <div key={`msg${index}`} className={message.type}>
                <div className='msg-date'>{message.timestamp.toLocaleString()}</div>
                <span className='msg-text'>{message.message}</span>
              </div>)}
            <div ref={chatSectionBottom}></div>
          </div>

          <form onSubmit={handleSubmit} className='input-form'>
            <input type="text" placeholder='Type a message..' value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)} />
            <button type='submit'>SEND</button>
          </form>
        </div>}
      </div>
    </div>
  );
}

export default App;
