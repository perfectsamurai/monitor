import styles from './Table.module.scss';
import React from 'react';



function Table(props) {

    return (
    <div className={styles.table}>

      <table cellPadding="0" cellSpacing="0" border="0">
      <tbody>
        <tr>
        <td>{props.id}</td>
        <td>{props.ngdu}</td>
        <td>{props.seh}</td>
        <td>{props.skva}</td>
        <td>{props.date}</td>
        <td>{props.time}</td>
        <td className="table-td-pr">{props.prishina}</td>
        <td>{props.grup}</td>
        <td>{props.status}</td>
        <td><input onClick={() => props.setEditingOpened(true)} type="button" value='Редактировать' className="table-block3"/></td>
        <td><input type="button" value='Удалить' className="table-block4"/></td>
        </tr>
      </tbody>
      </table>
    </div>
    );
  }
  
export default Table;