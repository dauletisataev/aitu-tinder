import * as React from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import BackIcon from '@heroicons/solid/arrow-left.svg';
import SendIcon from '@heroicons/solid/arrow-circle-right.svg';
import MenuIcon from '@heroicons/solid/menu.svg';
import {Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Api} from "@src/api/Kis";

const mockAvatar = 'https://image.freepik.com/free-vector/portrait-caucasian-woman-profile-with-long-hair-avatar-young-white-girl_102172-419.jpg';


const Header = () => {
  return (
    <div className="flex items-center shadow-b sticky left-0 right-0 top-0 z-10 bg-white">
      <div className="p-4">
        <Link to="/">
          <BackIcon className="h-5 w-5 text-black" />
        </Link>
      </div>
      <p className="ml-4 font-semibold text-xl">Чаты</p>
    </div>
  )
}

export const ChatsPage: React.FC = () => {
  const api = new Api();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    api.chats().then(({data}) => setChats(data));
  }, [])

  return (
    <div>
      <Header />
      <div className="mt-4">
        <p className="text-md ml-4">Недавние пары</p>
        <div className="mt-3 overflow-x-scroll flex ">
          {Array.from(Array(10)).map((_, index) =>
            <img key={index} src={mockAvatar} className="ml-2 rounded-full w-14 h-14 mr-1" />
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl ml-4">Сообщения</p>
        <div className="mt-3">
          {chats.map((chat) =>
            <div key={chat.id} className="flex px-4 mb-4">
              <img src={chat.user.avatar_url || mockAvatar} className="rounded-full w-12 h-12 mr-3" />
              <div>
                <p className="text-md">{chat.user.name}</p>
                <p className="text-sm text-gray-700">{chat.last_message?.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

