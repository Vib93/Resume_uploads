import { useState } from "react";
import "./menu.css";

type props={
    onaction(action:"reset"|"newround"):void
};

export default function Menu({onaction}:props){

    const[menuopen,setmenuopen]=useState(false);

    return(
        <div className="menu">
                    <button className="menu-btn" onClick={()=>setmenuopen(prev => !prev)}>Actions
                    {menuopen?(
                    <i className="fa-solid fa-chevron-up"></i>)
                    :
                    (
                        <i className="fa-solid fa-chevron-down"></i>
                        )}
                </button>
                { menuopen && (
                    <div className="items border">
                        <button onClick={()=>{setmenuopen(false);onaction('reset')}}>Reset</button>
                        <button onClick={()=>{setmenuopen(false);onaction('newround')}}>New Round</button>
                    </div>
                    )}
                </div>
    )
}