import React, {useContext, useEffect, useState} from "react";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import Select from "../../Components/Select";
import InputNumber from "../../Components/InputNumber";
import AuthContext from "../../Storage/Contexts/AuthContext";
import Store from "../../Storage/Store";
import {useHistory} from "react-router-dom";
export default function FirstStep({group,state,dispatch}){
    const [fields, setFields] = useState([])
    const [benefits, setBenefits] = useState([])
    const [firstPost,setFirstPost] = useState(false)
    const [invalid,setInvalid] = useState({filed:false,ave:false})
    const context = useContext(AuthContext)
    const history = useHistory()
    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fields', {id: group}),
        postProcessUser, [],
        true);

    const [benefitsData, benefitsStatus] = useApi(
        preProcessUser('benefits', {}),
        postProcessUser, [],
        true);

    const [firstData, firstStatus] = useApi(
        preProcessUser('first', {
            code:context.auth.code,
            mobile:context.auth.mobile,
            group:{id:group},
            field:{id:state.data.field},
            sahmie:{id:state.data.benefit},
            ave:state.data.ave,
            state:'FIRST'
        }),
        postProcessUser, [firstPost],
        firstPost);

    useEffect(() => {
        if (fieldsStatus === 'SUCCESS') {
            setFields(fieldsData.list)
        }
    }, [fieldsStatus])

    useEffect(() => {
        if (benefitsStatus === 'SUCCESS') {
            setBenefits(benefitsData.list)
        }
    }, [benefitsStatus])

    function validation(){
        let invalidArr ={
            field: state.data.field === null,
            ave : state.data.ave === ''
        }
        setInvalid(invalidArr)
        if (!Object.values(invalidArr).includes(true)){
            setFirstPost(true)
        }
    }

    useEffect(()=>{
        if (firstStatus === 'SUCCESS'){
            Store.store('data-choice',{data:state.data})
            history.push('/entekhab/second')
        }
    },[firstStatus])

    return <div className={'w-100'}>
        <div className="input-box p-5 mb-5 w-100 d-flex flex-column align-items-center">
            <h2 className="display-5 fw-bold text-center h3">نرم‌ افزار انتخاب رشته ارشد 1400 مشاوران تحصیلی</h2>
        </div>
        <div className={'input-box p-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <form onSubmit={(e)=> {
                e.preventDefault()
                validation()
            }} action="">
                <div className={'has-validation'}>
                    {fields.length > 0 && <div className={'mx-5 mb-5'}>
                        <label htmlFor="">رشته امتحانی</label>
                        <Select placeHolder={'انتخاب رشته'} options={fields} className={invalid.field?'is-invalid':''} value={state.data.field}
                                onChange={value => {
                                    dispatch.setData({...state.data,field:value})
                                }}/>
                        <p className={'invalid-feedback'}>لطفا رشته امتحانی را وارد نمایید.</p>
                    </div>}
                </div>

                <p>نرم‌افزار انتخاب رشته ایکس، حاصل بررسی کامل تغییرات کد ضرایب این رشته نسبت به سال گذشته می‌باشد و دپارتمان تخصصی رشته ایکس با بررسی بیش از ۲۳۰۰ کارنامه نهایی قبولی، شانس قبولی شمارا با توجه به رتبه شما تعیین کرده و در نهایت بر اساس کیفیت گرایش‌ها و دانشگاه‌ها، انتخاب‌های مد نظر شما را اولویت‌بندی می‌کنند.</p>
                {benefits.length > 0 && <div className={'mx-5 mb-5'}>
                    <label htmlFor="">سهمیه:</label>
                    <Select placeHolder={'انتخاب رشته'} options={benefits} value={state.data.benefit}
                            onChange={value => {
                                dispatch.setData({...state.data,benefit:value})
                            }}/>
                </div>}
                <p>معدل موثر تا ۲۰ درصد در وضعیت کارنامه شما تاثیر گذار است.</p>
                <div className={'has-validation'}>
                    <label htmlFor="">معدل موثر</label>
                    <InputNumber value={state.data.ave} onchange={value=>dispatch.setData({...state.data,ave:value})} className={`form-control ${invalid.ave?'is-invalid':''}`} />
                    <p className={'invalid-feedback'}>لطفا معدل موثر را وارد نمایید.</p>
                </div>

                <button type={'submit'} className={'btn btn-primary mt-3'}>مرحله بعد</button>
            </form>
        </div>
    </div>
}
