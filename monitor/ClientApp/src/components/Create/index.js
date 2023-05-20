import styles from './Create.module.scss';

function Create(props) {
    return (
        <div className={styles.overlay}>
            <div className={styles.create}>
                <div className={styles.createBlock}>
                    <h3>Новое исследование</h3>
                    <div className={styles.createLab}>
                        <label>НГДУ</label>
                        <select>
                            <option value="">Выберите из списка</option>
                            <option value="">АН</option>
                            <option value="">АД</option>
                            <option value="">ХН</option>
                            <option value="">НД</option>
                            <option value="">АО</option>
                        </select>
                        <label>Цех</label>
                        <select>
                            <option value="">Выберите из списка</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                        </select>
                        <label>Скважина</label>
                        <select>
                            <option value="">Выберите из списка</option>
                            <option value="">49</option>
                            <option value="">50</option>
                            <option value="">51</option>
                            <option value="">52</option>
                            <option value="">53</option>
                        </select>
                        <label>Группа</label>
                        <select>
                            <option value="">Выберите из списка</option>
                            <option value="">Исследование до КРС</option>
                            <option value="">Освоение</option>
                            <option value="">Геолог. огранич</option>
                            <option value="">Консервация н/р фонда</option>
                            <option value="">Цикличка по тех.режиму</option>
                        </select>
                        <label>Входные данные</label>
                        <input type="text" placeholder='Введите данные'/>
                    </div>
                    <div className={styles.createButton}>
                        <div className={styles.inputButton3}>
                            <input onClick={props.onClose} type="button" value='Отменить'/>
                        </div>
                        <div className={styles.inputButton4}>
                            <input type="button" value='Создать заявку'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default Create;