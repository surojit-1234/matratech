import React, { useState, useEffect, useCallback } from 'react';
import BannerSection from '../../components/Topbanner/BannerSection';
import ContactSection from '../../components/Contact/ContactSection';
import btnDesc from './Info/btnInfo';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import innovationImg from '../../assets/Images/innovation.jpg';
import './sass/Style.css';
import Datafetching from '../Datafetching';

import useAos from '../../hooks/useAos';
import PageLoader from '../../components/Pageloader/PageLoader';

const Innovation = () => {

  // Manage the active tab with useState
  const [activeTab, setActiveTab] = useState(btnDesc[0].id); // Set default active tab to the first button's id
  const [iframeInfo, setIframeInfo] = useState([]);
  const[isApiLoad, setIsApiLoad] = useState(true);
  /*_____PAGE GO TO TOP BY DEFAULT____*/

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);



  useAos();

  // Handle the active tab change when a button is clicked
  const handleTabChange = function(id){
    setActiveTab(id);
  }

  return (
    <main>
      { isApiLoad && <PageLoader /> }

      <BannerSection title="Innovation" />

      <hr style={{ color: '#333333' }} />

      {/*________All Buttons________*/}
      <Container fluid className='btn-container'>
        <Row className='d-flex justify-content-center'>
          {btnDesc.map((btn) => {
            const { id, name } = btn;
            return (
              <Col lg={2} xs={6} md={6} key={id}>
                <Button
                  className={`w-100 ${activeTab === id ? 'active-btn' : ''} mb-lg-5`}  // Add class to highlight active button
                  onClick={() => handleTabChange(id)} >
                  {name}
                </Button>
              </Col>
            )
          })}
        </Row>
      </Container>

      <Datafetching API="https://backend.matratech.in/api/innovation"
        onChildData={useCallback((iframe_info)=> {
        setIframeInfo(iframe_info);
        setIsApiLoad(false);
      },[])} />

      {/* Tab Content */}
      <Container fluid className='tab-content-container'>
        <Row className='tab-content'>
          {btnDesc.map((btn) => {
            const { id, name } = btn;
            return (
              <div
                key={id}
                className={`tab-pane fade ${activeTab === id ? 'show active' : ''}`}  // Show only the active tab
                id={`${name.split(' ')[0]}-tab-pane`} // Create a unique tab ID
                role="tabpanel"
                aria-labelledby="home-tab"
              >
              <div className='iframe-container'>
                {id-1==0 ? 
                 <iframe src={iframeInfo.length > 0 && iframeInfo[id-1].url} className='iframe mb-4' title="W3Schools Free Online Web Tutorials"></iframe>
                  : 
                 <h1 className='text-light mb-4'>{iframeInfo[id-1]?.url}</h1>
                }
              </div>
                {/* <h4 className='text-center text-light'>{name} Content</h4>
                <p className='text-center text-light'>Details for the {name} tab go here.</p> */}

                {/* <div className='innovation-container'>
                   <img src={innovationImg} alt='no-image' className='img-fluid'/>
                </div> */}
              </div>
            )
          })}
        </Row>
      </Container>

      <ContactSection />
    </main>
  )
}

export default Innovation;
