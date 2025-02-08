import React,{useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Service from './pages/Services/Service';
import Practice from './pages/Practices/Practice';
import Portfolio from './pages/Portfolio/Portfolio';
import Innovation from './pages/Innovation/Innovation';
import Error404 from './pages/Error404';
import Header from './components/Header/Header';
import Topnav from './components/Topnav/Topnav';
import Footer from './components/Footer/Footer';
import Clients from './innerPages/Clients';

const App = () => {

  return (
    <>
       <BrowserRouter>
          <Topnav />
          <Header />
          <Routes>

            {/*----All main pages' routes are declared below----*/}
            <Route path="/" exact element={<Home />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/contact' exact element={<Contact />} />
            <Route path='/service' exact element={<Service />} />
            <Route path='/practice' exact element={<Practice />} />
            <Route path='/portfolio' exact element={<Portfolio />} />
            <Route path='/innovation' exact element={<Innovation />} />

            {/*----Inner pages' routes are declared below----*/}
            <Route path='/clients' exact element={<Clients />} />
            <Route path='*' element={<Error404 />} />
            
          </Routes>
          <Footer />
       </BrowserRouter>
    </>
  )
};

export default App;
