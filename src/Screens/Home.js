import React, {useState} from 'react'
import hero from '../assets/hero-img.png'
import Prediction from "../Components/Prediction";
import SpinnerLoading from "../Components/Spinner";
import SamandehiLogo from "../Components/Samandehi/SamandehiLogo";
import EnamadLogo from "../Components/Samandehi/EnamadLogo";

export default function Home({group,year}) {
    const [loading,setLoading] = useState(false)
    return <div className={'bg-main'}>
        <SpinnerLoading
            show={loading}/>
        <div className={' pb-4 d-flex flex-column container align-items-center'}>
            <div className={'d-flex justify-content-start w-100'}>
                <img className="d-block my-4" src='./logo.png' alt=""/>
            </div>
            <div className={'input-box d-flex w-100 mb-5 p-5 flex-column text-center bg-primary text-white'}>
                <h2>تخمین رتبه فقط
                    یک آگاهی حدودی از رتبه نیست</h2>
                <h4 className={'mt-5'}>تخمین رتبه سرآغاز تحلیل درست شرایط و نظم بخشیدن به افکار مزاحم، پراکنده، غلط و آشفته است</h4>
            </div>
            { group === 1 ?
                <div className={'input-box d-flex w-100 mb-5 p-5 flex-column text-center'}>
                    <h4 className={'mt-5'}>برای انتخاب رشته ارشد وزارت بهداشت از نرم افزار انتخاب رشته مرکز مشاوران تحصیلی استفاده کنید</h4>
                    <a target="_blank" href="https://apps.moshaveranetahsili.ir/%D9%86%D8%B1%D9%85-%D8%A7%D9%81%D8%B2%D8%A7%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D8%B4%D8%AA%D9%87-%D8%A8%D9%87%D8%AF%D8%A7%D8%B4%D8%AA-1400">نرم افزار انتخاب رشته ارشد وزارت بهداشت</a>
                </div>
            :
                <div className={'input-box d-flex w-100 mb-5 p-5 flex-column text-center'}>
                    <h4 className={'mt-5'}>برای انتخاب رشته ارشد وزارت علوم از نرم افزار انتخاب رشته مرکز مشاوران تحصیلی استفاده کنید</h4>
                    <a target="_blank" href="https://apps.moshaveranetahsili.ir/%D9%86%D8%B1%D9%85-%D8%A7%D9%81%D8%B2%D8%A7%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%B1%D8%B4%D8%AA%D9%87-%D8%B9%D9%84%D9%88%D9%85-1400">نرم افزار انتخاب رشته ارشد وزارت علوم</a>
                </div>
            }
            <div className={'input-box d-flex flex-wrap align-item-center justify-content-center py-5  mb-5 w-100'} >
                <div className="d-flex flex-column col-12 col-lg-6 align-self-center mt-3">
                    <Prediction setLoading={setLoading} group={group}/>
                </div>
                <div className="col-lg-6 col-12 d-none d-lg-flex">
                    <img src={hero} className="hero-img align-self-center"/>
                </div>
            </div>
            <div className="row w-100 justify-content-center">
                <div className="pt-4 pt-lg-0  d-flex flex-column">
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
            {group === 1 ?
                <div className="row w-100 justify-content-center">
                    <div className="pt-4 pt-lg-0  d-flex flex-column">
                            <div className={'input-box p-5 mb-5'}>

                                <h2 className="display-5 fw-bold mb-5  text-center">نرم‌افزار تخمین رتبه ارشد وزارت بهداشت</h2>
                                <div className=" mx-auto">
                                <ul className={'d-flex flex-wrap'}>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>در وزارت بهداشت، سقف تراز ۱۰۰ نمره است</li>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>درصدهای شما به صورت درس به درس، با بالاترین درصد زده شده در هر درس ترازدهی می‌شود</li>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>سقف تاثیر معدل، ۲۰ نمره است</li>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>تعداد کم داوطلبان سهمیه‌های ایثارگران، اهمیت رتبه کشوری آنها را بیشتر می‌کند</li>
                                </ul>
                                </div>
                            </div>
                    </div>
                </div>
            :
                <div className="row w-100 justify-content-center">
                    <div className="pt-4 pt-lg-0  d-flex flex-column">
                            <div className={'input-box p-5 mb-5'}>
                                <h2 className="display-5 fw-bold mb-5  text-center">نرم‌افزار تخمین رتبه ارشد وزارت علوم</h2>
                                <div className=" mx-auto">
                                <ul className={'d-flex flex-wrap'}>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>در وزارت علوم، سقف تراز ۱۰۰۰۰ نمره است</li>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>میانگین موزون درصدهای شما براساس بالاترین میانگین موزون در رشته شما، ترازدهی می‌شود</li>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>سقف تاثیر معدل، ۲۰۰۰ نمره است</li>
                                    <li className={'col-12 col-lg-6 mt-3 p-0'}>رتبه‌های سهمیه ایثارگران به تعداد داوطلبان آنها بستگی دارد</li>
                                </ul>
                                </div>
                            </div>
                    </div>
                </div>
            }

        {group === 1 ?
            <div className="row w-100 justify-content-center">
                <div className="pt-4 pt-lg-0  d-flex flex-column">
                        <div className={'input-box p-5 mb-5'}>
                            <h2 className="display-5 fw-bold mb-5  text-center">لیست رشته‌های وزارت بهداشت</h2>
                            <div className=" mx-auto">
                              <ul className={'d-flex flex-wrap'}>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a2%d9%85%d8%a7%d8%b1-%d8%b2%db%8c%d8%b3%d8%aa%db%8c-1400/">تخمین رتبه ارشد آمار زیستی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d9%be%db%8c%d8%af%d9%85%db%8c%d9%88%d9%84%d9%88%da%98%db%8c-1400/">تخمین رتبه ارشد اپیدمیولوژی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d8%b1%d8%b2%db%8c%d8%a7%d8%a8%db%8c-%d9%81%d9%86%d8%a7%d9%88%d8%b1%db%8c-%d8%b3%d9%84%d8%a7%d9%85%d8%aa-1400/">تخمین رتبه ارشد ارزیابی فناوری سلامت (HTA)</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d8%b1%da%af%d9%88%d9%86%d9%88%d9%85%db%8c-1400/">تخمین رتبه ارشد ارگونومی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d8%b9%d8%b6%d8%a7%db%8c-%d9%85%d8%b5%d9%86%d9%88%d8%b9%db%8c-1400/">تخمین رتبه ارشد اعضای مصنوعی و وسایل کمکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d9%82%d8%aa%d8%b5%d8%a7%d8%af-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-1400/">تخمین رتبه ارشد اقتصاد بهداشت</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%da%a9%d9%88%d9%84%d9%88%da%98%db%8c-%d8%a7%d9%86%d8%b3%d8%a7%d9%86%db%8c-1400/">تخمین رتبه ارشد اکولوژی انسانی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d9%86%d9%81%d9%88%d8%b1%d9%85%d8%a7%d8%aa%db%8c%da%a9-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد انفورماتیک پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d9%86%da%af%d9%84-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد انگل شناسی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%db%8c%d9%85%d9%86%db%8c-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-1400/">تخمین رتبه ارشد ایمنی شناسی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a2%d9%85%d9%88%d8%b2%d8%b4-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-1400/">تخمین رتبه ارشد آموزش بهداشت و ارتقاء سلامت</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a2%d9%85%d9%88%d8%b2%d8%b4-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد آموزش پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a2%d9%85%d9%88%d8%b2%d8%b4-%d9%87%d9%88%d8%b4%d8%a8%d8%b1%db%8c-1400/">تخمین رتبه ارشد آموزش هوشبری</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-%d9%85%d8%ad%db%8c%d8%b7-1400/">تخمین رتبه ارشد بهداشت محیط</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-%d9%85%d9%88%d8%a7%d8%af-%d8%ba%d8%b0%d8%a7%db%8c%db%8c-1400/">تخمین رتبه ارشد بهداشت و ایمنی مواد غذایی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a8%db%8c%d9%86%d8%a7%db%8c%db%8c-%d8%b3%d9%86%d8%ac%db%8c-1400/">تخمین رتبه ارشد بینایی سنجی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a8%db%8c%d9%88%d8%a7%d9%84%da%a9%d8%aa%d8%b1%db%8c%da%a9-1400/">تخمین رتبه ارشد بیوالکتریک</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a8%db%8c%d9%88%d8%aa%da%a9%d9%86%d9%88%d9%84%d9%88%da%98%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد بیوتکنولوژی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a8%db%8c%d9%88%d8%b4%db%8c%d9%85%db%8c-%d8%a8%d8%a7%d9%84%db%8c%d9%86%db%8c-1400/">تخمین رتبه ارشد بیوشیمی بالینی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%a9%d9%86%d8%aa%d8%b1%d9%84-%d9%86%d8%a7%d9%82%d9%84%db%8c%d9%86-%d8%a8%db%8c%d9%85%d8%a7%d8%b1%db%8c%d9%87%d8%a7-14/">تخمین رتبه ارشد بیولوژی و کنترل ناقلین بیماریها</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d9%87%d9%86%d8%af%d8%b3%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-%d8%b2%db%8c%d8%b3%d8%aa-%d9%85%d9%88%d8%a7%d8%af14/">تخمین رتبه ارشد بیومواد</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%be%d8%af%d8%a7%d9%81%d9%86%d8%af-%d8%ba%db%8c%d8%b1-%d8%b9%d8%a7%d9%85%d9%84-1400/">تخمین رتبه ارشد پدافند غیرعامل در نظام سلامت</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%be%d8%b1%d8%b3%d8%aa%d8%a7%d8%b1%db%8c-1400/">تخمین رتبه ارشد پرستاری</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%aa%d8%a7%d8%b1%db%8c%d8%ae-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد تاریخ علوم پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b7%d8%a8%db%8c%d8%b9%db%8c-%d8%af%d8%a7%d8%b1%d9%88%db%8c%db%8c-%d8%af%d8%b1%db%8c%d8%a7%db%8c%db%8c-1400/">تخمین رتبه ارشد ترکیبات طبیعی و دارویی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%aa%d8%ba%d8%b0%db%8c%d9%87-1400/">تخمین رتبه ارشد تغذیه</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%a7%d8%aa%d8%a7%d9%82-%d8%b9%d9%85%d9%84-1400/">تخمین رتبه ارشد تکنولوژی اتاق عمل</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%aa%da%a9%d9%86%d9%88%d9%84%d9%88%da%98%db%8c-%da%af%d8%b1%d8%af%d8%b4-%d8%ae%d9%88%d9%86-1400/">تخمین رتبه ارشد تکنولوژی گردش خون (پرفیوژن)</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%b1%d9%88%d8%a7%d9%86%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d8%a8%d8%a7%d9%84%db%8c%d9%86%db%8c-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-1400/">تخمین رتبه ارشد روانشناسی بالینی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%98%d9%86%d8%aa%db%8c%da%a9-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد ژنتیک انسانی (پزشکی)</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%98%d9%88%d8%b1%d9%86%d8%a7%d9%84%db%8c%d8%b3%d9%85-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد ژورنالیسم پزشکی (سلامت و رسانه)</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b3%d9%84%d8%a7%d9%85%d8%aa-%d8%b3%d8%a7%d9%84%d9%85%d9%86%d8%af%db%8c-1400/">تخمین رتبه ارشد سلامت سالمندی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b3%d9%84%d8%a7%d9%85%d8%aa-%d9%88-%d8%aa%d8%b1%d8%a7%d9%81%db%8c%da%a9-1400/">تخمین رتبه ارشد سلامت و ترافیک</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b3%d9%84%d8%a7%d9%85%d8%aa-%d9%88-%d8%b1%d9%81%d8%a7%d9%87-%d8%a7%d8%ac%d8%aa%d9%85%d8%a7%d8%b9%db%8c-1400/">تخمین رتبه ارشد سلامت و رفاه اجتماعی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b3%d9%85-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد سم شناسی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b4%d9%86%d9%88%d8%a7%db%8c%db%8c-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-1400/">تخمین رتبه ارشد شنوایی شناسی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b4%db%8c%d9%85%db%8c-%d8%af%d8%a7%d8%b1%d9%88%db%8c%db%8c-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-1400/">تخمین رتبه ارشد شیمی دارویی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b9%d9%84%d9%88%d9%85-%d8%aa%d8%b4%d8%b1%db%8c%d8%ad%db%8c-1400/">تخمین رتبه ارشد علوم تشریحی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%b5%d9%86%d8%a7%db%8c%d8%b9-%d8%ba%d8%b0%d8%a7%db%8c%db%8c-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-1400/">تخمین رتبه ارشد علوم و صنایع غذایی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%81%d9%86%d8%a7%d9%88%d8%b1%db%8c-%d8%a7%d8%b7%d9%84%d8%a7%d8%b9%d8%a7%d8%aa-%d8%b3%d9%84%d8%a7%d9%85%d8%aa-1400/">تخمین رتبه ارشد فناوری اطلاعات سلامت</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d8%aa%d8%b5%d9%88%db%8c%d8%b1%d8%a8%d8%b1%d8%af%d8%a7%d8%b1%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد فناوری تصویربرداری پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%81%db%8c%d8%b2%db%8c%da%a9-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد فیزیک پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%81%db%8c%d8%b2%db%8c%d9%88%d8%aa%d8%b1%d8%a7%d9%be%db%8c-1400/">تخمین رتبه ارشد فیزیوتراپی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%81%db%8c%d8%b2%db%8c%d9%88%d9%84%d9%88%da%98%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد فیزیولوژی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%82%d8%a7%d8%b1%da%86-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد قارچ شناسی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%a9%d8%a7%d8%b1-%d8%af%d8%b1%d9%85%d8%a7%d9%86%db%8c-1400/">تخمین رتبه ارشد کاردرمانی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%a9%d8%aa%d8%a7%d8%a8%d8%af%d8%a7%d8%b1%db%8c-%d9%88-%d8%a7%d8%b7%d9%84%d8%a7%d8%b9-%d8%b1%d8%b3%d8%a7%d9%86%db%8c/">تخمین رتبه ارشد کتابداری و اطلاع رسانی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%a9%d9%86%d8%aa%d8%b1%d9%84-%d9%85%d9%88%d8%a7%d8%af-%d8%ae%d9%88%d8%b1%d8%a7%da%a9%db%8c-1400/">تخمین رتبه ارشد کنترل مواد خوراکی و آشامیدنی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%da%af%d9%81%d8%aa%d8%a7%d8%b1-%d8%af%d8%b1%d9%85%d8%a7%d9%86%db%8c-1400/">تخمین رتبه ارشد گفتار درمانی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d8%a7%d9%85%d8%a7%db%8c%db%8c-1400/">تخمین رتبه ارشد مامایی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d8%af%d8%af%da%a9%d8%a7%d8%b1%db%8c-%d8%a7%d8%ac%d8%aa%d9%85%d8%a7%d8%b9%db%8c-1400/">تخمین رتبه ارشد مددکاری اجتماعی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d8%af%db%8c%d8%b1%db%8c%d8%aa-%d8%aa%d9%88%d8%a7%d9%86%d8%a8%d8%ae%d8%b4%db%8c-1400/">تخمین رتبه ارشد مدیریت توانبخشی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d8%af%db%8c%d8%b1%db%8c%d8%aa-%d8%ae%d8%af%d9%85%d8%a7%d8%aa-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa%db%8c-1400/">تخمین رتبه ارشد مدیریت خدمات بهداشتی و درمانی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d8%af%db%8c%d8%b1%db%8c%d8%aa-%d8%b3%d9%84%d8%a7%d9%85%d8%aa%d8%8c-%d8%a7%db%8c%d9%85%d9%86%db%8c-%d9%88-%d9%85/">تخمین رتبه ارشد مدیریت سلامت، ایمنی و محیط زیست (HSE)</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%d9%87%d9%86%d8%af%d8%b3%db%8c-%d8%a8%d9%87%d8%af%d8%a7%d8%b4%d8%aa-%d8%ad%d8%b1%d9%81%d9%87-%d8%a7%db%8c-1400/">تخمین رتبه ارشد مهندسی بهداشت حرفه ای</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%db%8c%da%a9%d8%b1%d9%88%d8%a8-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d8%ba%d8%b0%d8%a7%db%8c%db%8c1400/">تخمین رتبه ارشد میکروب شناسی مواد غذایی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%85%db%8c%da%a9%d8%b1%d9%88%d8%a8-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد میکروبیولوژی پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%86%d8%a7%d9%86%d9%88%d8%aa%da%a9%d9%86%d9%88%d9%84%d9%88%da%98%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد نانوفناوری پزشکی</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%87%d9%85%d8%a7%d8%aa%d9%88%d9%84%d9%88%da%98%db%8c-%d8%ae%d9%88%d9%86-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-1400/">تخمین رتبه ارشد هماتولوژی (خون شناسی)</a></div>
                                <div className={'col-12 col-lg-6 mt-3 p-0'}><a target="_blank" href="https://moshaveranetahsili.ir/%d8%aa%d8%ae%d9%85%db%8c%d9%86-%d8%b1%d8%aa%d8%a8%d9%87-%d8%a7%d8%b1%d8%b4%d8%af-%d9%88%db%8c%d8%b1%d9%88%d8%b3-%d8%b4%d9%86%d8%a7%d8%b3%db%8c-%d9%be%d8%b2%d8%b4%da%a9%db%8c-1400/">تخمین رتبه ارشد ویروس شناسی پزشکی</a></div>

                              </ul>
                            </div>
                        </div>
                </div>
            </div>
        :
            <div></div>
        }
        </div>
        <div className={'w-100 d-flex justify-content-center mt-4'}>
            <SamandehiLogo
                 // optional true | false
                sid="249476"
                sp="uiwkaodspfvlaodsjyoegvka"
            />
            <EnamadLogo/>
        </div>

    </div>
}
