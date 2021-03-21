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
import LocationSvg from "@heroicons/solid/location-marker.svg";
import ChatSvg from "@heroicons/solid/chat.svg";
import UserSvg from "@heroicons/solid/user-circle.svg";
import { Api } from "@src/api/Kis";
import aituBridge from "@btsd/aitu-bridge";
import { hashString, setKisToken } from "@src/utils/utils";
import LoadingContainer from "../atoms/LoadingContainer";
import { useStoreActions, useStoreState } from "@src/hooks";
import DashboardTinder from "./Dashboard/DashboardTinder";
import { ChatsPage } from "./Chats";
import { toast } from "react-toastify";
import AudioRoomPage from "./AudioRoomPage";
import LocationsPage from "./LocationsPage";

const Switcher: React.FC = () => {
  return (
    <div className="flex justify-center items-center mt-2">
      <div className="shadow flex">
        <NavLink
          to="/tinder"
          activeClassName="bg-indigo-500 text-white"
          className="rounded-l p-2 w-32 text-center"
        >
          Знакомства
        </NavLink>
        <NavLink
          to="/clubhouse"
          activeClassName="bg-indigo-500 text-white"
          className="rounded-r p-2 border-l w-32 text-center"
        >
          Общение
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
        activeClassName="text-indigo-500"
      >
        <FireSvg className="w-10 h-10" />
      </NavLink>
      <NavLink
        to="/locations"
        className="text-gray-400"
        activeClassName="text-indigo-500"
      >
        <LocationSvg className="w-10 h-10" />
      </NavLink>
      <NavLink
        to="/chats"
        className="text-gray-400"
        activeClassName="text-indigo-500"
      >
        <ChatSvg className="w-10 h-10" />
      </NavLink>

      <div
        onClick={() =>
          toast("Находится в разработке", {
            hideProgressBar: true,
            type: "info",
          })
        }
      >
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
    // for aitu
    aituBridge.getMe().then((data) => {
      const api = new Api(hashString(data.id));
      setId(`${hashString(data.id)}`);
      api
        .userspoll()
        .then(({ data }) => {
          setUserspoll(data);
        })
        .catch(() => {
          toast(".userspoll() fail", {
            hideProgressBar: true,
            type: "warning",
          });
          history.push("/registration");
        })
        .finally(() => setLoading(false));
    });

    // for local
    // const api = new Api("1");
    // setId("1");
    // api
    //   .userspoll()
    //   .then(({ data }) => {
    //     // setUserspoll(data);
    //   })
    //   .catch(() => {
    //     toast(".userspoll() fail", {
    //       hideProgressBar: true,
    //       type: "warning",
    //     });
    //     history.push("/registration");
    //   })
    //   .finally(() => setLoading(false));
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
        <Route path={`/locations`}>
          <LocationsPage />
        </Route>
        <Route exact path={`/clubhouse`}>
          <Switcher />
          <ClubHouse />
        </Route>
        <Route exact path={`/tinder`}>
          <Switcher />
          <DashboardTinder />
        </Route>
        <Route exact path={`/clubhouse/room`}>
          <Switcher />
          <AudioRoomPage />
        </Route>
        <Route exact path={`/`}>
          <Switcher />
          <DashboardTinder />
        </Route>
        <BottomNavigation />
      </div>
    </LoadingContainer>
  );
};

export default AuthFencePage;
