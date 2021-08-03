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
import routes from "./routes";
export default function StartWithoutCode({dispatch,state,init,getUrl}){
    const [mobileInvalid ,setMobileInvalid] = useState(false)
    const [postSms ,setPostSms] = useState(false)
    const history = useHistory();

    const [registerData, registerStatus] = useApi(
        preProcessUser('registerChoice',{}),
        postProcessUser, [],
        true);

    const [smsData, smsStatus] = useApi(
        preProcessUser('sms',{code:state.data.code,mobile:state.data.mobile}),
        postProcessUser, [postSms],
        postSms);


    useEffect(()=>{
        dispatch.setUpdateFromStorage(state.updateFromStorage +1 )
    },[])

    useEffect(()=>{
        if (registerStatus==='SUCCESS'){
            dispatch.setData({...state.data,code:registerData.code})
        }
    },[registerStatus])

    useEffect(()=>{
        if (smsStatus==='SUCCESS'){
            setPostSms(false)
        }
    },[smsStatus])

    function validation(){
        if (state.data.mobile !== ''){
            if (mobileValidation(state.data.mobile)){
                setPostSms(true)
            }else{
                cogoToast.error('لطفا شماره موبایل خود را به صورت صحیح وارد نمایید',{
                    hideAfter:10
                })
            }
        }
        if (state.data.code!==''){
            let temp ={...init,mobile:state.data.mobile,code:state.data.code}
            dispatch.setData(temp)
            Store.remove('data-choice').then(d=> {
                Store.store('data-choice', {data: temp}).then(dd => {
                    dispatch.setUpdateFromStorage(state.updateFromStorage + 1)
                    history.push(getUrl(routes.first))
                })
            })
        }
        else{
            cogoToast.error('لطفا کد اختصاصی خود را وارد نمایید.',{
                hideAfter:10
            })
        }
    }

    useEffect(()=>{
        dispatch.setLoading([smsStatus,registerStatus].includes('LOADING'))
    },[smsStatus,registerStatus])

    return <div className={'d-flex flex-column align-items-center'}>
        <div className="container p-lg-5 pt-5 d-flex flex-column flex-lg-row align-items-center">
            <div className="order-1 order-lg-0 col-12 col-lg-6 d-flex flex-column justify-content-center h-100 text-center align-items-center">
                <h2 className="hero-title my-5">شروع با دریافت کد اختصاصی</h2>
                <div className={'d-flex flex-column align-items-center'}>
                    <label className={'text-start w-100 col-lg-6'} htmlFor="">
                        کد اختصاصی:
                    </label>
                    <div className={'col-lg-8 d-flex w-100'}>
                        <input type="text" className={'form-control'} value={state.data.code} onChange={(e)=>{}}/>
                        <button className={'btn btn-primary mx-1'} onClick={()=>{
                            navigator.clipboard.writeText(state.data.code)
                            cogoToast.info('کد اختصاصی در کلیپ‌برد ذخیره شد',{
                                hideAfter:10
                            })
                        }}>کپی</button>
                    </div>
                    <div className={'col-lg-8 mt-3'}>
                        <label htmlFor="">
                            شماره موبایل:
                        </label>
                        <InputNumber placeHolder="0912448XXXX" className={`form-control ${mobileInvalid?'is-invalid':''}`} value={state.data.mobile} type={'integer'} onchange={(val)=>dispatch.setData({...state.data,mobile:val})}/>
                    </div>
                    <p className={'alert alert-info mt-3'}>با وارد کردن شماره موبایل، کد اختصاصی نرم افزار انتخاب رشته برای شما پیامک می‌شود.</p>
                    <button className={'btn btn-primary'} onClick={()=>validation()}>مرحله بعد</button>
                </div>
            </div>
            <div className="order-0 order-lg-1 col-12 col-lg-6 d-flex align-items-center justify-content-center h-100">
                <img src={hero} className="w-100" alt=""/>
            </div>
        </div>
        <div className={'col-12 col-lg-6 mt-lg-3 bg-info text-white rounded p-2 d-flex flex-column justify-content-center'}>
            <p className={'font-weight-bold'}>داوطلب عزیز</p>
            <p>کد بالا، کد اختصاصی شما در نرم افزار انتخاب رشته است.کد را در جایی یادداشت کنید و یا با وارد کردن شماره موبایل، اجازه دهید تا کد را برای شما پیامک کنیم.</p>
        </div>
    </div>

}
