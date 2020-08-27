import React, {useReducer} from "react"
import {SlidesContext} from "./SlidesContext";
import {slidesReducer} from "./slidesReducer";
import antDesign from './../../common/images/antDesign.jpg'
import bootstrap from './../../common/images/bootstrap.jpg'
import reduxImg from './../../common/images/reduxImg.png'
import reactImg from './../../common/images/reactImg.webp'
import tsImg from './../../common/images/tsImg.png'
import reactStrapImg from './../../common/images/reactStrapImg.webp'

const SlidesState = ({children}) => {
    let initialState = {
        slides: [
            {
                header: 'FRONT-END|DEVELOPER',
                images: [
                    {
                        src: tsImg,
                        name: 'Typescript',
                    },
                    {
                        src: reactImg,
                        name: 'React.js',
                    },
                    {
                        src: reduxImg,
                        name: 'Redux',
                    },
                ],
                additText: {
                    src:'https://github.com/Zaxarprod',
                    text:'My projects on github',
                }
            },
            {
                header: 'I USE DIFFERENT|FRAMEWORKS',
                images: [
                    {
                        src: antDesign,
                        name: 'AntDesign',
                    },
                    {
                        src: bootstrap,
                        name: 'Bootstrap',
                    },
                    {
                        src: reactStrapImg,
                        name: 'Reactstrap',
                    },
                ],
                additText: {
                    src:'',
                    text:'My mail - maxpanov32@gmail.com',
                }
            },
            {
                header: 'HELP ZAKHAR|TO FIND A JOB',
                additText: {
                    src: '',
                    text: 'Once again my mail, so that you do not forget - maxpanov32@gmail.com'
                }
            },
        ]
    }
    const [state, dispatch] = useReducer(slidesReducer, initialState)
    return (
        <SlidesContext.Provider value={{state}}>
            {children}
        </SlidesContext.Provider>
    )
}

export default SlidesState