export const SET_COLOR = 'mode/SET_COLOR'

export const modeReducer = (state, action) => {
    switch (action.type) {
        case SET_COLOR:
            let color
            switch (action.index) {
                case 0:
                    color = '#8a2be2'
                    break
                case 1:
                    color = 'coral'
                    break
                case 2:
                    color = 'mediumslateblue'
            }
            return {
                ...state,
                color: color
            }
        default:
            return state
    }
}