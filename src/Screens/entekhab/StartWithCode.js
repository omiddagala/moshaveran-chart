import React, {useEffect, useState} from "react";
import hero from "../../assets/hero-login.png";
import {Link, useHistory} from "react-router-dom";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import cogoToast from "cogo-toast";
import Store from "../../Storage/Store";
import routes from "./routes";

export default function StartWithCode({dispatch,getUrl,group}){
    const [code,setCode] = useState('')
    const [loginPost,setLoginPost] = useState(false)
    const history = useHistory()

    const [loginData, loginStatus,statusCode] = useApi(
        preProcessUser('login', {code}),
        postProcessUser, [loginPost],
        loginPost);

    useEffect(()=>{
        dispatch.setLoading(loginStatus ==='LOADING')
        if (statusCode === 404){
            cogoToast.error('اطلاعات ثبت شده‌ای با این کد اختصاصی یافت نشد.',{
                hideAfter:10
            })
        }else{
            if (loginStatus==='SUCCESS'){
                dispatch.setData(loginData.list)
                Store.remove('chance-selected')
                Store.store('data-choice',{data:loginData.list}).then(()=>{
                   if (loginData.list.state==='PAID'){
                       history.push(getUrl(routes.level))
                   }else{
                       history.push(getUrl(routes.first))
                   }
                })
            }
        }
        setLoginPost(false)
    },[loginStatus])


    return <div className="container p-lg-5 pt-5 d-flex flex-column flex-lg-row align-items-center">
        <div className="order-1 order-lg-0 col-12 col-lg-6 d-flex flex-column justify-content-center h-100 text-center align-items-center">
            <h2 className="hero-title my-5">شروع با کد اختصاصی</h2>

            <form onSubmit={(e)=>{
                e.preventDefault()
                setLoginPost(true)
            }
            } className={'d-flex flex-column col-12 col-lg-8'}>
                <label htmlFor="">
                    کد اختصاصی خود را وارد کنید
                    <input type="text" className={'form-control'} onChange={(e)=>{
                        setCode(e.target.value)
                    }} required={true}/>
                </label>
                <button className={'btn btn-primary'}>مرحله بعد</button>
            </form>
            <div className={'alert alert-secondary mt-3 d-flex flex-column col-12 col-lg-8'}>
                <p>اگر کد اختصاصی نرم افزار انتخاب رشته را دریافت نکرده‌اید از دکمه زیر شروع کنید.</p>
                <Link to={getUrl(routes.startWithoutCode)} className={'btn btn-secondary'}>دریافت کد اختصاصی نرم افزار</Link>
            </div>
        </div>
        <div className="order-0 order-lg-1 col-12 col-lg-6 d-flex align-items-center justify-content-center h-100">
            <img src={hero} className="w-100" alt=""/>
        </div>
    </div>
}
