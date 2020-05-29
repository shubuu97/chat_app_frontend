import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../../store/actions";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ registerUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleRegister = () => {
        setLoading(true);
        const reqBody = {
            name,
            email,
            password,
        };
        registerUser(reqBody, ({ success, message }) => {
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            if (success) {
                toast.success(message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push("/users");
            } else {
                toast.error(message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };

    return (
        <div className="container">
            <div className="row mt-10">
                <div className="col-md-12">
                    <TextField
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={(event) => {
                            setName(event?.target?.value ?? "");
                        }}
                        fullWidth
                        variant="outlined"
                    />
                </div>
            </div>
            <div className="row mt-10">
                <div className="col-md-12">
                    <TextField
                        name="email"
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(event) => {
                            setEmail(event?.target?.value ?? "");
                        }}
                        fullWidth
                        variant="outlined"
                    />
                </div>
            </div>

            <div className="row mt-10">
                <div className="col-md-12">
                    <TextField
                        name="password"
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(event) => {
                            setPassword(event?.target?.value ?? "");
                        }}
                        onKeyPress={(event) => (event.key === "Enter" ? handleRegister() : null)}
                        fullWidth
                        variant="outlined"
                    />
                </div>
            </div>
            <div className="row mt-10">
                <div className="col-md-12 centerItem">
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={!email || !password}
                            onClick={handleRegister}
                        >
                            REGISTER
                        </Button>
                    )}
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default connect(null, { registerUser })(Register);
