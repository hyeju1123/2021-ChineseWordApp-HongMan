
/* type */
const ALERT_ON = 'alert_on';
const ALERT_OFF = 'alert_off';

/* action */
export const handleAlertOn = (title, contents, fc) => {
    return {
        type: ALERT_ON,
        visible: true,
        title: title, 
        contents: contents, 
        fc: fc
    }
}

export const handleAlertOff = () => {
    return {
        type: ALERT_OFF,
        visible: false,
        title: '', 
        contents: '', 
        fc: null
    }
}

/* reducer */
const initialState = {
    title: '',
    visible: false,
    contents: '',
    fc: null
}

export default function alert(state = initialState, action) {
    switch (action.type) {
        case ALERT_ON:
            return {
                title: action.title,
                visible: action.visible,
                contents: action.contents,
                fc: action.fc
            }
        case ALERT_OFF:
            return {
                title: '',
                visible: action.visible,
                contents: '',
                fc: null
            }
        default:
            return state;
    }
}