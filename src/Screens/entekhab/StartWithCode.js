import React from "react";
import hero from "../../assets/hero-login.png";
import {Link} from "react-router-dom";

export default function StartWithCode({dispatch}){
    return <div className="container p-5 d-flex align-items-center">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center h-100 text-center align-items-center"
             data-aos="fade-left">
            <h2 className="hero-title my-5">شروع با کد اختصاصی</h2>

            <div className={'d-flex flex-column col-12 col-lg-8'}>
                <label htmlFor="">
                    کد اختصاصی خود را وارد کنید
                    <input type="text" className={'form-control'}/>
                </label>
                <label htmlFor="">
                    کد امنیتی را وارد کنید
                    <input type="text" className={'form-control'}/>
                </label>
                <button className={'btn btn-primary'}>مرحله بعد</button>
            </div>
            <div className={'alert alert-secondary mt-3 d-flex flex-column col-12 col-lg-8'}>
                <p>اگر کد اختصاصی نرم افزار انتخاب رشته را دریافت نکرده‌اید از دکمه زیر شروع کنید.</p>
                <Link to={'/entekhab/start-without-code'} className={'btn btn-secondary'}>دریافت کد اختصاصی نرم افزار</Link>
            </div>
        </div>
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100"
             data-aos="fade-right">
            <img src={hero} className="w-100" alt=""/>
        </div>
    </div>
}
