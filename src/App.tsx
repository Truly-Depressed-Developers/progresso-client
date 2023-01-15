import './App.scss';

import { ThemeProvider, createTheme } from '@mui/material';
import { Routes } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Upload } from './pages/Upload';
import { User } from './pages/User';
import { Browser } from './pages/Browser';
import { File } from './pages/File';
import { useState } from 'react';
import { QuizAdd } from './pages/QuizAdd';
import { QuestionAdd } from './pages/QuestionAdd';

function Inside() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");

    const onLogin = (id: string, username: string) => {
        setLoggedIn(true);
        setUserID(id);
        setUsername(username);
    }

    const logOut = () => {
        setLoggedIn(false);
        setUserID("");
        setUsername("");
    }

    return (
        <div className="App">
            <nav>
                <div id="left">
                    <Link to="/">Home</Link>
                    <Link to="/upload">Upload</Link>
                    <Link to="/quiz/add">Add Quiz</Link>
                    <Link to="/browser">Browse PDFs</Link>
                </div>
                {!loggedIn ?
                    <div id="right">
                        <Link to="/login">Login</Link>
                        <Link className='colored' to="/register">Register</Link>
                    </div>
                    :
                    <div id="right">
                        <Link to="/user/1">{username}</Link>
                        <Link className='colored' onClick={logOut} to="/">Logout</Link>
                    </div>
                }
            </nav>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/user/:id" element={<User />} />
                <Route path='/login' element={<Login onLogin={onLogin} />} />
                <Route path='/register' element={<Register />} />
                <Route path='/browser' element={<Browser />} />
                <Route path='/quiz/add' element={<QuizAdd />} />
                <Route path='/quiz/:id/add' element={<QuestionAdd />} />
                <Route path='/file/:id' element={<File />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </div>
    )
}

const theme = createTheme();

// Providers
function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Inside />
            </BrowserRouter>
        </ThemeProvider >
    );
}

export default App;
