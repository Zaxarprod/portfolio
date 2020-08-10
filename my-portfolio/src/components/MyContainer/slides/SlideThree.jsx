import React, {useContext} from "react"
import style from './../MyContainer.module.scss'
import EndSlideInfo from "./EndSlideInfo/EndSlideInfo";
import {SlidesContext} from "../../../context/slides/SlidesContext";

const SlideThree = (props) => {
    const {state} = useContext(SlidesContext)
    return (
        <div style={props.styles} className={style.slideThree}>
            <EndSlideInfo animationFlag={props.animationFlag} slide={state.slides[2]} />
        </div>
    )
}

export default SlideThree