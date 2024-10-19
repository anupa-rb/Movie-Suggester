import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "../Pages/Index";
import ViewMovie from "../Pages/ViewMovie";
import AddMovie from "../Pages/AddMovie";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch></Switch>

      <Route path="/" component={Index} exact />
      <Route path="/view_movie/:id" component={ViewMovie} />
      <Route path="/add" component={AddMovie} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />

    </BrowserRouter>
  );
};
export default Router;
