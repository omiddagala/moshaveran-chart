import React from "react";

export default function StartWithCode({dispatch}){
    return <div className="row w-100 justify-content-center w-100">
        <div className="input-box p-5 mb-5 w-100 d-flex flex-column align-items-center">
            <h2 className="display-5 fw-bold text-center h3">نرم‌ افزار انتخاب رشته ارشد 1400 مشاوران تحصیلی</h2>
        </div>
            <div className={'input-box p-5 mb-3 w-100 d-flex flex-column align-items-center'}>
                <div className={'d-flex flex-column'}>
                    <label htmlFor="">
                        کد اختصاصی خود را وارد کنید
                        <input type="text" className={'form-control'}/>
                    </label>
                    <label htmlFor="">
                        کد امنیتی را وارد کنید
                        <input type="text" className={'form-control'}/>
                    </label>
                    <button className={'btn btn-primary'}>ورود</button>
                </div>
                <div className={'alert alert-secondary mt-3 d-flex flex-column'}>
                    <p>اگر کد اختصاصی نرم افزار انتخاب رشته را دریافت نکرده‌اید از دکمه زیر شروع کنید.</p>
                    <button className={'btn btn-secondary'}>دریافت کد اختصاصی نرم افزار</button>
                </div>

            </div>
        </div>
}
