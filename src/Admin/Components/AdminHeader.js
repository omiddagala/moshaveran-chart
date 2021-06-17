import React from 'react'
import AdminRequireLoginMiddleware from "../../AdminRequireLoginMiddleware";
import {Link} from "react-router-dom";

export default function AdminHeader() {
    return AdminRequireLoginMiddleware(<nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to={'/zinc'} className={'nav-item  nav-link'}>آپلود فایل</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/zinc/chart'} className={'nav-item  nav-link'}>نمودار</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/zinc/logout'} className={'nav-item  nav-link'}>خروج</Link>
                </li>
            </ul>
        </div>
    </nav>)
}