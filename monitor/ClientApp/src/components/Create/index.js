import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Create = () => {
    const [wellId, setWellId] = useState('');
    const [date, setDate] = useState('');
    const [varQ, setVarQ] = useState('');
    const [varPmax, setVarPmax] = useState('');
    const [varPmin, setVarPmin] = useState('');
    const [wellList, setWellList] = useState([]); // Список записей из таблицы Well

    useEffect(() => {
        fetchWellList(); // Получение списка Well при загрузке компонента
    }, []);

    const fetchWellList = async () => {
        try {
            const response = await axios.get('/api/AddDynamogram/GetWellList'); // Запрос списка Well

            if (response.status === 200) {
                setWellList(response.data); // Установка полученного списка в состояние
            } else {
                console.error('Ошибка при получении списка Well');
            }
        } catch (error) {
            console.error('Ошибка запроса', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dynamogramData = {
            wellId,
            date,
            varQ,
            varPmax,
            varPmin,
            // остальные поля Dynamogram
            userId: getUserIdFromCookie(),
        };

        try {
            const response = await axios.post('/api/AddDynamogram/PostDynamogram', dynamogramData);

            if (response.status === 200) {
                console.log('Данные Dynamogram успешно отправлены на сервер');
                // Дополнительная обработка после успешной отправки
            } else {
                console.error('Ошибка при отправке данных Dynamogram на сервер');
            }
        } catch (error) {
            console.error('Ошибка запроса', error);
        }
    };

    const getUserIdFromCookie = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('UserId=')) {
                return cookie.substring('UserId='.length, cookie.length);
            }
        }
        return null;
    };

  


    return (
        <div>
            <h2>Создание Dynamogram</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Well ID:</label>
                    <select value={wellId} onChange={(e) => setWellId(e.target.value)}>
                        {wellList.map((well) => (
                            <option key={well.wellId} value={well.wellId}>
                                {well.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>VarQ:</label>
                    <input type="text" value={varQ} onChange={(e) => setVarQ(e.target.value)} />
                </div>
                <div>
                    <label>VarPmax:</label>
                    <input type="text" value={varPmax} onChange={(e) => setVarPmax(e.target.value)} />
                </div>
                <div>
                    <label>VarPmin:</label>
                    <input type="text" value={varPmin} onChange={(e) => setVarPmin(e.target.value)} />
                </div>
                {/* остальные поля Dynamogram */}
                <button type="submit">Отправить</button>
            </form>
          
        </div>
    );
};

export default Create;
