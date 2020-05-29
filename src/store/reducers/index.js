const RootReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                type,
                user: { ...payload },
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                type,
                user: { ...payload },
            };
        case "REGISTRATION_SUCCESS":
            return {
                ...state,
                type,
                registration: { ...payload },
            };
        case "REGISTRATION_FAILURE":
            return {
                ...state,
                type,
                registration: { ...payload },
            };
        case "ROOM_CREATED_SUCCESSFULLY":
            return {
                ...state,
                type,
                room: { ...payload },
            };
        case "ROOM_CREATION_FAILED":
            return {
                ...state,
                type,
                room: { ...payload },
            };
        case "SELECTED_CHAT_DATA":
            return {
                ...state,
                type,
                selectedChatData: {
                    ...payload,
                },
            };
        default:
            return state;
    }
};

export default RootReducer;
