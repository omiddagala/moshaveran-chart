import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import Store from "../Storage/Store";
import AuthContext from "../Storage/Contexts/AuthContext";
import cogoToast from "cogo-toast";

export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export default function (fetchData, postProcess, watch = [], condition = true) {
    let apiBaseUrl = 'http://157.90.20.200:8080/';
    // let apiBaseUrl = 'http://localhost:8080/';
    const [data, setData] = useState([{}, '']);
    const history = useHistory()
    const authContext = useContext(AuthContext)
    let params ={
        method: fetchData.method,
        url: apiBaseUrl + fetchData.url,
        headers: fetchData.headers
    }

    if (fetchData.method==='post'){
        params.data = fetchData.data
    }else{
        params.params = fetchData.data
    }

    useEffect(() => {
        if (condition) {
            setData([{}, apiStates.LOADING]);
            axios(params).then((response) => {
                if (response.status !== 200) {
                    setData([{}, apiStates.ERROR]);
                    return null;
                }
                if (fetchData.urlName==='pay'){
                    window.location.href = response.request.responseURL;
                }
                return response.data;
            })
                .then((response) => {
                    setData([
                        postProcess
                            ? postProcess(fetchData.urlName, response)
                            : response,
                        apiStates.SUCCESS,
                    ]);
                })
                .catch((e) => {
                    cogoToast.error('خطا در انجام عملیات');
                    if (e.status === 401) {
                        Store.remove('USER_INFO')
                        authContext.authDispatch({
                            type: 'INIT_DATA',
                        });
                        history.push('/zinc/login')
                    }
                    setData([{}, apiStates.ERROR]);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, watch);

    return data;
}
