import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import cogoToast from "cogo-toast";
import InputNumber from "../../Components/InputNumber";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import {mobileValidation} from "../../HelperFunction";
import AuthContext from "../../Storage/Contexts/AuthContext";
import Store from "../../Storage/Store";
import hero from "../../assets/hero-login.png";
export default function StartWithoutCode({dispatch,state}){
    const [mobileInvalid ,setMobileInvalid] = useState(false)
    const [postSms ,setPostSms] = useState(false)
    const [postLogin ,setPostLogin] = useState(false)
    const context = useContext(AuthContext)
    const history = useHistory();

    const [registerData, registerStatus] = useApi(
        preProcessUser('registerChoice',{}),
        postProcessUser, [],
        true);

    const [smsData, smsStatus] = useApi(
        preProcessUser('sms',{code:state.data.code,mobile:state.data.mobile}),
        postProcessUser, [postSms],
        postSms);

    const [loginData, loginStatus] = useApi(
        preProcessUser('login',{code:state.data.code}),
        postProcessUser, [postLogin],
        postLogin);

    useEffect(()=>{
        dispatch.setUpdateFromStorage(state.updateFromStorage +1 )
    },[])

    useEffect(()=>{
        if (registerStatus==='SUCCESS'){
            dispatch.setData({...state.data,code:registerData.code})
        }
    },[registerStatus])

    useEffect(()=>{
        if (loginStatus==='SUCCESS'){
            setPostLogin(false)
            Store.store('data-choice',{data: state.data})
            history.push('/entekhab/first')
        }
    },[loginStatus])

    useEffect(()=>{
        if (smsStatus==='SUCCESS'){
            setPostSms(false)
        }
    },[smsStatus])
    useEffect(()=>{
        if (loginStatus==='SUCCESS'){
            setPostLogin(false)
        }
    },[loginStatus])

    function validation(){
        if (state.data.mobile !== ''){
            if (mobileValidation(state.data.mobile)){
                setPostSms(true)
            }else{
                cogoToast.error('لطفا شماره موبایل خود را به صورت صحیح وارد نمایید')
            }
        }
        if (state.data.code!==''){
            setPostLogin(true)
            Store.store('data-choice',{data:state.data});
        }else{
            cogoToast.error('لطفا کد اختصاصی خود را وارد نمایید.')
        }
    }

    return <div className={'d-flex flex-column align-items-center'}>
        <div className="container p-5 d-flex align-items-center">
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center h-100 text-center align-items-center"
                 data-aos="fade-left">
                <h2 className="hero-title my-5">شروع با با دریافت کد اختصاصی</h2>

                <div className={'d-flex flex-column align-items-center'}>
                    <label className={'text-start w-100 col-6'} htmlFor="">
                        کد اختصاصی:
                    </label>
                    <div className={'col-6 d-flex w-100'}>
                        <input type="text" className={'form-control'} value={state.data.code} onChange={(e)=>{}}/>
                        <button className={'btn btn-primary mx-1'} onClick={()=>{
                            navigator.clipboard.writeText(state.data.code)
                            cogoToast.info('کد اختصاصی در کلیپ‌برد ذخیره شد')
                        }}>کپی</button>
                    </div>
                    <div className={'col-6 mt-3'}>
                        <label htmlFor="">
                            شماره موبایل:
                        </label>
                        <InputNumber placeHolder="0912448XXXX" className={`form-control ${mobileInvalid?'is-invalid':''}`} value={state.data.mobile} type={'integer'} onchange={(val)=>dispatch.setData({...state.data,mobile:val})}/>
                    </div>
                    <p className={'alert alert-info mt-3'}>با وارد کردن شماره موبایل، کد اختصاصی نرم افزار انتخاب رشته برای شما پیامک می‌شود.</p>
                    <button className={'btn btn-primary'} onClick={()=>validation()}>مرحله بعد</button>
                </div>
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100"
                 data-aos="fade-right">
                <img src={hero} className="w-100" alt=""/>
            </div>
        </div>
        <div className={'col-12 col-lg-6 bg-info text-white rounded p-2 d-flex flex-column justify-content-center'} data-aos="fade-up">
            <p className={'font-weight-bold'}>داوطلب عزیز</p>
            <p>کد بالا، کد اختصاصی شما در نرم افزار انتخاب رشته است.کد را در جایی یادداشت کنید و یا با وارد کردن شماره موبایل، اجازه دهید تا کد را برای شما پیامک کنیم.</p>
        </div>
    </div>

}
