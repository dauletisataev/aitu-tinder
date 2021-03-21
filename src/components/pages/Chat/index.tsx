import * as React from "react";
import { ChatFeed, Message } from "react-chat-ui";
import BackIcon from "@heroicons/solid/arrow-left.svg";
import SendIcon from "@heroicons/solid/arrow-circle-right.svg";
import MenuIcon from "@heroicons/solid/menu.svg";
import { TextField } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { Api } from "@src/api/Kis";
import { createConsumer } from "actioncable";
import { useStoreState } from "@src/hooks";
import LoadingContainer from "@src/components/atoms/LoadingContainer";

const mockAvatar =
  "https://image.freepik.com/free-vector/portrait-caucasian-woman-profile-with-long-hair-avatar-young-white-girl_102172-419.jpg";

const mockPossibleInputs = [
  "Как дела?",
  "Чем занята?",
  "Чем увлекаешься?",
  "Чем интересуешься?",
  "Чем занята?",
  "Чем увлекаешься?",
  "Чем интересуешься?",
];

const Header = ({ name, avatarUrl }) => {
  return (
    <div className="flex items-center shadow-b sticky left-0 right-0 top-0 z-10 bg-white">
      <NavLink className="p-4" to="/chats">
        <BackIcon className="h-5 w-5 text-black" />
      </NavLink>
      <img className="rounded-full w-12 h-12 my-2" src={avatarUrl} />
      <p className="ml-4 font-semibold text-xl">{name}</p>
    </div>
  );
};

export const ChatPage: React.FC = () => {
  const id = useStoreState((store) => store.id);

  const params = useParams();
  const { chatId, userId } = params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showHelpers, setShowHelpers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log(params);
    const api = new Api(id);
    api.userInfo(userId).then(({ data }) => {
      setUserInfo(data);
      setLoading(false);
    });

    api.messages(chatId).then(({ data }) => {
      const new_messages = data
        .map(
          (res) =>
            new Message({
              id: res.sender.id != id ? 1 : 0,
              message: res.text,
            }),
        )
        .reverse();
      setMessages(new_messages);
    });

    const cable = createConsumer(
      `wss://aitu-tinder.herokuapp.com/cable?aitu_id=${id}`,
    );

    cable.connect();

    cable.subscriptions.create("MessageChannel", {
      received: (payload) => {
        console.log("socket received:", payload);
        const action = payload.message.action;
        switch (action) {
          case "new_message":
            // const messageParsed = JSON.parse(
            //   JSON.parse(payload.message.order_item),
            // );
            api.messages(chatId).then(({ data }) => {
              const new_messages = data
                .map(
                  (res) =>
                    new Message({
                      id: res.sender.id != id ? 1 : 0,
                      message: res.text,
                    }),
                )
                .reverse();
              setMessages(new_messages);
            });
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

  const onMessageSend = useCallback(async () => {
    const api = new Api(id);
    setLoading(true);
    const { status } = await api.sendMessage({
      chat_id: chatId,
      text: newMessage,
    });
    setLoading(false);
    if (status === 200 || status === 201) {
      setNewMessage("");
      setMessages((prevMessages) => [
        ...prevMessages,
        new Message({ id: 0, message: newMessage }),
      ]);
    }
  }, [newMessage]);

  const onEnterPress = useCallback(
    (e) => {
      if (e.key === "Enter" && newMessage.length > 0) {
        onMessageSend();
      }
    },
    [onMessageSend, newMessage],
  );

  return (
    <LoadingContainer loading={loading}>
      <div>
        {userInfo && (
          <Header
            name={userInfo.name || ""}
            avatarUrl={userInfo.avatar_url || mockAvatar}
          />
        )}
        <div className="px-4 pb-12">
          <ChatFeed messages={messages} showSenderName />
        </div>
        <div className="fixed bottom-0 left-0 right-0 shadow-inner z-10 bg-gray-50">
          <div className="flex items-center">
            <button
              className="p-4"
              onClick={() => setShowHelpers((prevState) => !prevState)}
            >
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
              disabled={newMessage.length === 0 || loading}
            >
              <SendIcon className="w-7 h-7 text-blue-600" />
            </button>
          </div>
          {showHelpers && (
            <div className="flex items-center justify-center flex-wrap max-h-40 overflow-y-scroll">
              {mockPossibleInputs.map((input, index) => (
                <div className="w-2/4 px-4 my-2 h-full">
                  <button
                    key={index}
                    className="rounded-md bg-gray-200 w-full h-full py-2"
                    onClick={() => setNewMessage(input)}
                  >
                    {input}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LoadingContainer>
  );
};
