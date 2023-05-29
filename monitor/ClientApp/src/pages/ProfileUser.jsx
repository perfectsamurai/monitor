import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileUser = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {

        try {
            const response = await axios.post('/api/Account/Logout');
           
            if (response.status === 200) {
                // Успешный выход
                // Дополнительная логика после выхода
                navigate('/auth'); // Переход на страницу Profile.
                window.location.reload();

            } else {
                // Ошибка выхода
                console.error('Ошибка выхода');
            }
        } catch (error) {
            console.error('Ошибка запроса', error);
        }
    }

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Получение значения UserId из куков
        const cookies = document.cookie.split(';');
        let foundUserId = null;
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('UserId=')) {
                foundUserId = cookie.substring('UserId='.length, cookie.length);
                break;
            }
        }

        // Установка значения UserId в состояние
        setUserId(foundUserId);
    }, []);

    return (
        <div className="item-grid2">
            <div className="userBLock">
                <div className="userPhoto">
                    <img src="/img/user.png" alt="Фотография" />
                </div>
                <div className="user-block">
                    <h1>UserId: {userId}</h1>
                    <h3>Технолог</h3>
                    <div>
                        <p>Исследования на ремонт / 3 шт</p>
                        <p>Выполненно работ / 25 шт</p>
                        <p>Телефон / 8 (8553) 53-53-53</p>
                        <p>Почта / user@tatneft.com</p>
                    </div>
                    <div className="inputButtonUser">
                        <input type="button" value="Редактировать" />
                    </div>
                    <div className="inputButtonUser">
                        <button onClick={handleLogout}>Выход</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
