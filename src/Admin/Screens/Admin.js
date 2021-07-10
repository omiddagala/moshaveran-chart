import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdminHome from "./AdminHome";
import Login from "./Auth/Login";
import AdminHeader from "../Components/AdminHeader";
import Logout from "./Auth/logout";
import AdminChart from "./AdminChart";
import NotFound from "../../Screens/NotFound";

export default function Admin() {
    return <Router>
        <AdminHeader/>
        <Switch>
            <Route path="/zinc" exact><AdminHome/></Route>
            <Route path="/zinc/chart" exact><AdminChart/></Route>
            <Route path="/zinc/login" exact><Login/></Route>
            <Route path="/zinc/logout" exact><Logout/></Route>
            <Route path=""><NotFound/></Route>
        </Switch>
    </Router>
}
