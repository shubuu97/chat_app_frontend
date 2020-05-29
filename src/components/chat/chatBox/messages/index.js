import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message";
import "./style.css";

const Messages = ({ messages }) => (
    <ScrollToBottom className="messages">
        {(messages || []).map((message, i) => (
            <Message key={i} message={message || {}} />
        ))}
    </ScrollToBottom>
);

export default Messages;
