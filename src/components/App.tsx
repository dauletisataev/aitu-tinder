import * as React from "react";
import { hot } from "react-hot-loader";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "@src/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegistrationPage from "./pages/RegistrationPage";
import { ChatPage } from "@pages/Chat";
import AuthFencePage from "./pages/AuthFencePage";
import aituBridge from "@btsd/aitu-bridge";
import { Api } from "@src/api/Kis";
import LoadingContainer from "./atoms/LoadingContainer";
import { hashString } from "@src/utils/utils";
import { useStoreActions } from "@src/hooks";

const App: React.FC = () => {
  // const [loading, setLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [isRegisted, setIsRegistred] = React.useState(false);

  // for aitu
  React.useEffect(() => {
    const local = false;

    if (local) {
      const api = new Api("1632222011");
      api
        .who_am_i()
        .then(() => {
          setIsRegistred(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      aituBridge.getMe().then((data) => {
        const api = new Api(hashString(data.id));
        api
          .who_am_i()
          .then(() => {
            setIsRegistred(true);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    }
  }, []);

  return (
    <StoreProvider store={store}>
      <Router>
        <LoadingContainer loading={loading}>
          {isRegisted ? (
            <div className="font-helvetica">
              <Switch>
                <Route exact path="/404">
                  Not Found
                </Route>
                <Route path={`/`}>
                  <AuthFencePage />
                </Route>
              </Switch>
            </div>
          ) : (
            <>
              <Route path={`/registration`}>
                <RegistrationPage />
              </Route>
              <Route path={`/`}>
                <RegistrationPage />
              </Route>
            </>
          )}
        </LoadingContainer>
      </Router>
      <ToastContainer />
    </StoreProvider>
  );
};

export default hot(module)(App);
