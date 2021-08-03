import React, {useReducer, useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Route, useLocation,Switch
} from "react-router-dom";
import Home from "./Screens/Home";
import AuthReducer from './Storage/Reducers/AuthReducer';
import AuthContext from './Storage/Contexts/AuthContext';
import Admin from "./Admin/Screens/Admin";
import Store from "./Storage/Store";
import NotFound from "./Screens/NotFound";
import Entekhab from "./Screens/entekhab";
import './App.css'
const initializeUser = {
    user: null,
    apiToken: '',
};

export default function App() {
    const [auth, authDispatch] = useReducer(AuthReducer, {});
    const [year,setYear] = useState(null)
    let years =[1400,1401];//برای هر سال به این آرایه اضافه می کنیم
    const [path,setPath] = useState();
    const retrieveAuthData = async () => {
        try {
            let result = await Store.get('USER_INFO');
            result = result !== false ? result : initializeUser;
            return result;
        } catch (error) {
        }
    };

    useEffect(() => {
        let temp1 =[]
        let temp2 =[]
        let temp3 =[]
        let temp4 =[]
        years.forEach(item=>{
            let url1 ='/نرم-افزار-تخمین-رتبه-بهداشت-'+item;
            let url2 ='/نرم-افزار-تخمین-رتبه-علوم-'+item;
            let url3 ='/نرم-افزار-انتخاب-رشته-بهداشت-'+item;
            let url4 ='/نرم-افزار-انتخاب-رشته-علوم-'+item;

            if ([url1,url2].includes(decodeURI(window.location.pathname))){
                setYear(item)
            }
            temp1.push(url1);
            temp2.push(url2);
            temp3.push(url3);
            temp4.push(url4);
        });
        console.log([temp1,temp2,temp3,temp4])
        setPath([temp1,temp2,temp3,temp4])

        retrieveAuthData().then((data) => {
            authDispatch({
                type: 'INIT_DATA',
                data: data,
            });
        });
    }, [])

    return auth.apiToken !== undefined ? <AuthContext.Provider value={{auth, authDispatch}}>
        <Router>
            <Switch>
                <Route path={path[0]}><Home group={1} year={year}/></Route>
                <Route path={path[1]}><Home group={2} year={year}/></Route>
                <Route path={path[2]}><Entekhab group={1} year={year} url={path[2].filter(item=>item.search(year))[0]}/></Route>
                <Route path={path[3]}><Entekhab group={2} year={year} url={path[3].filter(item=>item.search(year))[0]}/></Route>
                <Route path="/zinc"><Admin/></Route>
                <Route path=""><NotFound/></Route>
            </Switch>
        </Router>
    </AuthContext.Provider> : null
}
