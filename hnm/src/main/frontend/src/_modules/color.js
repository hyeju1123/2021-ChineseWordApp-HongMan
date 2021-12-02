
/* type */
const RED = 'red';
const WHITE = 'white';

/* action */
export const handleRedTheme = () => {
    return {
        type: RED,
        theme: 'r'
    }
}

export const handleWhiteTheme = () => {
    return {
        type: WHITE,
        theme: 'w'
    }
}

/* reducer */
const initialState = {
    theme: 'r'
}

export default function color(state = initialState, action) {
    switch (action.type) {
        case RED:
            return {
                theme: action.theme
            }
        case WHITE:
            return {
                theme: action.theme
            }
        default:
            return state;
    }
}