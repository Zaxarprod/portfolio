import React, {useContext} from "react"
import style from './../MyContainer.module.scss'
import SlideInfo from "./SlideInfo/SlideInfo";
import {SlidesContext} from "../../../context/slides/SlidesContext";

const SlideOne = (props) => {
    const {state} = useContext(SlidesContext)
    return (
        <div style={props.styles} className={style.slideOne}>
            <SlideInfo animationFlag={props.animationFlag} slide={state.slides[0]}/>
        </div>
    )
}

export default SlideOne