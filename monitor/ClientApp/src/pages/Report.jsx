import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Получаем данные таблицы через fetch
        fetch('https://638a87c57220b45d227e7bb5.mockapi.io/table?')
            .then(res => res.json())
            .then(data => {
                const statuses = ['В работе', 'С ошибкой', 'Исправленный'];
                let counts = [5, 2, 3];

                // Считаем кол-во вышек по статусам
                data.forEach((row) => {
                    const status = row['Статус'];
                    const index = statuses.indexOf(status);
                    if (index !== -1) {
                        counts[index]++;
                    }
                });

                // Преобразуем данные для графика
                let chartData = [];
                for (let i = 0; i < statuses.length; i++) {
                    chartData.push({ name: statuses[i], count: counts[i] });
                }

                // Обновляем график
                setChartData(chartData);
            });
    }, []);

    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Количество', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Статусы" fill="#8884d8" />
        </BarChart>
    );
}
export default Chart;