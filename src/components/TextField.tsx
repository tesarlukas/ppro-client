import React from 'react';
import '../styles/TextField.css';

const TextField: React.FC<{ text: string }> = ({ text }) => {
    return <div className='text'>{text}</div>;
};

export default TextField;
