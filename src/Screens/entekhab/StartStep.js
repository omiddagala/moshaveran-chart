import React from "react";
export default function StartStep(){
    return <div className={'bg-name'}>
        <div className={' pb-4 d-flex flex-column container align-items-center'}>
            <img className="d-block my-4" src='./logo.png' alt=""/>
            <div className="row w-100 justify-content-center w-100">
                <div className={'input-box p-5 mb-5 w-100 d-flex flex-column align-items-center'}>
                    <h2 className="display-5 fw-bold mb-5  text-center">نرم‌ افزار انتخاب رشته مشاوران تحصیلی</h2>
                    <div className={'d-flex'}>
                        <div className={'col-12 col-lg-6 bg-info text-white rounded p-2 d-flex flex-column justify-content-center'}>
                            <p className={'font-weight-bold'}>داوطلب عزیز</p>
                            <p>کد روبرو، کد اختصاصی شما در نرم افزار انتخاب رشته است.کد را در جایی یادداشت کنید و یا با وارد کردن شماره موبایل، اجازه دهید تا کد را برای شما پیامک کنیم.</p>
                        </div>
                        <div className={'col-12 col-lg-6'}>
                            <div className={'d-flex flex-column align-items-center'}>
                                <div className={'col-6 d-flex w-100'}>
                                    <input type="text" className={'form-control'} value={123456}/>
                                    <button className={'btn btn-primary mx-1'}>کپی</button>
                                </div>
                                <div className={'col-6 mt-3'}>
                                    <input type="text" className={'form-control'} placeholder={'شماره موبایل'}/>
                                </div>
                                <p className={'alert alert-info mt-3'}>با وارد کردن شماره موبایل، کد اختصاصی نرم افزار انتخاب رشته برای شما پیامک می‌شود.</p>
                                <button className={'btn btn-primary'}>مرحله بعد</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'input-box d-flex w-100 p-5 mt-5 bg-secondary justify-content-around'}>
                <h5 className={'m-0 text-white text-center'}>تمامی حقوق نرم افزار انتخاب رشته ارشد 1400 متعلق به سایت مشاوران تحصیلی است.</h5>
            </div>
        </div>
    </div>
}
