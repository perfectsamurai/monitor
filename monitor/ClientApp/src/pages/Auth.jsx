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
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Введите почту</label>
                <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Введите пароль</label>
                <input
                    type="password"
                    className="form-control"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Войти" className="btn btn-success" />
            </div>
        </form>
    );
};

export default Auth;
