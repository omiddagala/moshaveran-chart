import React from 'react'
import {Link} from "react-router-dom";

export default function Header() {
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand mx-4" href="#">مشاوران تحصیلی</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        {/*<div className="collapse navbar-collapse" id="navbarNavAltMarkup">*/}
        {/*    <div className="navbar-nav">*/}
        {/*        <Link className="nav-item nav-link" to="/">صفحه نخست</Link>*/}
        {/*        <a className="nav-item nav-link" href="#" target={'_blank'}>تماس با*/}
        {/*            ما</a>*/}
        {/*        <a className="nav-item nav-link" href="#" target={'_blank'}>درباره*/}
        {/*            ما</a>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </nav>)
}
