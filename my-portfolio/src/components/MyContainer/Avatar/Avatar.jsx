import React, {Fragment, useContext, useState} from 'react'
import style from '../MyContainer.module.scss'
import AvatarInfo from "./AvatarInfo/AvatarInfo";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import {ModeContext} from "../../../context/mode/ModeContext";

const Avatar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Fragment>
            <div className={style.mobileButton} onClick={()=>{setIsOpen(!isOpen)}}>
                {!isOpen?<img src={'https://sun1-17.userapi.com/I4w5yDffxfpWifSa6QHTsAXIpZWrDYvpYEzpow/Djj8aCqBTJ8.jpg'}/>
                :<CloseOutlined />}
            </div>
            <div className={style.avatarBlock + ` ${!isOpen?style.avatarBlockClosed:style.avatarBlockOpened}`}>
                <div className={style.avatar}>
                    <img src={'https://sun1-17.userapi.com/I4w5yDffxfpWifSa6QHTsAXIpZWrDYvpYEzpow/Djj8aCqBTJ8.jpg'}/>
                </div>
                <AvatarInfo />
            </div>
        </Fragment>
    )
}

export default Avatar