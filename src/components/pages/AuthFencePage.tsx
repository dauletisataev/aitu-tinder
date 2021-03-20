import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory,
} from "react-router-dom";
import { ChatPage } from "./Chat";
import ClubHouse from "@pages/ClubHouse";
import FireSvg from "@heroicons/solid/fire.svg";
import HeartSvg from "@heroicons/solid/heart.svg";
import ChatSvg from "@heroicons/solid/chat.svg";
import UserSvg from "@heroicons/solid/user-circle.svg";
import { Api } from "@src/api/Kis";
import aituBridge from "@btsd/aitu-bridge";
import { hashString, setKisToken } from "@src/utils/utils";
import LoadingContainer from "../atoms/LoadingContainer";
import { useStoreActions, useStoreState } from "@src/hooks";
import DashboardTinder from "./Dashboard/DashboardTinder";
import { ChatsPage } from "./Chats";

const Switcher: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-2">
      <div className="shadow flex">
        <NavLink
          to="/tinder"
          activeClassName="bg-red-500 text-white"
          className="rounded-l p-2 w-30 text-center w-24"
        >
          Tinder
        </NavLink>
        <NavLink
          to="/clubhouse"
          activeClassName="bg-red-500 text-white"
          className="rounded-r p-2 border-l w-30 text-center w-24"
        >
          Clubhouse
        </NavLink>
      </div>
    </div>
  );
};

const BottomNavigation: React.FC = () => {
  return (
    <div className="p-2 border-t w-full mt-auto flex justify-between">
      <NavLink
        to="/tinder"
        className="text-gray-400"
        activeClassName="text-red-500"
      >
        <FireSvg className="w-10 h-10" />
      </NavLink>
      <div>
        <HeartSvg className="w-10 h-10 text-gray-400" />
      </div>
      <NavLink
        to="/chats"
        className="text-gray-400"
        activeClassName="text-red-500"
      >
        <ChatSvg className="w-10 h-10" />
      </NavLink>
      <div>
        <UserSvg className="w-10 h-10 text-gray-400" />
      </div>
    </div>
  );
};

interface IAuthFencePageProps {}

const AuthFencePage: React.FunctionComponent<IAuthFencePageProps> = (props) => {
  const id = useStoreState((store) => store.id);
  const history = useHistory();

  const [loading, setLoading] = React.useState(true);
  const [userspoll, setUserspoll] = React.useState(null);
  const setId = useStoreActions((store) => store.setId);

  React.useEffect(() => {
    setId("1");
    // aituBridge.getMe().then((data) => {
    //   const api = new Api(hashString(data.id));
    //   setId(`${hashString(data.id)}`)
    //   api
    //     .userspoll()
    //     .then(({ data }) => {
    //       setUserspoll(data);
    //     })
    //     .catch(() => {
    //       alert(".userspoll() fail");
    //       history.push("/registration");
    //     })
    //     .finally(() => setLoading(false));
    // });

    const api = new Api("1");
    api
      .userspoll()
      .then(({ data }) => {
        setUserspoll(data);
      })
      .catch(() => {
        alert(".userspoll() fail");
        history.push("/registration");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <LoadingContainer loading={loading}>
      <div className="h-screen flex flex-col">
        <Route path={`/chat/:chatId/:userId`}>
          <ChatPage />
        </Route>
        <Route path={`/chats`}>
          <ChatsPage />
        </Route>
        <Route path={`/clubhouse`}>
          <Switcher />
          <ClubHouse />
        </Route>
        <Route exact path={`/tinder`}>
          <Switcher />
          {userspoll && <DashboardTinder users={userspoll} />}
        </Route>
        <Route exact path={`/`}>
          {userspoll && <DashboardTinder users={userspoll} />}
        </Route>
        <BottomNavigation />
      </div>
    </LoadingContainer>
  );
};

export default AuthFencePage;
