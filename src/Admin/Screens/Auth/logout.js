import React, {useContext, useEffect, useState} from 'react'
import AuthContext from "../../../Storage/Contexts/AuthContext";
import {useHistory} from "react-router-dom";

export default function Logout() {
    const authContext = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        authContext.authDispatch({
            'type': 'LOGOUT',
        })
        history.push('/login')
    }, [])
    return <div></div>
}
