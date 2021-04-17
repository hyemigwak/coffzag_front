import React from 'react';
import {useSelector} from "react-redux";
import {getCookie} from "./Cookie";

const Permit = (props) => {

    const is_login = useSelector((state) => state.user.is_login);
    const cookie = getCookie("user_login")? true : false; 

    if(cookie && is_login){
        return (
            <div>
                {props.children}
            </div>
        )
    }
}

export default Permit;
