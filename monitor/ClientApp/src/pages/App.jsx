import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Create from '../components/Create';
import * as XLSX from 'xlsx';

const App = () => {
    const [dynamograms, setDynamograms] = useState([]);
    const [createOpened, setCreateOpened] = useState(false);
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
        // ѕровер€ем, авторизован ли пользователь
        const isAuthenticated = checkAuthentication();

        // ѕеренаправл€ем на страницу авторизации, если не авторизован
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

    return (
        <>
            {createOpened ? <Create onClose={() => setCreateOpened(false)} /> : null}
            <div onClick={() => setCreateOpened(true)} className="inputButton search-block2">
                <img height={20} width={20} src='img/plus.png' alt='+' />
                <input type="button" value='—оздать' />
            </div>
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
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
                                    <th>Phone</th>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handleExport}>Export</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
