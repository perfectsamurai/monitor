import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    // Получение значения FirstName и LastName из куков
    const cookies = document.cookie.split(';');
    let firstName = '';
    let lastName = '';

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('FirstName=')) {
            firstName = decodeURIComponent(cookie.substring('FirstName='.length, cookie.length));
        } else if (cookie.startsWith('LastName=')) {
            lastName = decodeURIComponent(cookie.substring('LastName='.length, cookie.length));
        }
    }

    const isAuthenticated = firstName !== '' && lastName !== '';

    return (
        <header className="p-30">
            <div className="headerLeft">
                <div className="headerLogo">
                    <img src='/img/logo2.png' alt='логотип' />
                </div>
                <div className="headerInfo">
                    <h3>Система мониторинга</h3>
                    <p>Автоматическое диагностирование оборудования </p>
                </div>
            </div>
            <ul className="headerRight pt-15">
                {isAuthenticated ? (
                    <li>
                        {`${firstName} ${lastName}`}
                    </li>
                ) : (
                    <li>
                        <Link to="auth">Логин</Link>
                    </li>
                )}
            </ul>
        </header>
    );
}

export default Header;
