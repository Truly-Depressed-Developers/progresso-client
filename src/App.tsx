import './App.scss';

import { ThemeProvider, createTheme } from '@mui/material';
import { Routes } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { MyGlobalContext } from './Provider'

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
import { TakeQuiz } from './pages/TakeQuiz';
import { Quizes } from './pages/Quizes';

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
            <MyGlobalContext.Provider value={{ loggedIn, setLoggedIn, userID, setUserID, username, setUsername }}>
                <nav>
                    <div id="left">
                        <Link to="/">Home</Link>
                        <Link to="/upload">Upload</Link>
                        <Link to="/quizes">Quizes</Link>
                        <Link to="/browser">Browse PDFs</Link>
                    </div>
                    {!loggedIn ?
                        <div id="right">
                            <Link to="/login">Login</Link>
                            <Link className='colored' to="/register">Register</Link>
                        </div>
                        :
                        <div id="right">
                            <Link to={`/user/${username}`}>{username}</Link>
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
                    <Route path='/quizes' element={<Quizes />} />
                    <Route path='/quiz/:id/take' element={<TakeQuiz />} />
                    <Route path='/file/:id' element={<File />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </MyGlobalContext.Provider>
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
