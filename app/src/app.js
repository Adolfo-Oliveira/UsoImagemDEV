import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Masterpage from "./masterpage";
import Logout from './pages/logout';
import PrivateRoute from './components/private-router';
import LinkEvento from "./pages/linkEvento";
import ConfirmarAcesso from "./pages/confirmarAcesso";

const GlobalStyle = createGlobalStyle`  

`;

const App = () => {
  return (
    <Router basename={`/${process.env.REACT_APP_DOMAIN.split("/")[3]}`}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/linkEvento/:eventoId/" render={(props) => <LinkEvento {...props} />} />
        <Route exact path="/confirmar-acesso/:id/" render={(props) => <ConfirmarAcesso {...props} />} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute path="/" component={Masterpage} />        
      </Switch>
    </Router>
  );
};

export default App;
