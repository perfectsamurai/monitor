import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div className="item-grid1">
            <div className="navigationUl">
                <ul>
                    <li><Link to="profile">Профиль</Link></li>
                    <li><Link to="/">Заявки на исследования</Link></li>
                    <li><a href="#news">План работ</a></li>
                    <li><a href="#contact">Оценка технического состояния</a></li>
                </ul>
            </div>
        </div>
    );
  }
  
export default Navigation;