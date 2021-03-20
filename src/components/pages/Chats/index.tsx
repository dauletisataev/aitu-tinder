import * as React from "react";
import { ChatFeed, Message } from "react-chat-ui";
import BackIcon from "@heroicons/solid/arrow-left.svg";
import SendIcon from "@heroicons/solid/arrow-circle-right.svg";
import MenuIcon from "@heroicons/solid/menu.svg";
import { Link, useHistory } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Api } from "@src/api/Kis";
import { createConsumer } from "actioncable";
import { useStoreState } from "@src/hooks";

const mockAvatar =
  "https://image.freepik.com/free-vector/portrait-caucasian-woman-profile-with-long-hair-avatar-young-white-girl_102172-419.jpg";

const Header = () => {
  return (
    <div className="flex items-center shadow-b sticky left-0 right-0 top-0 z-10 bg-white">
      <div className="p-4">
        <Link to="/tinder">
          <BackIcon className="h-5 w-5 text-black" />
        </Link>
      </div>
      <p className="ml-4 font-semibold text-xl">Чаты</p>
    </div>
  );
};

export const ChatsPage: React.FC = () => {
  const id = useStoreState((store) => store.id);

  const [chats, setChats] = useState([]);
  const [matches, setMatches] = useState([]);
  const router = useHistory();

  useEffect(() => {
    const api = new Api(id);
    api.chats().then(({ data }) => setChats(data));
    api.matches().then(({ data }) => setMatches(data));
    const cable = createConsumer(
      `wss://aitu-tinder.herokuapp.com/cable?aitu_id=1`,
    );

    cable.connect();

    cable.subscriptions.create("MessageChannel", {
      received: (payload) => {
        console.log("socket received:", payload);
        const action = payload.message.action;
        switch (action) {
          case "new_message":
            api.chats().then(({ data }) => setChats(data));
            break;
          default:
            console.log(`OrderChanel message: unhandled action ${action}`);
        }
      },
    });

    return () => {
      cable.disconnect();
    };
  }, []);

  useEffect(() => {
    const newMatches = matches.filter((match) =>
      chats.map((chat) => chat.user.id).includes(match.id),
    );
    setMatches((prevMatches) =>
      prevMatches.length === newMatches.length ? prevMatches : newMatches,
    );
  }, [matches, chats]);

  const onMatchClick = (userId) => {
    const api = new Api(id);
    api.createChats({ user_id: userId }).then(({ data, status }) => {
      if (status === 200 || status === 201) {
        router.push(`/chat/${data.id}/userId`);
      }
    });
  };

  return (
    <div>
      <Header />
      {matches.length > 0 && (
        <div className="mt-4">
          <p className="text-md ml-4">Недавние пары</p>
          <div className="mt-3 overflow-x-scroll flex ">
            {matches.map((match, index) => (
              <img
                onClick={() => onMatchClick(match.id)}
                key={index}
                src={match.avatar_url || mockAvatar}
                className="ml-2 rounded-full w-14 h-14 mr-1"
              />
            ))}
          </div>
        </div>
      )}
      <div className="mt-4">
        <p className="text-xl ml-4">Сообщения</p>
        <div className="mt-3">
          {chats.map((chat) => (
            <Link key={chat.id} to={`/chat/${chat.id}/${chat.user.id}`}>
              <div className="flex px-4 mb-4">
                <img
                  src={chat.user.avatar_url || mockAvatar}
                  className="rounded-full w-12 h-12 mr-3"
                />
                <div>
                  <p className="text-md">{chat.user.name}</p>
                  <p className="text-sm text-gray-700">
                    {chat.last_message?.text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
