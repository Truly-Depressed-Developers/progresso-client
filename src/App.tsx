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

function Inside() {
    return (
        <div className="App">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/random">Random</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/user/1">User</Link>
                <Link to="/browser">Browse PDFs</Link>
            </nav>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/user/:id" element={<User />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/browser' element={<Browser />} />
                <Route path='/file/:id' element={<File />} />
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
