import styles from './Create.module.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Create = (props) => {
    const [wellId, setWellId] = useState('');
    const [varQ, setVarQ] = useState('');
    const [varPmax, setVarPmax] = useState('');
    const [varPmin, setVarPmin] = useState('');
    const [varN, setVarN] = useState('');
    const [varL, setVarL] = useState('');
    const [varKpod, setVarKpod] = useState('');
    const [varKnap, setVarKnap] = useState('');
    const [varG, setVarG] = useState('');
    const [opinion, setOpinion] = useState('');
    const [typeDevice, setTypeDevice] = useState('');
    const [wellList, setWellList] = useState([]);
    const [excelFile, setExcelFile] = useState(null);

    useEffect(() => {
        fetchWellList();
    }, []);

    const fetchWellList = async () => {
        try {
            const response = await axios.get('/api/AddDynamogram/GetWellList');

            if (response.status === 200) {
                setWellList(response.data);
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
            varQ,
            varPmax,
            varPmin,
            varN,
            varL,
            varKpod,
            varKnap,
            varG,
            opinion,
            typeDevice,
            // остальные поля Dynamogram
            userId: getUserIdFromCookie(),
        };

        try {
            const response = await axios.post('/api/AddDynamogram/PostDynamogram', dynamogramData);

            if (response.status === 200) {
                console.log('Данные Dynamogram успешно отправлены на сервер');
                // Дополнительная обработка после успешной отправки
                window.location.reload();
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

    const handleWellIdChange = (event) => {
        setWellId(event.target.value);
    };

    const handleFileChange = (event) => {
        setExcelFile(event.target.files[0]);
    };

    const handleSubmitImport = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('excelFile', excelFile);
        formData.append('userId', getUserIdFromCookie());
        formData.append('wellId', wellId);

        try {
            const response = await axios.post('/api/AddDynamogram/ImportFromExcel', formData);

            if (response.status === 200) {
                window.location.reload();
                // Обработка успешного ответа
            } else {
                // Обработка ошибки
            }
        } catch (error) {
            // Обработка ошибки
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.create}>
                <div className={styles.createBlock}>
                    <div className={styles.createLab}>
        <div>
            <h2>Создание Dynamogram</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.gridTab}>
                                    < div className={styles.grid1}>
                <div>
                    <label>Well ID:</label>
                    <select value={wellId} onChange={handleWellIdChange}>
                        {wellList.map((well) => (
                            <option key={well.wellId} value={well.wellId}>
                                {well.name}
                            </option>
                        ))}
                    </select>
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
                <div>
                    <label>varN:</label>
                    <input type="text" value={varN} onChange={(e) => setVarN(e.target.value)} />
                </div>
                <div>
                    <label>varL:</label>
                    <input type="text" value={varL} onChange={(e) => setVarL(e.target.value)} />
                                    </div>
                                </div>
                                    < div className={styles.grid2}>
                <div>
                    <label>varKpod:</label>
                    <input type="text" value={varKpod} onChange={(e) => setVarKpod(e.target.value)} />
                </div>
                <div>
                    <label>VarKnap:</label>
                    <input type="text" value={varKnap} onChange={(e) => setVarKnap(e.target.value)} />
                </div>
                <div>
                    <label>VarG:</label>
                    <input type="text" value={varG} onChange={(e) => setVarG(e.target.value)} />
                </div>
                <div>
                    <label>TypeDevice:</label>
                    <input type="text" value={typeDevice} onChange={(e) => setTypeDevice(e.target.value)} />
                </div>
                <div>
                    <label>Opinion:</label>
                    <input type="text" value={opinion} onChange={(e) => setOpinion(e.target.value)} />
                                        </div>
                                    </div>
                                    </div>
                                {/* остальные поля Dynamogram */}
                                <div className={styles.createButton}>
                                    <div className={styles.inputButton4}>
                                        <button type="submit">Отправить</button>
                                    </div>
                                    <div className={styles.inputButton3}>
                                        <button onClick={props.onClose} type="button" value='Отменить' >Отменить</button>
                                    </div>
                                </div>
            </form>

                <form onSubmit={handleSubmitImport} encType="multipart/form-data" className="">
                    <div className="">
                    <label className="">Выберите скважину</label>
                    <select value={wellId} onChange={handleWellIdChange}>
                        {wellList.map((well) => (
                            <option key={well.wellId} value={well.wellId}>
                                {well.name}
                            </option>
                        ))}
                    </select>
                </div>

                    <div>
                                    <label className="">Выберите файл Excel</label>
                                    <div className="inputDate">
                    <input
                        type="file"
                        name="excelFile"
                        onChange={handleFileChange}
                                        className="search-block3"
                        accept=".xlsx, .xls"
                        required
                    />
                                    </div></div>

                <div className={styles.inputButton4}>
                     <button type="submit" value="Импортировать" className="btn btn-success me-md-2">Импортировать</button>
                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
