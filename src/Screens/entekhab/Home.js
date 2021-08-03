import React from "react";
import heroEntekhab from '../../assets/hero-entekhab.png'
import heroStart from '../../assets/hero-start.png'
import {Link} from "react-router-dom";
import SamandehiLogo from "../../Components/Samandehi/SamandehiLogo";
import EnamadLogo from "../../Components/Samandehi/EnamadLogo";
import analyze from '../../assets/analyze.png'
import dice from '../../assets/dice.png'
import dice2 from '../../assets/dice2.png'
import search from '../../assets/search.png'
import priority from '../../assets/priority.png'
import priority2 from '../../assets/priority2.png'
import routes from "./routes";

export default function Home({dispatch,getUrl}){
    return <div>
        <div
            className="hero d-flex align-items-center">
            <div className="container p-lg-5 pt-5 d-flex flex-column flex-lg-row align-items-center">
                <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-content-center my-3 h-100">
                    <h2 className="hero-title">مشاوران تحصیلی</h2>
                    <h5 className="mt-3">موجی تازه در نرم‌افزار‌های آموزشی ایران</h5>
                    <h5 className="mt-3 font-weight-bold"> نرم افزار انتخاب رشته ۱۴۰۰</h5>
                    <div className=" my-4">
                        <Link to={getUrl(routes.startWithoutCode)} className="btn btn-primary">شروع کنید</Link>
                        <p className={'m-0 my-3'}>یا</p>
                        <Link to={getUrl(routes.startWithCode)}  className="btn btn-secondary">با کد اختصاصی که قبلا از نرم افزار دریافت کرده اید وارد شوید</Link>
                    </div>
                </div>
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center h-100">
                    <img src={heroEntekhab} className="w-100" alt=""/>
                </div>
            </div>
        </div>
        <div className="container p-lg-5">
            <h1 className="hero-title my-۳ text-center w-100">عنوان بخش</h1>
            <h3 className="my-5 text-center w-100">ویژگی‌ها</h3>
            <div className={'d-flex flex-column flex-lg-row flex-lg-wrap'}>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={analyze} className="img-fluid" alt=""/>
                            <h3>آنالیز دقیق</h3>
                            <p>آنالیز دقیق شانس قبولی با دقتی بیش از 98 درصد براساس سهمیه و رتبه</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={dice} className="img-fluid" alt=""/>
                        <h3>تعیین شانس قبولی</h3>
                        <p>تعیین شانس قبولی در 4 سطح قطعی، پراحتمال، خوشبینانه و کم احتمال</p>
                    </div>
                </div>

                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={dice2} className="img-fluid" alt=""/>
                        <h3>مشخص کردن احتمال قبولی</h3>
                        <p>مشخص کردن احتمال قبولی در تمامی کد رشته های دفترچه انتخاب رشته</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={search} className="img-fluid" alt=""/>
                        <h3>جستجوی آسان</h3>
                        <p>جستجوی آسان براساس نوع دوره دانشگاهی، استان ها و رشته-گرایش</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={priority} className="img-fluid" alt=""/>
                        <h3>اولویت بندی صحیح</h3>
                        <p>اولویت بندی صحیح بر مبنای اعتبار، کیفیت و رنگینگ دانشگاه ها</p>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mt-3">
                    <div className="box">
                        <img src={priority2} className="img-fluid" alt=""/>
                        <h3>اولویت بندی دقیق</h3>
                        <p>اولویت بندی دقیق براساس کیفیت گرایش در بازار کار و امکان ادامه تحصیل</p>
                    </div>
                </div>
            </div>
            {/*<div className={'d-flex justify-content-center mt-5'}>*/}
            {/*    <div className="col-lg-6 col-12">*/}
            {/*        <div className="box">*/}
            {/*            <video className={'w-100'} width="400" controls>*/}
            {/*                <source src="mov_bbb.mp4" type="video/mp4"/>*/}
            {/*            </video>*/}
            {/*            <h3>ویدیوی استفاده از نرم‌افزار</h3>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
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
