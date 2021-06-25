import React, {useEffect, useState} from 'react'
import hero from '../assets/hero-img.png'
import Prediction from "../Components/Prediction";
import SpinnerLoading from "../Components/Spinner";

export default function Home() {
    const parentEndRef = React.createRef()
    const [loading,setLoading] = useState(false)
    return <div className={'bg-main'}>
        <SpinnerLoading
            show={loading}/>
        <div className={' pb-4 d-flex flex-column container align-items-center'}>
            <div className="row w-100 justify-content-center">
                <div className="pt-4 pt-lg-0  d-flex flex-column">
                        <img className="d-block mx-auto mb-2" src="/logo.svg" alt="" width="172"
                             height="157"/>
                        <div className={'input-box p-5 mb-5'}>
                            <h2 className="display-5 fw-bold mb-5  text-center">مهمترین عوامل در دقت و صحت تخمین رتبه</h2>
                            <div className=" mx-auto">
                              <ul className={'d-flex flex-wrap'}>
                                   <li className={'col-12 col-lg-6 mt-3 p-0'}>تعداد زیاد داده‌ها</li>
                                  <li className={'col-12 col-lg-6 mt-3 p-0'}>پیاده‌سازی دقیق فرمول‌های ترازدهی، رتبه‌بندی و تاثیر معدل</li>
                                 <li className={'col-12 col-lg-6 mt-3 p-0'}>نوع سهمیه ( آزاد، ایثارگری ۵ درصد و ۲۵ درصد )</li>
                                 <li className={'col-12 col-lg-6 mt-3 p-0'}>مقایسه تفاوت درصدها و سطح سوالات به‌صورت سال به سال (۵ سال اخیر)</li>
                              </ul>
                            </div>
                        </div>
                </div>
            </div>
            <div className={'input-box d-flex flex-wrap w-100 mb-5 p-5'}>
                <div className={'col-12 col-lg-6 border-right-responsive'}>
                    <h4 className={'text-center'}>نرم‌افزار تخمین رتبه ارشد وزارت علوم</h4>
                    <ul className={'d-flex flex-wrap'}>
                        <li className={'col-12 col-lg-6 mt-3 p-0'}>
                            در وزارت علوم، سقف تراز 10.000 نمره است.
                        </li>
                        <li className={'col-12 col-lg-6  mt-3'}>
                            میانگین موزون درصدهای شما براساس بالاترین میانگین موزون در رشته شما، ترازدهی می‌شود.
                        </li>
                        <li className={'col-12 col-lg-6  mt-3'}>
                            سقف تاثیر معدل، 2000 نمره است.
                        </li>
                        <li className={'col-12 col-lg-6 mt-3 p-0'}>
                            رتبه‌های سهمیه ایثارگران به تعداد داوطلبان آنها بستگی دارد.
                        </li>
                    </ul>
                </div>
                <div className={'col-12 col-lg-6 mt-lg-0 mt-5'}>
                    <h4 className={'text-center'}>نرم‌افزار تخمین رتبه ارشد وزارت علوم</h4>
                    <ul  className={'d-flex flex-wrap'}>
                        <li className={'col-12 col-lg-6 mt-3 p-0'}>
                            در وزارت بهداشت، سقف تراز ۱۰۰ نمره است.
                        </li>
                        <li className={'col-12 col-lg-6 mt-3 p-0'}>
                            درصدهای شما به صورت درس به درس، با بالاترین درصد زده شده در هر درس ترازدهی می‌شود.
                        </li>
                        <li className={'col-12 col-lg-6 mt-3 p-0'}>
                            سقف تاثیر معدل، ۲۰ نمره است.
                        </li>
                        <li className={'col-12 col-lg-6 mt-3 p-0'}>
                            تعداد کم داوطلبان سهمیه‌های ایثارگران، اهمیت رتبه کشوری آنها را بیشتر می‌کند.
                        </li>
                    </ul>
                </div>
            </div>
            <div className={'input-box d-flex w-100 mb-5 p-5 flex-column text-center bg-primary text-white'}>
                <h2>تخمین رتبه فقط یک آگهی حدودی از رتبه نیست</h2>
                <h4 className={'mt-5'}>تخمین رتبه سرآغاز تحلیل درست شرایط و نظم بخشیدن به افکار مزاحم، پراکنده، غلط و آشفته است</h4>
            </div>
            <div className={'input-box d-flex flex-wrap align-item-center justify-content-center py-5  mb-5 w-100'}  ref={parentEndRef}>
                <div className="d-flex flex-column col-12 col-lg-6 align-self-center mt-3">
                    <Prediction parentEndRef={parentEndRef} setLoading={setLoading}/>
                </div>
                <div className="col-lg-6 col-12 d-none d-lg-flex">
                    <img src={hero} className="hero-img align-self-center"/>
                </div>
            </div>
            <div className={'input-box d-flex flex-wrap w-100 p-5'}>
                <div className={'col-12 col-lg-6 border-right-responsive'}>
                    <h4 className={'text-center'}>لیست رشته‌های وزارت علوم</h4>
                    <ol className={'d-flex flex-column align-items-center text-center'}>
                        <li className={'mt-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                    </ol>
                </div>
                <div className={'col-12 col-lg-6 mt-lg-0 mt-5'}>
                    <h4 className={'text-center'}>نرم‌افزار تخمین رتبه ارشد وزارت بهداشت</h4>
                    <ol className={'d-flex flex-column align-items-center text-center'}>
                        <li className={'mt-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
}
