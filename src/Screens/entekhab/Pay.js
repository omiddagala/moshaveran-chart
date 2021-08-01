import React, {useState} from "react";
import Payment from "../../Components/Payment";
export default function Pay({group,state,dispatch}){
    return <div className={'container'}>
        <Payment type={'checkbox'} group={group} pageType={'ENTEKHAB_BEHDASHT'} setLoading={dispatch.setLoading} userId={state.data.code}/>
    </div>
}
