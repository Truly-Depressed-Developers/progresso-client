import { Button, Link, TextField } from '@mui/material';
import React, { useState } from 'react';

import "./Login.scss";

type Props = {};

const Login = (props: Props): JSX.Element => {
    const [login, setLogin] = useState("");
    const [passwd, setPasswd] = useState("");

    const onClick = () => {

        console.log(login);
        console.log(passwd);
    }

    return (
        <div id="login">
            <div className="centered">
                <TextField
                    value={login}
                    onChange={(l) => setLogin(l.target.value)}
                    className='input'
                    id="loginInput"
                    label="Login"
                    variant="outlined"
                    required={true}
                />
                <TextField
                    value={passwd}
                    onChange={(l) => setPasswd(l.target.value)}
                    className='input'
                    id="passwordInput"
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    required={true}
                />
                <Button
                    onClick={onClick}
                    className='btn'
                    variant="contained"
                >
                    Login
                </Button>
                <div className="downTxt">
                    <Link href="/register">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export { Login };