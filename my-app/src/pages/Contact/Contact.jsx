import React, {
  useEffect, 
  useCallback, 
  useState
} from 'react';
import BannerSection from '../../components/Topbanner/BannerSection';
import ContactSection from '../../components/Contact/ContactSection';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoLocationOutline } from "react-icons/io5";
import { TbPhoneCall } from "react-icons/tb";
import { SlEnvolope } from "react-icons/sl";
import Datafetching from '../Datafetching';
import './sass/Style.css';
import useAos from '../../hooks/useAos';
import PageLoader from '../../components/Pageloader/PageLoader';

const Contact = () => {
  const[contactInfo, setContactInfo]=useState({})
  const[isApiLoad, setIsApiLoad] = useState(true);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, []);

  useAos(); //For AOS animation on scrolling...

  return (
    <main>
      { isApiLoad && <PageLoader /> }

      <BannerSection title="contact us" />
      <hr style={{color:'#333333'}} />

      <Datafetching API="https://backend.matratech.in/api/contact-us-data" 
      onChildData={useCallback((contactDetails)=> {
        console.log("contact-info",contactDetails); 
        setContactInfo(contactDetails);
        setIsApiLoad(false);
      },[])} />

        <Container fluid className='location-wrap'>
          <Row>
              <Col lg={6}>
                <div className='address'>
                    <div className='heading'>
                      <h1 data-aos="fade-up">{contactInfo.heading}</h1>
                      <span data-aos="fade-in">{contactInfo.subheading}</span>
                    </div>
                    <div className='info'>
                        <div data-aos="fade-up">
                          <IoLocationOutline />
                          <p>
                            <a style={{textDecoration:'none'}} href='https://www.google.com/maps/place/Mayabious+Art+Kolkata/@22.5777019,88.4332624,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0275a1687fa625:0x24b4a3166a23939f!8m2!3d22.577697!4d88.4378758!16s%2Fg%2F12hl2kn3x?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoJLDEwMjExMjM0SAFQAw%3D%3D'>
                              {contactInfo.address}
                            </a>
                          </p>
                        </div>
                        {/* <div data-aos="fade-up">
                          <TbPhoneCall />
                          <p>
                            <a style={{textDecoration:'none'}} href='tel:+91 33 3256 4291'>
                              {contactInfo.mobile}
                            </a>
                          </p>
                        </div>
                        <div data-aos="fade-up">
                          <SlEnvolope />
                          <p>
                            <a style={{textDecoration:'none'}} href='mailto:matratech.com'>
                              {contactInfo.email}
                            </a>
                          </p>
                        </div> */}
                    </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className='map' data-aos="fade-up">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0374681090098!2d88.43530087443355!3d22.577701932784834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275a1687fa625%3A0x24b4a3166a23939f!2sMayabious%20Art%20Kolkata!5e0!3m2!1sen!2sin!4v1729684156011!5m2!1sen!2sin" 
                    title='abc'
                    width="100%" 
                    height="auto" 
                    style={{border:0}} 
                    // allowfullscreen="" 
                    loading="lazy" >
                  </iframe>
                </div>
              </Col>
          </Row>
        </Container>
      <ContactSection />
    </main>
  )
}

export default Contact; 