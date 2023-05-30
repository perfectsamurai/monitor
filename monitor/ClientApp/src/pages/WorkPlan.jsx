import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

const App = () => {
    const [advices, setAdvices] = useState([]);
    const navigate = useNavigate();

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

    return (

         
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-striped">
                            <thead>
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
                        <button onClick={handleExport}>Export</button>
                    </div>
                </div>
            </div>
      
    );
};

export default App;
