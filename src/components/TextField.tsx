import React from 'react';

const TextField: React.FC<{ text: string }> = ({ text }) => {
    return <div className='text'>{text}</div>;
};

export default TextField;
