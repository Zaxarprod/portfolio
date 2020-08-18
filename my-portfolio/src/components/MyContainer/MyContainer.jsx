import React, {createRef, useContext, useEffect, useState} from 'react'
import style from './MyContainer.module.scss'
import {Carousel} from 'antd'
import SlideOne from "./slides/SlideOne"
import SlideTwo from "./slides/SlideTwo"
import SlideThree from "./slides/SlideThree"
import {ModeContext} from "../../context/mode/ModeContext"
import Avatar from "./Avatar/Avatar"
import { useSwipeable, Swipeable } from 'react-swipeable'

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
    let beforeChange = () => {
        setAnimationFlag(false)
    }
    let minDistance = 15
    let [swiped, setSwiped] = useState(false)
    let [y, setY] = useState()
    let onTouchStart = (e) => {
        const touch = e.touches[0]
        console.log(touch.clientY)
        setY(touch.clientY)
        setSwiped(false)
    }
    let onTouchMove = (e) => {
        if (e.changedTouches && e.changedTouches.length) {
            const touch = e.changedTouches[0]
        }
    }

    let onTouchEnd = (e) => {
        const touch = e.changedTouches[0]
        const delta = touch.clientY - y
        console.log(delta)
        console.log(touch.clientY)
        console.log(y)
        if (Math.abs(delta) > minDistance ) {
            setY(undefined)
            setSwiped(true)
            if(delta < 0){
                //setAnimationFlag(false)
                carouselRef.current.next()
            }
            else if(delta > 0){
                //setAnimationFlag(false)
                carouselRef.current.prev()
            }
        }
    }
    return (
        <div className={style.myContainer}
             onWheel={(e)=> {
                if(e.deltaY >0){
                    carouselRef.current.next()
                }
                else{
                    carouselRef.current.prev()
                }
            }}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
        >
            <Avatar />
                <Carousel dotPosition={'right'} id={'carousel'} ref={carouselRef}
                          beforeChange={beforeChange} afterChange={onChange}>
                    <SlideOne styles={contentStyle} animationFlag={animationFlag} />
                    <SlideTwo styles={contentStyle} animationFlag={animationFlag} />
                    <SlideThree styles={contentStyle} animationFlag={animationFlag} />
                </Carousel>
        </div>
    )
}

export default MyContainer