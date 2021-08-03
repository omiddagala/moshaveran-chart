import React, {useContext, useEffect, useState} from 'react'
import useApi from "../../../useApi/useApi";
import {postProcessAuth, preProcessAuth} from "../../../useApi/preProcesses/AuthProcesseApi";
import AuthContext from "../../../Storage/Contexts/AuthContext";
import {useHistory} from "react-router-dom";
import AdminRequireLogoutMiddleware from "../../../AdminRequireLogoutMiddleware";
import SpinnerLoading from "../../../Components/Spinner";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginActive, setLoginActive] = useState(0);
    const [alertLogin, setAlertLogin] = useState(false)
    const [validation, setValidation] = useState({username: false, password: false})
    const authContext = useContext(AuthContext)
    const history = useHistory()

    function params() {
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)
        params.append('grant_type', 'password')
        return params;
    }

    const [loginData, loginStatus] = useApi(
        preProcessAuth('login', params()),
        postProcessAuth, [loginActive],
        loginActive !== 0
    );


    useEffect(() => {
        if (loginStatus === 'SUCCESS') {
            console.log(loginData);
            authContext.authDispatch({
                'type': 'LOGIN',
                'data': {
                    'role': loginData.role,
                    'apiToken': loginData.access_token
                }
            })
            history.push('/zinc')
        } else if (loginStatus === 'ERROR') {
            setAlertLogin(true)
        }
    }, [loginStatus])

    function submitForm(event) {
        event.preventDefault();
        let flag = true;
        let temp = validation
        if (username === '') {
            temp.username = true
            flag = false;
        }
        if (password === '') {
            temp.password = true
            flag = false
        }
        setValidation({...temp})
        if (flag) {
            setLoginActive(loginActive + 1)
        }
    }

    return AdminRequireLogoutMiddleware(
        <div>
            <SpinnerLoading show={loginStatus === 'LOADING'}/>
            <div className={'container d-flex flex-column col-12 col-lg-4 pt-5 position-relative'}>
                <div className="px-4 text-center">
                    <img className="d-block mx-auto mb-2" src="/logo.svg" alt="" width="172"
                         height="157"/>
                    <h1 className="mb-5">انتخاب برتر</h1>
                    <form className={'mt-5'} onSubmit={submitForm}>
                        <label htmlFor="username">نام کاربری</label>
                        <div className={'has-validation'}>
                            <input className={`form-control ${validation.username ? 'is-invalid' : ''}`} type="text"
                                   id='username' value={username}
                                   onChange={(event) => {
                                       setValidation({...validation, username: false})
                                       setUsername(event.target.value)
                                   }}/>
                            <p className={'invalid-feedback'}>لطفا نام کاربری را وارد کنید</p>
                        </div>

                        <label className={'mt-3'} htmlFor="password">رمز عبور</label>
                        <div className={'has-validation'}>
                            <input className={`form-control ${validation.password ? 'is-invalid' : ''}`} type="password"
                                   id='password' value={password}
                                   onChange={(event) => {
                                       setValidation({...validation, password: false})
                                       setPassword(event.target.value)
                                   }}/>
                            <p className={'invalid-feedback'}>لطفا نام کاربری را وارد کنید</p>
                        </div>
                        {alertLogin && <div className="alert alert-danger my-3" role="alert">
                            نام کاربری یا رمز عبور صحیح نیست
                        </div>}
                        <button className={'btn btn-primary mt-3'}>ورود</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
