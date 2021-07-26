import React, {useEffect, useState} from "react";
import Select from "../../Components/Select";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
export default function SecondStep({dispatch,state}){
    const [zaribha,setZaribha] = useState([])
    const [zaribhaData, zaribhaStatus] = useApi(
        preProcessUser('zaribha', {id:state.data.field}),
        postProcessUser, [],
        true);

    useEffect(()=>{
        if (zaribhaStatus==='SUCCESS'){
            let zaribs = zaribhaData.list.map(item=>{
                return {
                    rotbeBaSahmie:null,
                    rotbeBiSahmie:null,
                    allowed:null,
                    zarib:{id:null},
                    entekhab:{id:null}
                }
            })
            dispatch.setData({...state.data,ranks:zaribs})
            setZaribha(zaribhaData.list)
        }
    },[zaribhaStatus])

    return <div className={'w-100'}>
        <div className="input-box p-5 mb-5 w-100 d-flex flex-column align-items-center">
            <h2 className="display-5 fw-bold text-center h3">نرم‌ افزار انتخاب رشته ارشد 1400 مشاوران تحصیلی</h2>
        </div>
        <div className={'input-box p-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <div className={'d-flex justify-content-around w-100'}>
                <div className={'has-validation'}>
                    <label htmlFor="">
                        نام:
                    </label>
                    <input type="text" className={'form-control'} value={state.data.name} onChange={(e)=>{dispatch.setData({...state.data,name:e.target.value})}}/>
                    <p className={'valid-feedback'}></p>
                </div>
                <div className={'has-validation'}>
                    <label htmlFor="">
                        نام خانوادگی:
                    </label>
                    <input type="text" className={'form-control'} value={state.data.family} onChange={(e)=>{dispatch.setData({...state.data,family:e.target.value})}}/>
                    <p className={'valid-feedback'}></p>
                </div>
                <div className={'has-validation'}>
                    <label htmlFor="">
                        جنسیت:
                    </label>
                    <Select value={state.data.gender} options={[{id:'MALE',name:'مرد'},{id:'FEMALE',name:'زن'}]} className={'form-control'} onChange={(v)=>dispatch.setData({...state.data,gender:v})}/>
                    <p className={'valid-feedback'}>لطفا جنسیت را انتخاب نمایید.</p>
                </div>
            </div>
            <p className={'alert alert-info my-3'}>مهمترین فاکتور در انتخاب رشته سهمیه‌های آزاد، تبه د سهمیه در ضریب‌های مختلف است.</p>
            <table className={'w-100 table'}>
                <thead>
                    <tr>
                        <th>کد ضریب</th>
                        <th>رتبه در سهمیه</th>
                        {
                            state.data.benefit === '2' && <th>رتبه بدون سهمیه</th>
                        }
                        <th>مجاز به انتخاب دوره‌های روزانه و نوبت دوم</th>
                    </tr>
                </thead>
                <tbody>
                {
                    zaribha.map((item,index)=>{
                        return <tr>
                            <td>{item.code}</td>
                            <td><input className={'form-control'} type="number"/></td>
                            {
                                state.data.benefit === '2' && <td><input className={'form-control'} type="text"/></td>
                            }
                            <td>
                                <input className={'form-control'} type="checkbox"/>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
}
