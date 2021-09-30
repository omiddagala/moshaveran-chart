import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdminHome from "./AdminHome";
import Login from "./Auth/Login";
import AdminHeader from "../Components/AdminHeader";
import Logout from "./Auth/logout";
import AdminChart from "./AdminChart";
import NotFound from "../../Screens/NotFound";
import AdminChoice from "./AdminChoice";
import AdminResult from "./AdminResult";
import AuthContext from "../../Storage/Contexts/AuthContext";

export default function Admin() {
    const context = useContext(AuthContext)
    const [isAdmin,setIsAdmin] = useState(false)
    useEffect(()=>{
        setIsAdmin(context.auth.role === 'admin')
    })
    return <Router>
        <AdminHeader/>
        <Switch>
            <>
                {isAdmin && <>
                    <Route path="/zinc" exact><AdminHome/></Route>
                    <Route path="/zinc/chart" exact><AdminChart/></Route>
                    <Route path="/zinc/choice" exact><AdminChoice/></Route>
                    <Route path="/zinc/result" exact><AdminResult/></Route>
                </>}
                {
                    !isAdmin && <>
                    <Route path="/zinc" exact><AdminChoice/></Route>
                    <Route path="/zinc/result" exact><AdminResult/></Route>
                </>}
                <Route path="/zinc/login" exact><Login/></Route>
                <Route path="/zinc/logout" exact><Logout/></Route>
                <Route path=""><NotFound/></Route>
            </>
        </Switch>
    </Router>
}
