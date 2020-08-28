let initialState = {
    uid: '',
    code: '',
    title: '',
    description: '',
    duration: '',
    photo: '',
    univerisity: '',
    assessments: [],
    token: '',
    courses: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_COURSES':
            return { ...state, courses: action.payload }
        case 'UPDATE_ASSESSMENTS':
            return { ...state, assessments: action.payload }
        case 'UPDATE_COURSE':
            return action.payload
        default:
            return state
    }
}