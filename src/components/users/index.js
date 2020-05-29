import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Avatar from "react-avatar";
import { createRoom, setChatData } from "../../store/actions";
import "./style.css";

const RegisteredUsers = ({ users, rooms, userId, userName, createRoom, setChatData }) => {
    const history = useHistory();

    useEffect(() => {
        if (!users) {
            history.push("/");
        }
    }, []);

    const doesRoomExist = (selectedUserId) => {
        let room = rooms.find((room) => {
            let users = room?.users ?? [];
            if (users.indexOf(userId) !== -1 && users.indexOf(selectedUserId) !== -1) {
                return room;
            }
        });
        if (room) {
            return room.id;
        }
        return null;
    };

    const findRoomId = (user) => {
        let roomId = doesRoomExist(user.id);
        if (roomId) {
            setChatData(user, roomId);
            history.push("/chat");
        } else {
            let reqBody = { users: [userId, user.id] };
            createRoom(reqBody, (roomId) => {
                setChatData(user, roomId);
                history.push("/chat");
            });
        }
    };

    return (
        <div className="usersContainer">
            <div className="userTitleBar">
                <Avatar
                    style={{ marginRight: "10px", marginLeft: "-10px" }}
                    name={userName || "Unknown"}
                    size="45"
                    round={true}
                    color="#128C7E"
                />
                <span>Hello, {(userName || "").split(" ")[0]}</span>
                <span
                    onClick={() => {
                        localStorage.clear();
                        history.push("/");
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    Logout
                </span>
            </div>
            {(users || []).map((user) => {
                return (
                    <div className="user" key={user.id} onClick={() => findRoomId(user)}>
                        <div>
                            <Avatar
                                style={{ marginRight: "10px", marginLeft: "-10px" }}
                                name={user.name || "Unknown"}
                                size="45"
                                round={true}
                            />
                        </div>
                        <div>{user.name}</div>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    const { users, rooms, userId, userName } = state?.user ?? {};
    return { users, rooms, userId, userName };
};

export default connect(mapStateToProps, { createRoom, setChatData })(RegisteredUsers);
