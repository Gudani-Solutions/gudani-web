let initialState = {
    uid: '',
    title: '',
    startDate: '',
    startTime: '',
    duration: '',
    type: '',
    instructions: '',
    assessments: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ASSESSMENTS':
            return { ...state, assessments: action.payload }
        default:
            return state
    }
}