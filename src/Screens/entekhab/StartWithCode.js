import React, {useEffect, useState} from "react";
import hero from "../../assets/hero-login.png";
import {Link, useHistory} from "react-router-dom";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import cogoToast from "cogo-toast";
import Store from "../../Storage/Store";

export default function StartWithCode({dispatch}){
    const [code,setCode] = useState('')
    const [loginPost,setLoginPost] = useState(false)
    const history = useHistory()

    const [loginData, loginStatus,statusCode] = useApi(
        preProcessUser('login', {code}),
        postProcessUser, [loginPost],
        loginPost);

    useEffect(()=>{
        if (statusCode === 404){
            cogoToast.error('کد اختصاصی مورد نظر یافت نشد')
        }else{
            if (loginStatus==='SUCCESS'){
                dispatch.setData(loginData.list)
                Store.store('data-choice',{data:loginData.list}).then(()=>{
                   if (loginData.list.state==='PAID'){
                       history.push('/entekhab/level')
                   }else{
                       history.push('/entekhab/first')
                   }
                })
            }
        }
        setLoginPost(false)
    },[loginStatus])

    return <div className="container p-lg-5 pt-5 d-flex flex-column flex-lg-row align-items-center">
        <div className="order-1 order-lg-0 col-12 col-lg-6 d-flex flex-column justify-content-center h-100 text-center align-items-center">
            <h2 className="hero-title my-5">شروع با کد اختصاصی</h2>

            <div className={'d-flex flex-column col-12 col-lg-8'}>
                <label htmlFor="">
                    کد اختصاصی خود را وارد کنید
                    <input type="text" className={'form-control'} onChange={(e)=>{
                        setCode(e.target.value)
                    }}/>
                </label>
                <label htmlFor="">
                    کد امنیتی را وارد کنید
                    <input type="text" className={'form-control'}/>
                </label>
                <button className={'btn btn-primary'} onClick={()=>setLoginPost(true)}>مرحله بعد</button>
            </div>
            <div className={'alert alert-secondary mt-3 d-flex flex-column col-12 col-lg-8'}>
                <p>اگر کد اختصاصی نرم افزار انتخاب رشته را دریافت نکرده‌اید از دکمه زیر شروع کنید.</p>
                <Link to={'/entekhab/start-without-code'} className={'btn btn-secondary'}>دریافت کد اختصاصی نرم افزار</Link>
            </div>
        </div>
        <div className="order-0 order-lg-1 col-12 col-lg-6 d-flex align-items-center justify-content-center h-100">
            <img src={hero} className="w-100" alt=""/>
        </div>
    </div>
}
