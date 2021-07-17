import React from "react";
import hero from "../assets/hero-img.png";
import {numberWithCommas} from "../HelperFunction";
import SamandehiLogo from "../Components/Samandehi/SamandehiLogo";
import EnamadLogo from "../Components/Samandehi/EnamadLogo";
export default function EntekhabReshteh(){
    return <div className={'bg-name'}>
        <div className={' pb-4 d-flex flex-column container align-items-center'}>
                <img className="d-block my-4" src='./logo.png' alt=""/>
            <div className={'input-box d-flex w-100 mb-5 p-5 flex-column text-center bg-gradient text-white '}>
                <h2 className={'font-weight-bold'}>مشاوران تحصیلی</h2>
                <h4 className={'mt-3'}>موجی تازه در نرم افزارهای آموزشی ایران</h4>
                <h4 className={'mt-3 font-weight-bold'}>نرم افزار انتخاب رشته 1400</h4>
                <div className={'d-flex flex-lg-row flex-column justify-content-around mt-4'}>
                    <div className={'input-box bg-white p-4 d-flex flex-column justify-content-center text-dark mb-3 mb-lg-0'}>
                        <p className={'m-0'}>کابرانی که تاکنون از نرم افزار استفاده کرده‌اند</p>
                        <br/>
                        <h3 className={'m-0 font-weight-bold'}>{numberWithCommas(125000)}</h3>
                    </div>
                    <div className={'input-box bg-white p-4 d-flex flex-column justify-content-center text-dark '}>
                        <p className={'m-0'}>کابرانی که تاکنون از نرم افزار استفاده کرده‌اند</p>
                        <br/>
                        <h3 className={'m-0 font-weight-bold'}>{numberWithCommas(125000)}</h3>
                    </div>
                </div>
                <div className={'d-flex flex-column align-items-center mt-4'}>
                    <button className={'btn btn-light col-12 col-lg-2 font-weight-bold'}>
                        <h3 className={'m-0'}>شروع کنید</h3>
                    </button>
                    <h3 className={'my-3'}>یا</h3>
                    <button className={'btn btn-light col-12 col-lg-6'}>با کد اختصاصی که قبلا از نرم‌افزار دریافت کرده‌اید وارد شوید</button>
                </div>
            </div>
            <div className="row w-100 justify-content-center w-100">
                    <div className={'input-box p-5 mb-5 w-100 d-flex flex-column align-items-center'}>
                        <h2 className="display-5 fw-bold mb-5  text-center">نرم‌ افزار انتخاب رشته مشاوران تحصیلی</h2>
                        <h3 className="display-5 fw-bold mb-5  text-center">ویژگی‌ها</h3>
                        <div className="d-flex justify-content-around flex-wrap w-100">
                            <div className={'col-12 col-lg-4 p-2'}>
                                <div className={'property-rounded border border-primary text-center p-2'}>
                                    <h4 className={'text-primary'}>ویژگی</h4>
                                    <img className={'img-rounded w-100 p-2'} src="https://picsum.photos/150" alt=""/>
                                </div>
                            </div>

                            <div className={'col-12 col-lg-4 p-2'}>
                                <div className={'property-rounded border border-primary text-center p-2'}>
                                    <h4 className={'text-primary'}>ویژگی</h4>
                                    <img className={'img-rounded w-100 p-2'} src="https://picsum.photos/150" alt=""/>
                                </div>
                            </div>
                            <div className={'col-12 col-lg-4 p-2'}>
                                <div className={'property-rounded border border-primary text-center p-2'}>
                                    <h4 className={'text-primary'}>ویژگی</h4>
                                    <img className={'img-rounded w-100 p-2'} src="https://picsum.photos/150" alt=""/>
                                </div>
                            </div>

                        </div>
                        <div className={'property-rounded border border-secondary text-center p-2 col-6 mt-4'}>
                            <h4 className={'text-secondary'}>ویدیو استفاده از نرم افزار</h4>
                            <video className={'img-rounded w-100 p-2'} width="320" height="240" controls>
                                <source src="https://static.cdn.asset.aparat.com/avt/35419313_15s.mp4" type="video/mp4"/>
                            </video>
                            {/*<video className={'img-rounded w-100 p-2'} src="https://static.cdn.asset.aparat.com/avt/35419313_15s.mp4"></video>*/}
                        </div>
                </div>
            </div>
            <div className={'input-box d-flex flex-wrap w-100 p-5'}>
                    <ul className={'d-flex align-items-center text-center w-100 list-unstyled flex-wrap'}>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                        <li className={'mt-3 col-3'}>
                            <a href=""> رشته اول</a>
                        </li>
                    </ul>
            </div>
            <div className={'input-box d-flex flex-wrap w-100 p-5 mt-5'}>
                <ul className={'d-flex align-items-center text-center w-100 list-unstyled flex-wrap col-8'}>
                    <li className={'mt-3 col-4 p-0'}>
                        <a href="">دانلود دفترچه انتخاب رشته ارشد</a>
                    </li>
                    <li className={'mt-3 col-4'}>
                        <a href="">درباره‌ما</a>
                    </li>
                    <li className={'mt-3 col-4'}>
                        <a href="">تماس با ما</a>
                    </li>
                </ul>
                <div className={'d-flex col-4'}>
                    <SamandehiLogo
                        // optional true | false
                        sid="249476"
                        sp="uiwkaodspfvlaodsjyoegvka"
                    />
                    <EnamadLogo/>
                </div>
            </div>
            <div className={'input-box d-flex w-100 p-5 mt-5 bg-secondary justify-content-around'}>
                <h5 className={'m-0 text-white text-center'}>تمامی حقوق نرم افزار انتخاب رشته ارشد 1400 متعلق به سایت مشاوران تحصیلی است.</h5>
            </div>
        </div>
    </div>
}
