import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="p-30">
      <div className="headerLeft">
        <div className="headerLogo">
          <img src='/img/logo2.png' alt='логотип'/>
        </div>
        <div className="headerInfo">
          <h3>Система мониторинга</h3>
          <p>Автоматическое диагностирование оборудования </p>
        </div>
      </div>
      <ul className="headerRight pt-15">
        <Link to="auth">Закиев Ризван Робертович</Link>
      </ul>
     </header>
  );
}

export default Header;