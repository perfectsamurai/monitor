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
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [role, setRole] = useState(null);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    useEffect(() => {
        // Получение значения UserId, Phone и Email из куков
        const cookies = document.cookie.split(';');
        let foundEmail = null;
        let foundPhone = null;
        let foundUserId = null;
        let foundLastName = null;
        let foundFirstName = null;

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('UserId=')) {
                foundUserId = cookie.substring('UserId='.length, cookie.length);
            }
            if (cookie.startsWith('Phone=')) {
                foundPhone = cookie.substring('Phone='.length, cookie.length);
            }
            if (cookie.startsWith('Email=')) {
                foundEmail = cookie.substring('Email='.length, cookie.length);
            }
            if (cookie.startsWith('LastName=')) {
                foundLastName = cookie.substring('LastName='.length, cookie.length);
            }
            if (cookie.startsWith('FirstName=')) {
                foundFirstName = cookie.substring('FirstName='.length, cookie.length);
            }
        }
        foundEmail = decodeURIComponent(foundEmail);
        foundPhone = decodeURIComponent(foundPhone);
        foundLastName = decodeURIComponent(foundLastName);
        foundFirstName = decodeURIComponent(foundFirstName);
        // Установка значения UserId, Phone и Email в состояние
        setUserId(foundUserId);
        setPhone(foundPhone);
        setEmail(foundEmail);
        setFirstname(foundFirstName);
        setLastname(foundLastName);

        axios.get(`/api/Account/GetRole/${foundUserId}`)
            .then(response => {
                const roleName = response.data.name;
                setRole(roleName);
            })
            .catch(error => {
                console.error('Ошибка запроса', error);
            });
    }, []);

    return (
        <div className="item-grid2">
            <div className="userBLock">
                <div className="userPhoto">
                    <img src="/img/user.png" alt="Фотография" />
                </div>
                <div className="user-block">
                    <h1>UserId: {userId}</h1>
                    <h3>{role}</h3>
                    <div>
                        <h2> {firstname} {lastname}</h2>
                        <p>Телефон : {phone}</p>
                        <p>Почта : {email}</p>
                    </div>
                    <div className="inputButtonUser">
                        <input type="button" value="Редактировать" />

                        <button onClick={handleLogout}>Выход</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;