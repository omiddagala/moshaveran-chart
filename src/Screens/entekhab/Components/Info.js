import React from "react";
import Logo from '../../../assets/info.png'
export default function Info({text}){
    return <div className={'alert alert-info d-flex align-items-center w-100'}>
        <div className={'logo-info mx-4'}>
            <img className={'w-100 p-0'} src={Logo} alt=""/>
        </div>
        <p className={'m-0 text-left'}>{text}</p>
    </div>
}