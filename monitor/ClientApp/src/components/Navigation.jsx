import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const isUserAuthenticated = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('UserId=')) {
                return true;
            }
        }
        return false;
    };

    if (!isUserAuthenticated()) {
        return null; // Если пользователь не авторизован, не отображаем навигацию
    }

    return (
        <div className="item-grid1">
            <div className="navigationUl">
                <ul>
                    <li><Link to="profile">Профиль</Link></li>
                    <li><Link to="/">Заявки на исследования</Link></li>
                    <li><Link to="workplan">План работ</Link></li>
                    <li><Link to="report">Оценка технического состояния</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;
