import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Home from "./pages/Home";
import Help from "./pages/Help";
import NewUser from "./pages/User/New";
import EditUser from "./pages/User/Edit";
import UserList from "./pages/User/List";
import NotFound from "./pages/NotFound";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/ajuda" component={Help} />
      <Route path="/cadastrar" component={NewUser} />
      <Route path="/alterar" component={EditUser} />
      <Route path="/listar" component={UserList} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
