import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import Create from '../components/Create';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Search from '../components/Search';
import Editing from '../components/Editing';

const App = () => {
    const [dynamograms, setDynamograms] = useState([]);
    const [createOpened, setCreateOpened] = useState(false);
    const [editingOpened, setEditingOpened] = React.useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/api/DynamogramContoller/GetDynamograms")
            .then((response) => {
                setDynamograms(response.data);
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
        const data = dynamograms.map(item => ({
            IdEmployee: item.dynamogramId,
            Name: item.well.name,
            Email: `${item.user.firstName} ${item.user.lastName}`,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Dynamograms');
        XLSX.writeFile(workbook, 'dynamograms.xlsx');
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
            {createOpened ? <Create onClose={() => setCreateOpened(false)} /> : null}
            {editingOpened ? <Editing onClose={() => setEditingOpened(false)} /> : null}
            <div className="item-grid2">
                <div className="sort">
                    <div className="inputDate ">
                        <h5>period:</h5>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <input className="search-block3" type="button" onClick={handleFilter} value="filtr" />
                    </div>
                </div>
                <div className="sort">
                    <div onClick={() => setCreateOpened(true)} className="inputButton search-block2 ">
                        <img height={20} width={20} src='img/plus.png' alt='+' />
                        <input type="button" value='create' />
                    </div>

                    <div className="inputButton search-block4 ">
                        <input type="button" onClick={handleExport} value="export" />
                    </div>
                </div>
                <div className="contentBLock">
                    <Categories />
                    <Search />
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
                                <th>Phone</th>
                                <th>Phone</th>
                                <th>Phone</th>
                                <th>Phone</th>
                                <th>Phone</th>
                                <th>Phone</th>
                                <th>Phone</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dynamograms.map((item) => (
                                <tr key={item.dynamogramId}>
                                    <td>{item.well.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.varQ}</td>
                                    <td>{item.varPmax}</td>
                                    <td>{item.varPmin}</td>
                                    <td>{item.typeDevice}</td>
                                    <td>{item.varN}</td>
                                    <td>{item.varL}</td>
                                    <td>{item.varKpod}</td>
                                    <td>{item.opinion}</td>
                                    <td>{item.varG}</td>
                                    <td>{item.varKnap}</td>
                                    <td>{item.user.firstName} {item.user.lastName}</td>
                                    <td><input onClick={() => setEditingOpened(true)} type="button" value='edit' className="table_edit" /></td>
                                    <td><input type="button" value='delite' className="table_delete" /></td>
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
