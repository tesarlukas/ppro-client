import React from 'react';
import './styles/App.css';
import './components/TextField';
import './styles/global.css';
import Home from './routes/Home';
import Error from './routes/Error';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import FilmWorks from './routes/FilmWorks';
import FilmWork from './routes/FilmWork';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <header className="flex bg-white w-screen h-24 justify-between items-center p-4">
                    <Link to="/">
                        <h1 className="text-black">Movie Database</h1>
                    </Link>
                    <nav>
                        <Link
                            className="text-black p-2 text-lg"
                            to="/filmworks"
                        >
                            Listing
                        </Link>
                        <Link className="text-black p-2 text-lg" to="/login">
                            Login
                        </Link>
                        <Link className="text-black p-2 text-lg" to="/register">
                            Register
                        </Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/filmworks" element={<FilmWorks />} />
                    <Route path="/filmwork/:id" element={<FilmWork />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
