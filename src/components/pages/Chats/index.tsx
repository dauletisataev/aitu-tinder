import * as React from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import BackIcon from '@heroicons/solid/arrow-left.svg';
import SendIcon from '@heroicons/solid/arrow-circle-right.svg';
import MenuIcon from '@heroicons/solid/menu.svg';
import {TextField} from "@material-ui/core";
import {useCallback, useState} from "react";

const mockMessages = [
  new Message({
    id: 1,
    message: "I'm the recipient! (The person you're talking to)",
    senderName: 'Lolita'
  }),
  new Message({ id: 0, message: "I'm you -- the blue bubble!", senderName: 'Nursultan' }),
  new Message({id: 0, message: 'nice to meet you!', senderName: 'Nursultan'})
]

const mockAvatar = 'https://image.freepik.com/free-vector/portrait-caucasian-woman-profile-with-long-hair-avatar-young-white-girl_102172-419.jpg';

const mockPossibleInputs = [
  'Как дела?',
  'Чем занята?',
  'Чем увлекаешься?',
  'Чем интересуешься?',
  'Чем занята?',
  'Чем увлекаешься?',
  'Чем интересуешься?',
]

const Header = () => {
  return (
    <div className="flex items-center shadow-b sticky left-0 right-0 top-0 z-10 bg-white">
      <div className="p-4">
        <BackIcon className="h-5 w-5 text-black" />
      </div>
      <img className="rounded-full w-12 h-12 my-2" src={mockAvatar} />
      <p className="ml-4 font-semibold text-xl">Lolita</p>
    </div>
  )
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showHelpers, setShowHelpers] = useState(false);

  const onMessageSend = useCallback(() => {
    setNewMessage('');
    setMessages((prevMessages) => [...prevMessages, new Message({id: 0, message: newMessage})])
  }, [newMessage]);

  const onEnterPress = useCallback((e) => {
    if (e.key === 'Enter' && newMessage.length > 0) {
      onMessageSend();
    }
  }, [onMessageSend, newMessage])

  return (
    <div>
      <Header />
      <div className="px-4 pb-12">
        <ChatFeed
          messages={messages}
          showSenderName
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 shadow-inner z-10 bg-gray-50">
        <div className="flex items-center">
          <button className="p-4" onClick={() => setShowHelpers((prevState) => !prevState)}>
            <MenuIcon className="w-5 h-5 text-black" />
          </button>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            placeholder="Введите ваше сообщение..."
            size="small"
            fullWidth
            onKeyDown={onEnterPress}
          />
          <button
            className="p-2"
            onClick={onMessageSend}
            disabled={newMessage.length === 0}
          >
            <SendIcon className="w-7 h-7 text-blue-600" />
          </button>
        </div>
        {showHelpers && (
          <div className="flex items-center justify-center flex-wrap max-h-40 overflow-y-scroll">
            {mockPossibleInputs.map((input, index) =>
              <div className="w-2/4 px-4 my-2 h-full">
                <button
                  key={index}
                  className="rounded-md bg-gray-200 w-full h-full py-2"
                  onClick={() => setNewMessage(input)}
                >
                  {input}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

