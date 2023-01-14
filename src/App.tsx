import './App.scss';

import { ThemeProvider, createTheme } from '@mui/material';
import { Routes } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function Inside() {
    return (
        <div className="App">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/random">Random</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
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
