let initialState = {
    uid: '',
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    photo: '',
    univerisity: '',
    department: '',
    phonenumber: '',
    courses: [],
    assessments: [],
    isVerified: false,
    isAuthenticated: false,
    token: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_COURSES':
            return { ...state, courses: action.payload };
        case 'UPDATE_ASSESSMENTS':
            return { ...state, assessments: action.payload };
        case 'UPDATE_USER':
            return action.payload;
        case 'LOGOUT':
            return {};
        default:
            return state
    }
}
