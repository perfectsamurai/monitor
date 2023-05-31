import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const App = () => {
    const [dynamograms, setDynamograms] = useState([]);
    const [advices, setAdvices] = useState([]);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios
            .get("/api/DynamogramContoller/GetAdvice")
            .then((response) => {
                setAdvices(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        // Проверяем, авторизован ли пользователь
        const isAuthenticated = checkAuthentication();

        // Перенаправляем на страницу авторизации, если не авторизован
        if (!isAuthenticated) {
            navigate("/auth");
        }
    }, [navigate]);

    const checkAuthentication = () => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('UserId=')) {
                return true;
            }
        }
        return false;
    };

    const handleExport = () => {
        const data = advices.map(item => ({
            IdAdvice: item.adviceId,
            Name: item.role.name,
            Text: item.adviceText.text,
            Status: item.adviceText.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Advices');
        XLSX.writeFile(workbook, 'advices.xlsx');
    };

    const handleFilter = () => {
        // Применить фильтрацию по диапазону дат
        const filteredDynamograms = dynamograms.filter(item => {
            const itemDate = new Date(item.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return itemDate >= start && itemDate <= end;
        });

        // Обновить состояние с отфильтрованными данными
        setDynamograms(filteredDynamograms);
    };

    return (
        <>
        <div className="item-grid2">
                <div className="sort">
                    <div className="inputDate ">
                        <h5>period:</h5>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input className="search-block3" type="button" onClick={handleFilter} value="filtr" />
                    </div>
                </div>
                <div className="sort2">
                    <div className="inputButton search-block4 ">
                        <input type="button" onClick={handleExport} value="export" />
                    </div>
                    <div className="contentBLock22">
                        <Search />
                    </div>
                </div>
         
                
            </div>
            <div className="item-grid1 contentBLock mb-40">
            </div>
            <section className="item-grid2">
                <div className="item-scroll">
                    <div className="table">
                        <table className="table table-striped">
                            <thead className="tbl_header">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>

                                </tr>
                            </thead>
                            <tbody>
                                {advices.map((item) => (
                                    <tr key={item.adviceId}>
                                        <td>{item.adviceText.text}</td>
                                        <td>{item.adviceText.status}</td>
                                        <td>{item.role.name}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination />
            </section>
        </>
      
    );
};

export default App;
