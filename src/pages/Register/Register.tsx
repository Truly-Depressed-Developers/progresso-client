import { Alert, Button, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Settings } from "../../settings";

import "./Register.scss";

type Props = {};

const Register = (props: Props) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [passwd, setPasswd] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [miscError, setMiscError] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [loginInputError, setLoginInputError] = useState(false);
    const [passwdInputError, setPasswdInputError] = useState(false);

    const resetErrors = () => {
        setRegisterError(false);
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
        if (e.key == "Enter") {
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

            fetch(`http://${Settings.ip}:${Settings.port}/register`, {
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
                .then((data) => {
                    if (data.succ) {
                        navigate("/");
                    } else {
                        setRegisterError(true);
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
        <div id="register">
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
                    Register
                </Button>
                <div className="downTxt">
                    <Link to="/login">Sign in</Link>
                </div>
            </Paper>
            <div className='errorBox'>
                {registerError || miscError || dataError ?
                    <Alert
                        severity='error'
                        className='errorMsg'
                    >
                        {
                            registerError ? "User already exist" :
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

export { Register };