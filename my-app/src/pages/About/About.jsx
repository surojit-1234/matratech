import React,{useEffect, useState, useCallback} from 'react';
import BannerSection from '../../components/Topbanner/BannerSection';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './sass/Style.css';
import ContactSection from '../../components/Contact/ContactSection';
import Learnmore from '../../components/Buttons/Learnmore';
import Fancybox from '../Fancybox';
import useAos from '../../hooks/useAos';
import Datafetching from '../Datafetching';
import PageLoader from '../../components/Pageloader/PageLoader';
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const About = () => {

  const[baseImage, setBaseImage] = useState("https://backend.matratech.in/uploads");
  const[toggleForm, setToggleForm] = useState(false);
  const[aboutContent, setAboutContent] = useState({});
  const[isApiLoad, setIsApiLoad]  = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useAos() //For AOS animation on scrolling...

  return (
    <main>

      {isApiLoad && <PageLoader />} 

      <BannerSection title="about us" />

      <hr style={{color:'#333333'}}/>

      <Datafetching API="https://backend.matratech.in/api/about" 
      onChildData={useCallback((aboutDetails)=> {
        console.log("about-info", aboutDetails); 
        setAboutContent(aboutDetails);
        setIsApiLoad(false);
      },[])} />


        <Container fluid className='overview-wrap px-md-5 px-3'>
          <Row>
             <Col lg={6}>
                <div className='heading'>
                   <h1 data-aos='fade-up'>Overview</h1>
                   <span>{aboutContent.overview?.smallText}</span>
                </div>
             </Col>
             <Col lg={6}>
                <div className='para'>
                  <p>{aboutContent.overview?.para}</p>
                </div>
             </Col>
          </Row>
        </Container>

        <section className='achivements-wrap'>
           <h1 data-aos='fade-up'>Awards & Achivements</h1>
           <span data-aos='fade-up'>{aboutContent.overview?.awards_smalltext}</span>
            <Container fluid className='achivements-container'>
              <Row className='g-4'>
                {aboutContent.awards?.map((award)=>
                  <Col lg={4} md={6} key={award.id}>
                    <Card>
                        <Fancybox options={{ Carousel: { infinite: false,},}}>
                          {/* <Card.Img 
                          data-aos="zoom-in" 
                          data-fancybox="awards" 
                          data-caption={award.title} 
                          variant="top" 
                          src={award.img} /> */}
                          <LazyLoadImage 
                            className='img-fluid w-100'
                            data-fancybox="awards" 
                            data-caption={award.title} 
                            variant="top" 
                            src={`${baseImage}/${award.image}`}
                            effect="blur"
                            wrapperProps={{
                              style: {transitionDelay: ".5s"},
                            }}
                          />
                        </Fancybox>
                        <Card.Body>
                          <Card.Title data-aos="fade-in">{award.year}</Card.Title>
                          <Card.Title data-aos="fade-in">{award.title}</Card.Title>
                          <Card.Text data-aos="fade-in">{award.content}</Card.Text>
                        </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
           </Container>
        </section>

        <Container fluid className='career-wrap'>
            <Row className='mb-5'>
                <Col lg={6}>
                    <div className='heading'>
                       <h1 data-aos='fade-up'>Career</h1>
                       <span>{aboutContent.career?.small_text}</span>
                    </div>
                </Col>

                <Col lg={6}>
                    <div className='para'>
                      <p data-aos='fade-up'>
                        {aboutContent.career?.content.split(' ').map((word, index) => (
                            word === "hr@mayabious.com" ? (
                              <a href='mailto:hr@mayabious.com' key={index} style={{ color: '#00c9fc', textDecoration:'none', cursor:"pointer" }}>
                                <b>{word} &nbsp;</b>
                              </a>
                            ) : (
                              <span key={index}>{word} </span>
                            )
                        ))}
                      </p>
                    </div>
                </Col>
            </Row>

            <Container>
                <Row>
                  <Col data-aos='fade-up'>
                    {/* <img src={careerDetails[0].img} alt='imge not found' className='img-fluid'/> */}
                    <LazyLoadImage 
                      className='img-fluid w-100'
                      src={`${baseImage}/${aboutContent.career?.image}`}
                      effect="blur"
                      wrapperProps={{
                      style: {transitionDelay: ".5s"},
                      }}
                    />
                  </Col>
                </Row>

              {toggleForm ? <></> : 
                <div className="d-flex justify-content-center" onClick={()=>{setToggleForm(!toggleForm)}}>
                    <Learnmore 
                    className='p-3'
                    name="Lets' Apply"
                    color="#000000" />
                </div>
              }
            </Container>
        </Container>

     {toggleForm &&  
     <div className="container-fluid" data-aos="fade-up">
        <div className="apply_box">
            <h1>Job application</h1>
            <form>
                <div className="form_container">
                    <div className="form_control">
                        <label for="first name">First name</label>
                        <input id="first name" placeholder="Enter  name"/>
                    </div>
                    <div className="form_control">
                        <label for="Last name">Last name</label>
                        <input id="Last name" placeholder="Last name"/>
                    </div>
                    <div className="form_control">
                        <label htmlFor="email  ">Email</label>
                        <input type="email
                        " id="email" placeholder="Enter email"/>
                    </div>
                    <div className="form_control">
                        <label htmlFor="job">Job Role</label>
                        <select id="job">
                            <option value="">Select Job Role</option>
                            <option value="">Fronted Devloper</option>
                            <option value="">Backend Devloper</option>
                            <option value="">Full stack Devloper</option>
                            <option value="">UI IX Designer</option>S
                        </select>
                    </div>
                    <div className="textarea_control">
                        <label htmlFor="address  ">Address</label>
                        <textarea id="address" name="address" row="4" cols="50" placeholder="Enter address"></textarea>
                    </div>
                    <div className="form_control">
                        <label htmlFor="city">City</label>
                        <input name="city"  id=" city" placeholder="Enter city name"/>
                    </div>
                    <div className="form_control">
                        <label htmlFor="pincode">pincode</label>
                        <input type="number" id=" pincode" placeholder="Enter Pincode Number"/>
                    </div>
                    <div className="form_control">
                        <label htmlFor="date">Date</label>
                        <input value="2023-02-15" type="date" id=" date" placeholder="Enter city name"/>
                    </div>
                    <div className="form_control">
                        <label htmlFor="Upload">Upload Your CV</label>
                        <input type="file" id="upload" name="upload"/>
                    </div>
                </div>
                <div className="button_container">
                    <button type="submit" onClick={()=> setToggleForm(false)}>Apply now</button>
                </div>
            </form>
        </div>
    </div>
    }
      <ContactSection />
    </main>
  )
}

export default About;