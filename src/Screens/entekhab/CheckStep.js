import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Header from "./Components/Header";
import routes from "./routes";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import Info from "./Components/Info";
export default function CheckStep({state,dispatch,getUrl,group, year}){
    const history = useHistory()
    const [fields, setFields] = useState([])
    const [benefits, setBenefits] = useState([])

    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fieldsChoice', {group: group}),
        postProcessUser, [],
        true);

    const [benefitsData, benefitsStatus] = useApi(
        preProcessUser('shares', {}),
        postProcessUser, [],
        true);

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

    return <div className={'w-100 container'}>
        <Header code={state.data.code} getUrl={getUrl}  group={group} year={year}/>
        <div className={'box p-lg-5 pt-5 p-2 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h4 className={'text-center mb-5'}> (مرحله تایید صحت اطلاعات)</h4>
            <Info text={'اطلاعاتی که تاکنون وارد کرده‌اید در زیر آمده است.در صورت صحت اطلاعات، بر روی دکمه تایید کلیک کنید'}/>
            <div className={'d-flex justify-content-around w-100 card'}>
                <div className={'d-flex justify-content-around flex-wrap'}>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            نام:
                        </label>
                        <p className={'font-weight-bold'}>{state.data.name}</p>
                    </div>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            نام خانوادگی:
                        </label>
                        <p className={'font-weight-bold'}>{state.data.family}</p>
                    </div>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            جنسیت:
                        </label>
                        <p className={'font-weight-bold'}>{state.data.gender === 'MALE' ? 'مرد' : 'زن'}</p>
                    </div>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            رشته امتحانی:
                        </label>
                        {fields &&  <p className={'font-weight-bold'}>{ fields.filter(item=>item.id===state.data.fieldOfChoice.id)[0]?.name}</p>}
                    </div>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            سهمیه:
                        </label>
                        {fields &&  <p className={'font-weight-bold'}>{ benefits.filter(item=>item.id===parseInt(state.data.share.id))[0]?.name}</p>}
                    </div>
                </div>
                <table className={'w-100 table text-center'}>
                    <thead>
                    <tr>
                        <th>کد ضریب</th>
                        <th>رتبه در سهمیه</th>
                        {
                            state.data.share.id === 2 && <th>رتبه بدون سهمیه</th>
                        }
                        <th>مجاز به انتخاب دوره‌های روزانه {group ===1?'':'و نوبت دوم'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.data.ranks.map((item,index)=>{
                            return <tr>
                                <td>{item.code}</td>
                                <td>
                                    {item.rotbeBaSahmie}
                                </td>
                                {
                                    state.data.share.id === 2 && <td>{item.rotbeBiSahmie}</td>
                                }
                                <td>
                                    <input className={'form-control'} type="checkbox" checked={item.allowed} />
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div className={'mt-3'}>
                <button className={'btn btn-info mx-2'} onClick={()=>{
                    history.replace(getUrl(routes.first))
                }}>ویرایش اطلاعات</button>
                <button className={'btn btn-primary'} onClick={()=>{
                    history.replace(getUrl(routes.pay))
                }}>تایید اطلاعات</button>
            </div>
        </div>
    </div>
}
