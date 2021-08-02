import React from "react";
import heroEntekhab from '../../assets/hero-entekhab.png'
import heroStart from '../../assets/hero-start.png'
import {Link} from "react-router-dom";
import SamandehiLogo from "../../Components/Samandehi/SamandehiLogo";
import EnamadLogo from "../../Components/Samandehi/EnamadLogo";
export default function Home({dispatch}){
    return <div l>
        <div
            className="hero d-flex align-items-center">
            <div className="container p-lg-5 pt-5 d-flex flex-column flex-lg-row align-items-center">
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-content-center my-3 h-100">
                    <h2 className="hero-title">مشاوان تحصیلی</h2>
                    <h5 className="mt-3">موجی تازه در نرم‌افزار‌های آموزشی ایران</h5>
                    <h5 className="mt-3 font-weight-bold"> نرم افزار انتخاب رشته ۱۴۰۰</h5>
                    <div className="d-flex align-items-center flex-lg-row flex-column my-4">
                        <Link to={'/entekhab/start-without-code'} className="btn btn-primary">شروع</Link>
                        <p className={'m-0 mx-3'}>یا</p>
                        <Link to={'/entekhab/start-with-code'}  className="btn btn-secondary">قبلا کد اختصاصی دریافت کرده ام</Link>
                    </div>
                </div>
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100">
                    <img src={heroEntekhab} className="w-100" alt=""/>
                </div>
            </div>
            {/*<div className="counts" data-aos="fade-up">*/}
            {/*    <div className="container aos-init aos-animate  w-100">*/}
            {/*        <div className="row gy-4 w-100 d-flex justify-content-center">*/}
            {/*            <div className="col-lg-3 col-md-6">*/}
            {/*                <div className="count-box">*/}
            {/*                    <div>*/}
            {/*                        <span data-purecounter-start="0" data-purecounter-end="232"*/}
            {/*                              data-purecounter-duration="0" className="purecounter">232</span>*/}
            {/*                        <p>کاربرانی که تاکنون از نرم‌افزار استفاده کرده‌اند</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-lg-3 col-md-6">*/}
            {/*                <div className="count-box">*/}
            {/*                    <div>*/}
            {/*                        <span data-purecounter-start="0" data-purecounter-end="521"*/}
            {/*                              data-purecounter-duration="0" className="purecounter">521</span>*/}
            {/*                        <p>کاربرانی که در حال حاضر در حال انتخاب رشته هستند</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
        <div className="container p-lg-5">
            <h1 className="hero-title my-۳ text-center w-100">عنوان بخش</h1>
            <h3 className="my-5 text-center w-100">ویژگی‌ها</h3>
            <div className={'d-flex flex-column flex-lg-row flex-lg-wrap'}>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={heroEntekhab} className="img-fluid" alt=""/>
                            <h3>ویژگی شماره ۱</h3>
                            <p>لورم متنننننننننننننن</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={heroEntekhab} className="img-fluid" alt=""/>
                        <h3>ویژگی شماره ۱</h3>
                        <p>لورم متنننننننننننننن</p>
                    </div>
                </div>

                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={heroEntekhab} className="img-fluid" alt=""/>
                        <h3>ویژگی شماره ۱</h3>
                        <p>لورم متنننننننننننننن</p>
                    </div>
                </div>
            </div>
            <div className={'d-flex justify-content-center mt-5'}>
                <div className="col-lg-6 col-12">
                    <div className="box">
                        <img src={heroEntekhab} className="img-fluid" alt=""/>
                        <h3>ویدیوی استفاده از نرم‌افزار</h3>
                        <p>لورم متنننننننننننننن</p>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-5">
                <div className="box p-0 p-lg-5">
                   <ul className={'d-flex flex-wrap'}>
                       <li className={'col-6 col-lg-4 mt-2'}>
                           <a href="">انتخاب رشته ارشد کامپیوتر</a>
                       </li>
                       <li className={'col-6 col-lg-4 mt-2'}>
                           <a href="">انتخاب رشته ارشد کامپیوتر</a>
                       </li>
                       <li className={'col-6 col-lg-4 mt-2'}>
                           <a href="">انتخاب رشته ارشد کامپیوتر</a>
                       </li>
                       <li className={'col-6 col-lg-4 mt-2'}>
                           <a href="">انتخاب رشته ارشد کامپیوتر</a>
                       </li>
                       <li className={'col-6 col-lg-4 mt-2'}>
                           <a href="">انتخاب رشته ارشد کامپیوتر</a>
                       </li>
                   </ul>
                </div>
            </div>
            <div className={'d-flex flex-lg-row flex-column'}>
                <div className={'col-12 col-lg-8'}>
                    <ul className={'d-flex flex-wrap list-unstyled text-center'}>
                        <li className={'col-6 col-lg-4 mt-5'}>
                            <a href="">دانلود دفترچه انتخاب رشته</a>
                        </li>
                        <li className={'col-6 col-lg-4 mt-5'}>
                            <a href="">درباره‌ما</a>
                        </li>
                        <li className={'col-6 col-lg-4 mt-5'}>
                            <a href="">تماس با ما</a>
                        </li>
                        <li className={'col-6 col-lg-4 mt-5'}>
                            <a href="">قوانین و مقررات</a>
                        </li>
                    </ul>
                </div>
                <div className={'col-12 col-lg-4'}>
                    <div className={'w-100 d-flex justify-content-center mt-4'}>
                        <SamandehiLogo
                            // optional true | false
                            sid="249476"
                            sp="uiwkaodspfvlaodsjyoegvka"
                        />
                        <EnamadLogo/>
                    </div>
                </div>
            </div>
            <div className={'text-center input-box bg-secondary text-white mt-5 p-2'}>
                <p className={'m-0'}>تمامی حقوق نرم‌افزار انتخاب رشته ارشد ۱۴۰۰ متعلق به وب سایت مشاوران تحصیلی است</p>
            </div>
        </div>
    </div>
}
