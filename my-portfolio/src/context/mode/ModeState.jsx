import React, {useReducer} from 'react'
import {ModeContext} from "./ModeContext"
import {modeReducer, SET_COLOR} from "./modeReducer"

export const ModeState = ({children}) => {
    let initialState = {
        color: '#8a2be2'
    }
    const [state, dispatch] = useReducer(modeReducer, initialState)
    let setColor = (index) =>{
        dispatch({
            type: SET_COLOR,
            index,
        })
    }
    return (
        <ModeContext.Provider value={{
            state, setColor
        }}>
            {children}
        </ModeContext.Provider>
    )
}