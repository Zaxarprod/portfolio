import React, {useContext} from 'react'
import style from '../../MyContainer.module.scss'
import {ModeContext} from "../../../../context/mode/ModeContext";

const SlideInfo = ({animationFlag, slide}) => {
    const value = useContext(ModeContext)
    return (
        <div className={style.slideInfo}>
            <h1 className={animationFlag?style.headerInfoAnim:style.AnimExit}>{slide.header.split('|')[0]}<br/>
                {slide.header.split('|')[1]}</h1>
            <ul className={animationFlag?style.Anim:style.AnimExit}>
                {slide.images.map((img)=>{
                    return (
                        <li>
                            <img src={img.src} />
                            <div style={{backgroundColor: value.state.color}}>
                                <p>{img.name}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className={style.gitHubBlock + ` ${animationFlag?style.Anim:style.AnimExit}`}>
                <p><a href={slide.additText.src}>{slide.additText.text}</a></p>
            </div>
        </div>
    )
}

export default SlideInfo