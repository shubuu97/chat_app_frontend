import React from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/SendOutlined";
import "./style.css";

const Input = ({ setMessage, sendMessage, message, handleTyping }) => (
    <div className="inputContainer">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => {
                setMessage(value);
                handleTyping(value);
            }}
            onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
        />
        <IconButton onClick={sendMessage} style={{ margin: "0px 15px", padding: "0px" }}>
            <SendIcon />
        </IconButton>
    </div>
);

export default Input;
