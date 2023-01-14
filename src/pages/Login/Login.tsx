import { Alert, Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Settings } from "../../settings";

import "./Login.scss";

type Props = {
    onLogin: (id: string, username: string) => void
};

type ServerRes = {
    description: string,
    id: string,
    username: string
}

const Login = (props: Props): JSX.Element => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [passwd, setPasswd] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [miscError, setMiscError] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [loginInputError, setLoginInputError] = useState(false);
    const [passwdInputError, setPasswdInputError] = useState(false);

    const resetErrors = () => {
        setLoginError(false);
        setMiscError(false);
        setDataError(false);
        setLoginInputError(false);
        setPasswdInputError(false);
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        }
    })

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    const onSubmit = () => {
        resetErrors();

        if (login === "" || passwd === "") {
            if (login === "") {
                setLoginInputError(true);
            }
            if (passwd === "") {
                setPasswdInputError(true);
            }
            setDataError(true);
        } else {
            fetch(`http://${Settings.ip}:${Settings.port}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    "username": login,
                    "password": passwd
                })
            })
                .then(async (response) => {
                    if (response.ok) {
                        return { data: await response.json(), succ: true };
                    } else {
                        return { data: await response.json(), succ: false };
                    }
                })
                .then((data: { data: ServerRes, succ: Boolean }) => {
                    if (data.succ) {
                        // props.onLogin(data.data.id, "Spookyless");
                        props.onLogin(data.data.id, data.data.username);
                        navigate("/");
                    } else {
                        setLoginError(true);
                        setLogin("");
                        setPasswd("");
                    }
                })
                .catch((error) => {
                    setMiscError(true);
                    console.error('Error:', error);
                });
        }
    }

    return (
        <div id="login">
            <div className='backTxt'>
                LOGIN
            </div>
            <Paper elevation={3} className="centered">
                <TextField
                    error={loginInputError}
                    value={login}
                    onChange={async (l) => {
                        await setLogin(l.target.value);
                        if (l.target.value === "")
                            setLoginInputError(true);
                        else
                            setLoginInputError(false);
                    }}
                    className='input'
                    id="loginInput"
                    label="Login"
                    variant="outlined"
                    required={true}
                />
                <TextField
                    error={passwdInputError}
                    value={passwd}
                    onChange={(l) => {
                        setPasswd(l.target.value)
                        if (l.target.value === "")
                            setPasswdInputError(true);
                        else
                            setPasswdInputError(false);
                    }}
                    className='input'
                    id="passwordInput"
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    required={true}
                />
                <Button
                    onClick={onSubmit}
                    className='btn'
                    variant="contained"
                >
                    Login
                </Button>
                <div className="downTxt">
                    <Link to="/register">Sign up</Link>
                </div>
            </Paper>
            <div className='errorBox'>
                {loginError || miscError || dataError ?
                    <Alert
                        severity='error'
                        className='errorMsg'
                    >
                        {
                            loginError ? "Incorrect login details" :
                                miscError ? "Unexpected error" :
                                    dataError ? "Wrong data error" : ""
                        }
                    </Alert> :
                    ""
                }
            </div>
        </div>
    );
};

export { Login };