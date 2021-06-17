import React, {useContext, useEffect} from 'react';
import AuthContext from "./Storage/Contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function AdminRequireLoginMiddleware(screen) {
    const authContext = useContext(AuthContext)
    const history = useHistory()
    console.log(authContext);
    if (authContext.auth?.apiToken !== '') {
        return screen;
    } else {
        history.push('/zinc/login')
    }
    return <div></div>
}
