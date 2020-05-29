import React from "react";
import Avatar from "react-avatar";
import IconButton from "@material-ui/core/IconButton";
import BackArrow from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./style.css";

const Header = ({ userName, senderUserId, typingStatus, onlineStatus }) => {
    const { isTyping, userId } = typingStatus || {};
    const { isOnline } = onlineStatus;
    let showTyping = userId !== senderUserId;
    let showOnline = onlineStatus?.userId !== senderUserId;
    const history = useHistory();
    return (
        <div className="headerContainer">
            <IconButton onClick={() => history.push("/users")}>
                <BackArrow style={{ color: "#fff" }} />
            </IconButton>
            <Avatar
                style={{ marginRight: "10px", marginLeft: "-10px" }}
                name={userName || "Unknown"}
                size="45"
                round={true}
                color="#128C7E"
            />
            <div className="userInfo">
                <div className="userName">{userName}</div>
                {showTyping && isTyping ? (
                    <div className="typing">typing...</div>
                ) : showOnline && isOnline ? (
                    <div className="online">online</div>
                ) : null}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { selectedChatData, user } = state || {};
    const userName = selectedChatData?.selectedUser?.name ?? "";
    const senderUserId = user?.userId ?? "";
    return { userName, senderUserId };
};

export default connect(mapStateToProps)(Header);
