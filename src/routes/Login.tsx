import React from 'react';
import {LoginForm} from '../components/LoginForm';

export const Login: React.FC = () => {
    return (
        <div className="flex m-auto justify-center justify-self-center">
            <LoginForm/>
        </div>
    );
};

export default Login;