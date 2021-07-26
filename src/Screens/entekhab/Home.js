import React from "react";
import heroEntekhab from '../../assets/hero-entekhab.png'
import heroStart from '../../assets/hero-start.png'
import {Link} from "react-router-dom";
export default function Home({dispatch}){
    return <div>
        <div
            className="hero aos-init aos-animate">
            <div className="container p-5 d-flex align-items-center">
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center h-100" data-aos="fade-left">
                    <h2 className="hero-title">مشاوان تحصیلی</h2>
                    <h4 className="mt-3">موجی تازه در نرم‌افزار‌های آموزشی ایران</h4>
                    <h4 className="mt-3 font-weight-bold"> نرم افزار انتخاب رشته ۱۴۰۰</h4>
                    <div className="d-flex mt-4">
                        <a href="#start" className="btn btn-primary col-6 col-lg-5">شروع کنید!</a>
                    </div>
                </div>
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100"
                     data-aos="fade-right">
                    <img src={heroEntekhab} className="hero-img" alt=""/>
                </div>
            </div>
            <div className="counts" data-aos="fade-up">
                <div className="container aos-init aos-animate  w-100">
                    <div className="row gy-4 w-100 d-flex justify-content-center">
                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <div>
                                    <span data-purecounter-start="0" data-purecounter-end="232"
                                          data-purecounter-duration="0" className="purecounter">232</span>
                                    <p>کاربرانی که تاکنون از نرم‌افزار استفاده کرده‌اند</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <div>
                                    <span data-purecounter-start="0" data-purecounter-end="521"
                                          data-purecounter-duration="0" className="purecounter">521</span>
                                    <p>کاربرانی که در حال حاضر در حال انتخاب رشته هستند</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section id="start">
            <div className="container p-5 d-flex align-items-center">
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center h-100 text-center"
                     data-aos="fade-left">
                    <h2 className="hero-title my-5">شروع!</h2>
                    <Link to={'/entekhab/start-with-code'} className="btn btn-primary">کد اختصاصی ندارم</Link>
                    {/*<button className="btn btn-primary">کد اختصاصی ندارم</button>*/}
                    <button className="btn btn-secondary mt-4">قبلا کد اختصاصی دریافت کرده ام</button>
                </div>
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100"
                     data-aos="fade-right">
                    <img src={heroStart} className="" alt=""/>
                </div>
            </div>
        </section>
    </div>
}
