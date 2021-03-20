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

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <div className="font-helvetica">
          <Switch>
            <Route exact path="/404">
              Not Found
            </Route>
            <div className="">
              <Route path={`/login`}>
                <EnterNamePage />
              </Route>
              <Route exact path={`/`}>
                <Home />
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
      <ToastContainer />
    </StoreProvider>
  );
};

export default hot(module)(App);
