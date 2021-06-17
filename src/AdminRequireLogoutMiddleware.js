import React, {useContext, useEffect} from 'react';
import AuthContext from "./Storage/Contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function AdminRequireLogoutMiddleware(screen) {
    const authContext = useContext(AuthContext)
    const history = useHistory()
    console.log(authContext.auth?.apiToken);
    if (authContext.auth?.apiToken !== '') {
        history.push('/zinc')
    }
    return screen
}
