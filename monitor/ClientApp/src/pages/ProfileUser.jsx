import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Логика выхода из аккаунта
        navigate('/auth'); // Перенаправление на страницу аутентификации после выхода
    };

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default ProfileUser;