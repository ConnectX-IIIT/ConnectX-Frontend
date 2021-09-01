export const initialState = {
    userDetails: {},
    postFilter: {
        jobs: false,
        projects: false,
        blogs: false,
    },
    currentQuestion: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: action.userData
            };

        case 'UPDATE_CONVERSATIONS':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    conversations: [
                        ...state.userDetails.conversations,
                        action.id
                    ]
                }
            };

        case 'UPDATE_PROFILE':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    profilePicture: action.url
                }
            };

        case 'UPDATE_BACKGROUND':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    backgroundPicture: action.url
                }
            };

        case 'UPDATE_USER_DETAILS':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    name: action.name,
                    email: action.email,
                    mobile: action.mobile,
                    description: action.description,
                }
            };

        case 'UPDATE_POST_FILTER':
            return {
                ...state,
                postFilter: action.filter
            };

        case 'SET_CURRENT_QUESTION':
            return {
                ...state,
                currentQuestion: action.question
            };

        default:
            return state;
    }
};

export default reducer;