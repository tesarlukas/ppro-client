import React, { createContext, useState } from 'react';
import './styles/App.css';
import './components/TextField';
import './styles/global.css';
import Home from './routes/Home';
import Error from './routes/Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import FilmWorks from './routes/FilmWorks';
import FilmWork from './routes/FilmWork';
import Person from './routes/Person';
import Header from './components/Header';
import UserProfile from './routes/UserProfile';
import CreateEdit from './routes/CreateEdit';
import CreateEditPerson from './routes/CreateEditPerson';
import { UserContextProvider } from './context';


const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <UserContextProvider>
                    <Header />
                    <div className="w-screen flex flex-col">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/filmworks" element={<FilmWorks />} />
                            <Route
                                path="/filmwork/:id"
                                element={<FilmWork />}
                            />
                            <Route path="/person/:id" element={<Person />} />
                            <Route path="/user/:id" element={<UserProfile />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/create" element={<CreateEdit />} />
                            <Route path="/edit/:id" element={<CreateEdit />} />
                            <Route path="*" element={<Error />} />
                            <Route path="/person/edit/:id" element={<CreateEditPerson />} />
                            <Route path="/person/create" element={<CreateEditPerson />} />
                        </Routes>
                    </div>
                </UserContextProvider>
            </Router>
        </div>
    );
};

export default App;
