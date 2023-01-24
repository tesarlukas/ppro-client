import React from 'react';
import '../styles/App.css';
import '../components/TextField';
import Header from '../components/Header';
import { LatestMovies } from '../components/LatestMovies';

const Home: React.FC = () => {
    return (
        <>
            <LatestMovies></LatestMovies>
        </>
    );
};

export default Home;
