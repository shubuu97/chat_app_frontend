import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../../store/actions";

const Login = ({ loginUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleLogin = () => {
        setLoading(true);
        const reqBody = {
            email,
            password,
        };
        loginUser(reqBody, ({ success, message }) => {
            setLoading(false);
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
                        onKeyPress={(event) => (event.key === "Enter" ? handleLogin() : null)}
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
                            disabled={!email || !password}
                            onClick={handleLogin}
                            fullWidth
                        >
                            LOGIN
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

export default connect(null, { loginUser })(Login);
