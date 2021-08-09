import React from "react";
import {useHistory} from "react-router-dom";
import routes from "../routes";
export default function Header({code,getUrl,group}){
    const history = useHistory()
    return   <div>
        <h2 className={'hero-title my-4 text-center'}>مشاوران تحصیلی</h2>
        <h5 className={'text-center mb-5'}>نرم افزار انتخاب رشته وزارت
            {group === 1 ?' بهداشت ':' علوم '}
            ۱۴۰۰</h5>
        <div className={'d-flex justify-content-between my-2'}>
            <h5 className={'badge badge-secondary badge-code'}> کد اختصاصی:{code}</h5>
            <button className={'btn btn-danger'} onClick={()=>{
                history.push(getUrl(routes.home))
            }}>خروج</button>
        </div>
    </div>
}
