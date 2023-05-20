
import './index.scss';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

import ProfileUser from './pages/ProfileUser';


function Profile(props) {
  return (
    <div className="wrapper clear">
        <Header />
        <div className="content p-30">
            <div className='container'>
                <Navigation />
                <ProfileUser />
                <div className="item-grid1 contentBLock mb-40">
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
}


export default Profile;
