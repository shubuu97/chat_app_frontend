import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import moment from "moment";
import { BASE_URL } from "../../constants";
import ChatBox from "./chatBox";

let socket;

const Chat = ({ selectedChatData, userId }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [typingStatus, setTypingStatus] = useState({});
    const [onlineStatus, setOnlineStatus] = useState({});
    const history = useHistory();

    const { roomId } = selectedChatData || {};

    // if there is no roomId redirect to login page
    useEffect(() => {
        if (!roomId) {
            history.push("/users");
        }
    }, [history, roomId]);

    useEffect(() => {
        socket = io(BASE_URL);
        if (roomId) {
            socket.emit("join", { roomId, userId });
        }
    }, []);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
        socket.on("typingStatus", (data) => {
            setTypingStatus(data);
        });

        socket.on("onlineStatus", (status) => {
            setOnlineStatus(status);
        });
    }, []);

    const sendMessage = (event) => {
        if (message) {
            socket.emit(
                "sendMessage",
                { roomId, message, time: moment().format("LT"), userId },
                () => setMessage("")
            );
        }
    };

    const handleTyping = (value) => {
        if (value) {
            socket.emit("typing", true, roomId, userId);
            setTimeout(() => {
                socket.emit("typing", false, roomId, userId);
            }, 3000);
        }
    };

    return (
        <div>
            <ChatBox
                messages={messages}
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
                handleTyping={handleTyping}
                typingStatus={typingStatus}
                onlineStatus={onlineStatus}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    const { selectedChatData, user } = state || {};
    const { userId } = user || {};
    return { selectedChatData, userId };
};

export default connect(mapStateToProps)(Chat);
