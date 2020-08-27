import * as actionTypes from '../actions/ui';

const initialState = {
    header: true,
    sidebar: true,
    footer: true,
    loginpage: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HEADER:
            return { ...state, header: !state.header };
        case actionTypes.SIDEBAR:
            return { ...state, sidebar: !state.sidebar };
        case actionTypes.FOOTER:
            return { ...state, footer: !state.footer };
        case actionTypes.LOGINPAGE:
            return { ...state, loginpage: !state.loginpage };
        default:
            return state;
    }
}
