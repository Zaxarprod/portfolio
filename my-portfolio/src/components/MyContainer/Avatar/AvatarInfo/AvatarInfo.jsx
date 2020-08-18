import React from "react"
import style from '../../MyContainer.module.scss'
import education from '../../../../common/images/icon-education.png'
import basketball from '../../../../common/images/icon-basketball.png'
import SN from "./SN/SN";

const AvatarInfo = () => {
    return (
        <div className={style.avatarInfo}>
            <div className={style.basketballBlock}>
                <span>
                    <img src={basketball} />
                </span>
                <p>JS, React+Redux+TS, HTML/CSS</p>
            </div><br />
            <div className={style.educationBlock}>
                <span>
                    <img src={education} />
                </span>
                <p>Student of Bauman MSTU</p>
            </div>
            <br />
            <SN />
        </div>
    )
}

export default AvatarInfo