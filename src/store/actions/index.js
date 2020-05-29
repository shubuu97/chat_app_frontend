import { BASE_URL } from "../../constants";
import axios from "axios";

export const loginUser = (reqBody, cb) => {
    return (dispatch) => {
        axios
            .post(`${BASE_URL}/login`, reqBody)
            .then((response) => {
                if (response?.status ?? 0 === 200) {
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: {
                            ...response.data,
                        },
                    });
                    cb({
                        success: true,
                        message: response?.data?.message ?? "Logged In Successfully!!",
                    });
                }
            })
            .catch((error) => {
                console.log(error.response.data, "error");
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: {
                        ...error.data,
                    },
                });
                cb({
                    success: false,
                    message: error?.response?.data?.message ?? "Something Went Wrong!",
                });
            });
    };
};

export const registerUser = (reqBody, cb) => {
    return (dispatch) => {
        axios
            .post(`${BASE_URL}/register`, reqBody)
            .then((response) => {
                if (response?.status ?? 0 === 201) {
                    delete reqBody.name;
                    dispatch(loginUser(reqBody, cb));
                    dispatch({
                        type: "REGISTRATION_SUCCESS",
                        payload: {
                            ...response.data,
                        },
                    });
                    cb({
                        success: true,
                        message: response?.data?.message ?? "Registration Successful!!",
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: "REGISTRATION_FAILURE",
                    payload: {
                        ...error.data,
                    },
                });
                cb({
                    success: false,
                    message: error?.response?.data?.message ?? "Something Went Wrong!",
                });
            });
    };
};

export const createRoom = (reqBody, cb) => {
    return (dispatch) => {
        axios
            .post(`${BASE_URL}/create-room`, reqBody)
            .then((response) => {
                if (response?.status ?? 0 === 201) {
                    dispatch({
                        type: "ROOM_CREATED_SUCCESSFULLY",
                        payload: {
                            ...response.data,
                        },
                    });
                    cb(response?.data?.id);
                }
            })
            .catch((error) => {
                dispatch({
                    type: "ROOM_CREATION_FAILED",
                    payload: {
                        ...error.data,
                    },
                });
            });
    };
};

export const setChatData = (selectedUser, roomId) => {
    return {
        type: "SELECTED_CHAT_DATA",
        payload: {
            selectedUser,
            roomId,
        },
    };
};
