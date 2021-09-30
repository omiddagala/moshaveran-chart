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
    let apiBaseUrl = 'https://apps.moshaveranetahsili.ir/api/';
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
                console.log(response.status,'state');
                if (response.status !== 200) {
                    setData([{}, apiStates.ERROR,response.status]);
                    return null;
                }
                if (fetchData.urlName==='pay'){
                    window.location.href = response.request.responseURL;
                }
                return response.data;
            })
                .then((response) => {
                    if (response === ''){
                        setData([
                            '',
                            apiStates.SUCCESS,
                        ]);
                    }else{
                        setData([
                            postProcess
                                ? postProcess(fetchData.urlName, response)
                                : response,
                            apiStates.SUCCESS,
                        ]);
                    }
                })
                .catch((e) => {
                    if (e.response?.status === 401) {
                        Store.remove('USER_INFO')
                        authContext.authDispatch({
                            type: 'INIT_DATA',
                        });
                        history.push('/zinc/login')
                    }else if(e.response?.status === 404 || e.response?.status === 501){
                        setData([{}, apiStates.ERROR,e.response.status]);
                    }
                    else{
                        setData([{}, apiStates.ERROR]);
                        cogoToast.error('خطا در انجام عملیات');
                    }

                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, watch);

    return data;
}
