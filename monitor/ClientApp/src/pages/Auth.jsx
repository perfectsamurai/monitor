import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 200) {
                // Успешная авторизация
                console.log('Успешная авторизация');
                setLoggedIn(true);
            } else {
                // Ошибка авторизации
                console.error('Ошибка авторизации');
            }
        } catch (error) {
            console.error('Ошибка запроса', error);
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setEmail('');
        setPassword('');
    };

    if (loggedIn) {
        return (
            <div>
                <h1>Профиль</h1>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        );
    }

    return (
        <div className="contentBLockAuto mb-40">
            <div className='wrapperAuto'>
                <div className='autoBlock'>
                    <h1 className='autoH'>Авторизация</h1>
                    <input
                        type="text"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        placeholder='Пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <button onClick={handleLogin}>Войти</button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
