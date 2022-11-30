import React from 'react';
import './styles/App.css';
import './components/TextField';
import TextField from './components/TextField';

const App: React.FC = () => {
    return (
        <div className='App font-bold text-green-200'>
            <TextField text='Random text inside of textfield' />
        </div>
    );
};

export default App;
