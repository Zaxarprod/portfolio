import React, {Fragment} from 'react'
import style from '../MyContainer.module.scss'
import AvatarInfo from "./AvatarInfo/AvatarInfo";

const Avatar = () => {
    return (
        <div className={style.avatarBlock}>
            <div className={style.avatar}>
                <img src={'https://sun1-17.userapi.com/I4w5yDffxfpWifSa6QHTsAXIpZWrDYvpYEzpow/Djj8aCqBTJ8.jpg'}/>
            </div>
            <AvatarInfo />
        </div>
    )
}

export default Avatar