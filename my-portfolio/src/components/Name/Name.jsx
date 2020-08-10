import React, {useContext} from "react"
import style from './Name.module.scss'
import {ModeContext} from "../../context/mode/ModeContext";

const Name = () => {
    const value = useContext(ModeContext)
    return (
        <div className={style.name} style={{color: value.state.color}}>
            Zakhar Petrushin
        </div>
    )
}

export default Name