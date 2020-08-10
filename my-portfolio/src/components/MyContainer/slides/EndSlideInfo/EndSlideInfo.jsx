import React, {useContext} from 'react'
import style from '../../MyContainer.module.scss'
import {ModeContext} from "../../../../context/mode/ModeContext";
import Game from "./Game/Game";

const SlideInfo = ({animationFlag, slide}) => {
    const value = useContext(ModeContext)
    return (
        <div className={style.endSlideInfo}>
            <h1 className={animationFlag?style.headerInfoAnim:style.AnimExit}>{slide.header.split('|')[0]}<br/>
                {slide.header.split('|')[1]}</h1>
            <Game animationFlag={animationFlag} />
            <div className={style.additBlock + ` ${animationFlag?style.Anim:style.AnimExit}`}>
                <p><a href={slide.additText.src}>{slide.additText.text}</a></p>
            </div>
        </div>
    )
}

export default SlideInfo