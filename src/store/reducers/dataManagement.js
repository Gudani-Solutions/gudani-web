let initialState = {
    uid: '',
    code: '',
    title: '',
    description: '',
    department: '',
    photo: '',
    univerisity: '',
    courseData: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_COURSEDATA':
            return { ...state, courseData: action.payload }
        default:
            return state
    }
}