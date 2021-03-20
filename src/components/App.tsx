import * as React from "react";
import { hot } from "react-hot-loader";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "@src/store";
import EnterNamePage from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import ClubHouse from "@pages/ClubHouse";
import FireSvg from "@heroicons/solid/fire.svg";
import HeartSvg from "@heroicons/solid/heart.svg";
import ChatSvg from "@heroicons/solid/chat.svg";
import UserSvg from "@heroicons/solid/user-circle.svg";
import { NavLink, Redirect } from "react-router-dom";

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
      <div>
        <FireSvg className="w-10 h-10 text-red-500" />
      </div>
      <div>
        <HeartSvg className="w-10 h-10 text-gray-400" />
      </div>
      <div>
        <ChatSvg className="w-10 h-10 text-gray-400" />
      </div>
      <div>
        <UserSvg className="w-10 h-10 text-gray-400" />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <div className="font-helvetica">
          <Switch>
            <Route exact path="/404">
              Not Found
            </Route>
            <div className="h-screen flex flex-col">
              <Switcher />
              <Redirect from="/" to="/tinder" />
              <Route path={`/login`}>
                <EnterNamePage />
              </Route>
              <Route path={`/clubhouse`}>
                <ClubHouse />
              </Route>
              <Route exact path={`/tinder`}>
                <Home />
              </Route>
              <BottomNavigation />
            </div>
          </Switch>
        </div>
      </Router>
      <ToastContainer />
    </StoreProvider>
  );
};

export default hot(module)(App);
