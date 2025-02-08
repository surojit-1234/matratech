import React,{ 
  useState, 
  useEffect, 
  useCallback 
} from 'react';
import BannerSection from '../../components/Topbanner/BannerSection';
import ContactSection from '../../components/Contact/ContactSection';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAos from '../../hooks/useAos';
import Datafetching from '../Datafetching';
import { FiPlus } from "react-icons/fi";
import './sass/Style.css';
import PageLoader from '../../components/Pageloader/PageLoader';


const Service = () => {
  const [baseImage, setBaseImage] = useState('https://backend.matratech.in/uploads');
  const [activeIndex, setActiveIndex] = useState(null); // Track the active card index
  const [serviceCardContent, setServiceCardContent]=useState([]);
  const [serviceContent, setServiceContent] = useState();
  const [serviceBottomContent, setServiceBottomContent] = useState([]);
  const[isApiLoad, setIsApiLoad] = useState(true);

  useEffect(()=> {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[]);

  const handleFlipCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active card
  }

  useAos();

  useEffect(()=> {
     console.log(serviceBottomContent);
  },[serviceBottomContent]);

  return (
    <main>
     
    { isApiLoad && <PageLoader /> }

    <BannerSection title="our services" />
    <hr style={{color:'#333333'}}/>


    <Datafetching API="https://backend.matratech.in/api/skservice" 
      onChildData={useCallback((allServices)=> {
      setServiceCardContent(allServices.top_part);
    },[])} />


        <Container fluid className='service_wrap'>
           <Row className='row-gap-4'>
             {serviceCardContent?.map((info,index)=>
                <Col lg={4} md={6} key={index}>
                  <div data-aos="flip-left" className="flip-card" onClick={()=>handleFlipCard(index)}>
                      <div className="flip-card-inner" 
                        style={{transform: (activeIndex === index) ? 'rotateY(180deg)':'rotateY(0deg)'}}>
                          <div className="flip-card-front">
                            <h1>{info.title}</h1>
                              <div className='card_footer'>
                                <p>info</p>
                                <FiPlus />
                              </div>
                          </div>
                          <div className="flip-card-back">
                            <ul>
                              {info.info.map((list,index)=> {
                                  return(
                                    list && (
                                     <li key={index}>{list}</li>
                                    )
                                  )
                              })}
                            </ul>
                          </div>
                      </div>
                  </div>
                </Col>
             )}
           </Row>
        </Container>


      <Datafetching API="https://backend.matratech.in/api/skservice" 
      onChildData={useCallback((allServices)=> {
      setServiceContent(allServices.content);
      console.log(allServices.content);
      },[])} />

        <section className='more-service-wrap'>
            <div className='heading'>
                <h1 data-aos="fade-up">WHY US?</h1>
                <span data-aos="fade-in">
                  {serviceContent?.data_value}
                </span>
            </div>

            <Datafetching API="https://backend.matratech.in/api/skservice" 
              onChildData={useCallback((allServices)=> {
              setServiceBottomContent(allServices.below_part);
              setIsApiLoad(false);
            },[])} />

              {serviceBottomContent && serviceBottomContent.map((detail,index)=>
                <Container fluid className='parent' key={index}>
                    <h4 data-aos="fade-up">{detail.name}</h4>
                    <Row className='mb-5 justify-content-between'>
                        {detail.our_service_p3s.map((val,index)=> {
                          const{title, content, image} = val;
                          return (
                            <Col data-aos="fade-up" lg={4} md={6} className='child' key={index}>
                              <img src={`${baseImage}/${image}`} alt='logo' />
                              <h5>{title}</h5>
                              <p>{content}</p>
                            </Col>
                          )
                        })}
                    </Row>
                </Container>
              )}
        </section>
        <ContactSection />
    </main>
  )
}

export default Service;