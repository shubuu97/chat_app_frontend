import React from "react";
import Messages from "./messages";
import Input from "./input";
import Header from "./header";
import "./style.css";

const ChatBox = ({
    messages,
    message,
    setMessage,
    sendMessage,
    handleTyping,
    typingStatus,
    onlineStatus,
}) => {
    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <Header typingStatus={typingStatus} onlineStatus={onlineStatus} />
                <Messages messages={messages} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                    handleTyping={handleTyping}
                />
            </div>
        </div>
    );
};

export default ChatBox;
