import React from "react";
import Info from "./entekhab/Components/Info";
export default function Lock(){
    return <div className={'d-flex flex-column justify-content-center align-items-center'}>
        <div className={'box p-lg-5 p-2 pt-5 mb-3 w-100 d-flex flex-column align-items-center'}>
        <Info className="m-4" text={'به محض اعلام نتایج نرم افزار انتخاب رشته در دسترس قرار می گیرد'}/>
        </div>
        <div className="col-lg-6 col-12 d-none d-lg-flex">
            <img className={'img-fluid'} src={'../wait.jpg'} alt=""/>
        </div>
    </div>
}
