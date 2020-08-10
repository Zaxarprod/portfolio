import React, {createRef, useContext, useEffect, useState} from 'react'
import style from './MyContainer.module.scss'
import {Carousel} from 'antd'
import SlideOne from "./slides/SlideOne";
import SlideTwo from "./slides/SlideTwo";
import SlideThree from "./slides/SlideThree";
import {ModeContext} from "../../context/mode/ModeContext";
import Avatar from "./Avatar/Avatar";

const MyContainer = () => {
    const contentStyle = {
        height: '90vh',
        color: '#fff',
        textAlign: 'center',
        margin: '0',
    }
    const carouselRef = createRef()

    const [animationFlag, setAnimationFlag] = useState(true)
    const value = useContext(ModeContext)

    let onChange = (index) => {
        value.setColor(index)
        setAnimationFlag(true)
    }

    return (
        <div className={style.myContainer}
             onWheel={(e)=> {
                if(e.deltaY >0){
                    setAnimationFlag(false)
                    carouselRef.current.next()
                }
                else{
                    setAnimationFlag(false)
                    carouselRef.current.prev()
                }
            }
        }>
            <Avatar />
            <Carousel dotPosition={'right'} ref={carouselRef} afterChange={onChange}>
                <SlideOne styles={contentStyle} animationFlag={animationFlag} />
                <SlideTwo styles={contentStyle} animationFlag={animationFlag} />
                <SlideThree styles={contentStyle} animationFlag={animationFlag} />
            </Carousel>
        </div>
    )
}

export default MyContainer