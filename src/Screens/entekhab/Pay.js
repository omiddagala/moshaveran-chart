import React, {useState} from "react";
import Payment from "../../Components/Payment";
import Header from "./Components/Header";
export default function Pay({group,state,dispatch}){
    return <div className={'container'}>
        <Header code={state.data.code}/>
        <div className={'box'}>
            <Payment type={'checkbox'} group={group} pageType={'ENTEKHAB_BEHDASHT'} setLoading={dispatch.setLoading} userId={state.data.code}/>
        </div>
    </div>
}
