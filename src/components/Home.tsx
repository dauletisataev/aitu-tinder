import { Api } from "@src/api/Kis";
import { useStoreActions, useStoreState } from "@src/hooks";
import { getCookie, setKisToken } from "@src/utils/utils";
import * as React from "react";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import LoadingContainer from "./atoms/LoadingContainer";
import DashboardTinder from "./pages/Dashboard/DashboardTinder";

const Home: React.FC = () => {
  const api = new Api();
  const history = useHistory();
  let { path, url } = useRouteMatch();

  React.useEffect(() => {}, []);
  return (
    <LoadingContainer loading={false}>
      <Switch>
        <Route exact path={path}>
          <DashboardTinder />
        </Route>
        <Route path={`${path}/:topicId`}>"other routes"</Route>
      </Switch>
    </LoadingContainer>
  );
};

export default Home;
