import React, {useReducer} from "react"
import {SlidesContext} from "./SlidesContext";
import {slidesReducer} from "./slidesReducer";
import antDesign from './../../common/images/antDesign.jpg'
import bootstrap from './../../common/images/bootstrap.jpg'

const SlidesState = ({children}) => {
    let initialState = {
        slides: [
            {
                header: 'FRONT-END|DEVELOPER',
                images: [
                    {
                        src: 'https://storage.codedojo.ru/topics/typescript.png',
                        name: 'Typescript',
                    },
                    {
                        src: 'https://im0-tub-ru.yandex.net/i?id=52b3fdbcfcec12d5da459ce2b6a9a8dd&n=13',
                        name: 'React.js',
                    },
                    {
                        src: 'https://www.pngitem.com/pimgs/m/24-241225_redux-logo-svg-hd-png-download.png',
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
                        src: 'https://im0-tub-ru.yandex.net/i?id=2bb42edaee0e15ecc4b791aab1014b51&n=13',
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