import React, {useReducer, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Route, useHistory,
} from "react-router-dom";
import Home from "./Screens/Home";
import Header from "./Components/Header";
import AuthReducer from './Storage/Reducers/AuthReducer';
import AuthContext from './Storage/Contexts/AuthContext';
import Admin from "./Admin/Screens/Admin";
import Store from "./Storage/Store";

const initializeUser = {
    user: null,
    apiToken: '',
};

export default function App() {
    const [auth, authDispatch] = useReducer(AuthReducer, {});
    const retrieveAuthData = async () => {
        try {
            let result = await Store.get('USER_INFO');
            result = result !== false ? result : initializeUser;
            return result;
        } catch (error) {
        }
    };

    useEffect(() => {
        retrieveAuthData().then((data) => {
            authDispatch({
                type: 'INIT_DATA',
                data: data,
            });
        });
    }, [])

    return auth.apiToken !== undefined ? <AuthContext.Provider value={{auth, authDispatch}}>
        <Router>
            <Route exact path="/takhmin"><Home/></Route>
            <Route path="/zinc"><Admin/></Route>
        </Router>
    </AuthContext.Provider> : null
}
