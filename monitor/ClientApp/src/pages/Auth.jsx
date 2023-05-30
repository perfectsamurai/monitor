import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();




    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/Account/Login', { Email, Password });

            if (response.status === 200) {
                // Успешная авторизация
                console.log('Успешная авторизация');

                navigate('/profile'); // Переход на страницу Profile.js
                window.location.reload();



            } else {
                // Ошибка авторизации
                console.error('Ошибка авторизации');
            }
        } catch (error) {
            console.error('Ошибка запроса', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <form onSubmit={handleSubmit} className="contentBLockAuto mb-40">
            <div className="wrapperAuto">
                <div className="autoBlock">

                    <h1 className="autoH">Авторизация</h1>
                    <input
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        className="form-control"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <button>Войти</button>

                </div>
            </div>
        </form>
    );
};

export default Auth;