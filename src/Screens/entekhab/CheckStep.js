import React from "react";
import {useHistory} from "react-router-dom";
export default function CheckStep({state,dispatch}){
    const history = useHistory()
    return <div className={'w-100 container'}>
        <div className={'input-box p-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (مرحله تایید صحت اطلاعات)</h4>
            <div className={'d-flex justify-content-around w-100 card'}>
                <p className={'alert alert-info text-center'}>اطلاعاتی که تاکنون وارد کرده‌اید در زیر آمده است.در صورت صحت اطلاعات، ب روی دکمه تایید کلیک کنید</p>
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
                        <p className={'font-weight-bold'}>{state.data.fieldOfChoice.id}</p>
                    </div>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            سهمیه:
                        </label>
                        <p className={'font-weight-bold'}>{state.data.share.id}</p>
                    </div>
                    <div className={'p-4 col-4'}>
                        <label htmlFor="">
                            معدل موثر:
                        </label>
                        <p className={'font-weight-bold'}>{state.data.ave}</p>
                    </div>
                </div>
                <table className={'w-100 table text-center'}>
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
                        state.data.ranks.map((item,index)=>{
                            return <tr>
                                <td>{item.code}</td>
                                <td>
                                    {item.rotbeBiSahmie}
                                </td>
                                {
                                    state.data.share === '2' && <td>{item.rotbeBaSahmie}</td>
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
                    history.replace('/entekhab/first')
                }}>ویرایش اطلاعات</button>
                <button className={'btn btn-primary'} onClick={()=>{
                    history.replace('/entekhab/pay')
                }}>تایید اطلاعات</button>
            </div>
        </div>
    </div>
}
