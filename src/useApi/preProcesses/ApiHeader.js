import React, {useContext} from 'react';
import AuthContext from "../../Storage/Contexts/AuthContext";


export default function ApiHeader(auth = false, media = false, loginHeader = false) {
    const authContext = useContext(AuthContext);

    let Headers = {
        'content-Type': media ? 'multipart/form-data' : 'application/json',
        Accept: 'application/json'
    };

    if (loginHeader) {
        Headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ZW5nX2FwcDplbmdfYXBw',
            'Accept-Language': 'fa'
        }
    }

    if (auth) {
        Headers.Authorization = 'Bearer ' + authContext.auth.apiToken;
    }
    return Headers;
}
