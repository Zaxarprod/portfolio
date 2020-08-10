import React, {useContext} from "react"
import style from './../MyContainer.module.scss'
import SlideInfo from "./SlideInfo/SlideInfo";
import {SlidesContext} from "../../../context/slides/SlidesContext";

const SlideTwo = (props) => {
    const {state} = useContext(SlidesContext)
    return (
        <div style={props.styles} className={style.slideTwo}>
            <SlideInfo animationFlag={props.animationFlag} slide={state.slides[1]}/>
        </div>
    )
}

export default SlideTwo