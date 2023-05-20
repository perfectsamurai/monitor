import './index.scss';
import Header from './components/Header';
import Footer from './components/Footer';

import Auth from './pages/Auth';

function Authorization() {
  return (
    <div className="wrapper clear">
     <Header />
      <div className="content p-30">
        <Auth />
      </div>
      <Footer />
    </div>
  );
}

export default Authorization;
