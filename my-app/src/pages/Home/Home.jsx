import React, { useState,  useEffect,  useRef, useCallback } from "react";
import "./sass/Style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageLoader from "../../components/Pageloader/PageLoader";
import ContactSection from "../../components/Contact/ContactSection";
import Learnmore from "../../components/Buttons/Learnmore";
import { PiPlusThin } from "react-icons/pi";
import useAos from "../../hooks/useAos";
import Datafetching from "../Datafetching";
import { LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Fancybox from '../Fancybox';
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
import ClientDetails from "../../components/Clients/ClientDetails";
import Slider from "react-slick";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const[baseImage, setBaseImage] = useState("https://backend.matratech.in/uploads");
  const[isScroll, setIsScroll] = useState(false);
  const[bannerSliders, setBannerSliders] = useState([]);
  const[homeContents, setHomeContents] = useState({});
  const[serviceDetails, setServiceDetails] = useState([]);
  const[projectDetails, setProjectDetails] = useState([]);
  const[awardDetails, setAwardDetails] = useState([])
  const[isApiLoad, setIsApiLoad] = useState(true);

  window.onscroll = function () {
    myFunction();
  };
 
  function myFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }

  const [dropdownToggle, setDropdownToggle] = useState(false); //controlling accordian button...
  const [activeIndex, setActiveIndex] = useState(null); // to active particular dropdown

  function handleDropdown(index) {
    setDropdownToggle(!dropdownToggle);
    setActiveIndex(activeIndex === index ? null : index);
  }

  

  /*_____Banner slider owl carousel(Home Page)_____*/

  var BannerSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 700,
    autoplaySpeed: 7000,
    autoplay: true,
    pauseOnHover: false,
    cssEase: "ease",
  };

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          speed: 8000,
          autoplaySpeed:1000,
        },
      },
    ],
  };

  /*______Banner slider owl carousel(Home Page)____*/

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const el1 = headingRef.current;

    gsap.fromTo(
      el1,
      { y: 0 },
      {
        y: -240,
        duration: 0.5,
        scrollTrigger: {
          trigger: el,
          start: "200", // Start animation when top of the section hits the center of the viewport
          end: "600", // End animation when the bottom hits the center
          scrub: true, // Smoothly animate as you scroll
        },
      }
    );

    const el2 = imgRef.current;
    // gsap.fromTo(
    //   el2,
    //   { rotation: -15, y: -100, opacity: .2 },
    //   {
    //     //y: -640,
    //     y: 0,
    //     rotation: 0,
    //     opacity: 1,
    //     duration: 3,
    //     scrollTrigger: {
    //       trigger: el2,
    //       // start: "top center", 
    //       // end: "bottom center", 
    //       start: "600px",
    //       end: "900px",
    //       scrub: true, // smoothly animate when you scroll
    //     },
    //   }
    // );

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleMobileView(mediaQuery) {
  if (mediaQuery.matches) {
    gsap.fromTo(
      el2,
      { 
        rotation: -10,
        y: -50,
        opacity: 0.5
      },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: el2,
          start: "top 50%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  } else {
    gsap.fromTo(
      el2,
      { 
        rotation: -15,
        y: -100,
        opacity: .2 
      },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 3,
        scrollTrigger: {
          trigger: el2,
          start: "600px",
          end: "900px",
          scrub: true,
        },
      }
    );
  }
}

mediaQuery.addListener(handleMobileView);
handleMobileView(mediaQuery);

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill();
    });
  };
}, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useAos();
 
 

  return (
    <main>

    { isApiLoad && <PageLoader /> } 

    {/* API is fetching for All sub-headings */}

    <Datafetching API="https://backend.matratech.in/api/home-content" 
      onChildData={useCallback((subHeading)=> {
      setHomeContents(subHeading);
    },[])} />

    <Datafetching API="https://backend.matratech.in/api/home-slider" 
      onChildData={useCallback((sliderInfo)=> {
      setBannerSliders(sliderInfo.sliders);
    },[])} />


  {/*=========Main Home Banner==========*/}
    <section className="main-banner">
        <Slider {...BannerSettings}>
          {bannerSliders?.map((info) => {
            const { id, title, image } = info;
            return (
              <div key={id} className="position-relative">
                <h1 className="bannerTitle" style={{ backgroundSize: isScroll ? "100% 100%" : "0% 100%" }}>
                  {title}
                </h1>
                <img className="bannerImage" src={`${baseImage}/${image}`} alt="No image found" style={{ filter: isScroll ? "grayscale(0%)" : "grayscale(50%)" }}/>
              </div>
            )
          })}
        </Slider>
    </section>

     <section className="second-sec" ref={sectionRef}>
       <div className="heading" ref={headingRef}>
         <h2>
           {homeContents.top_content?.split(' ').map((word, index) => (
                 word === "Mar-tech" ? (
                   <span key={index}>
                     {word} 
                   </span>
                 ) : (<i key={index}> {word} </i>)
             ))}
            {/* <i>{homeContents.top_content}</i>  */}
         </h2>
       </div>

       <div className="devices" ref={imgRef}>
         {/* <img src={`${baseImage}/${homeContents.responsive_img}`} alt="monitors" /> */}
         <LazyLoadImage 
          className='img-fluid w-100'
          src={`${baseImage}/${homeContents.responsive_img}`}
          effect="blur"
          wrapperProps={{
          style: {transitionDelay: ".5s"},
          }} />
       </div>

       <div className="overview-wrap">
         <h1 data-aos="fade-up">Overview</h1>
         <span data-aos="fade-up">{homeContents.overview_subtitle}</span>
         <p data-aos="fade-up">
           {homeContents.overview_content}
         </p>
         <Link to="/about">
           <Learnmore  name="Learn More" color="#000000" />
         </Link>
       </div>
     </section>

     {/*=========Clients Section=========*/}

     <section className="clents-wrap">
        <h1 data-aos="fade-up">Clients</h1>
      
        <ClientDetails startIndex={0} endIndex={10} handleAPI={(apiRes)=> console.log(apiRes)} />

        <div className="d-flex justify-content-center mt-5">
          <Link to="/clients">
            <Learnmore className='p-3' name="Learn More" color="#121212" />
          </Link>
        </div>

     </section>


    <Datafetching API="https://backend.matratech.in/api/home-services" 
     onChildData={useCallback((serviceInfo)=> {
      console.log("service-info",serviceInfo); 
      setServiceDetails(serviceInfo);
    },[])} />
    

    {/*=========Our Service Section=========*/}

    <section className="service-wrap">
       
       <h1 data-aos="fade-up">Our Services</h1>
       <span data-aos="fade-up">{homeContents.our_service_subtitle}</span>

      <div className="streams">
        {serviceDetails.length > 0 && 
          serviceDetails.map((data, index) => {
            return (
              <div className="line" key={index} data-aos="fade-in">
                  <div className="head" onClick={() => handleDropdown(index)}>
                      <h2>{data.title}</h2>
                      <PiPlusThin style={{ transform: activeIndex === index ? "rotate(50deg)" : "rotate(0deg)"}} />
                      <Fancybox>
                        <img 
                        src={`${baseImage}/${data.image}`} 
                        alt="service-image"  
                        data-fancybox="services" 
                        data-caption={data.title}
                        />

                        {/* <LazyLoadImage 
                        src={`${baseImage}/${data.image}`} 
                        alt="service-image"  
                        data-fancybox="services" 
                        data-caption={data.title} 
                        effect="blur"
                        wrapperProps={{
                        style: {transitionDelay: ".5s"},
                        }} /> */}
                        
                      </Fancybox>
                  </div>
                  <div className={`dropDown ${activeIndex === index ? "showDropdown" : "hideDropdown"}`}>
                    {data.content}
                  </div>
              </div>
            )
          })
        }
      </div>
    </section>

    <Datafetching API="https://backend.matratech.in/api/home-projects" 
      onChildData={useCallback((projectInfo)=> {
      console.log("project-info",projectInfo); 
      setProjectDetails(projectInfo)
    },[])} />

    {/*=========Projects Section========*/}

     <section className="project-wrap">
       <h1 data-aos="fade-up">Projects</h1>
       <span data-aos="fade-up">{homeContents.projects_subtitle}</span>
        <div className="all-projects">
          {projectDetails?.map((project) => {
            const{id, image, title } = project;
            return (
              <Row className="mb-lg-5 mb-4" key={id}>
                <Col className="p-0" data-aos="fade-up">
                  <Fancybox>
                    <a href={`${baseImage}/${image}`} data-fancybox="proj" data-caption={title}>
                      {/* <img 
                      src={`${baseImage}/${image}`} 
                      alt="client-image" 
                      className="img-fluid"  
                      /> */}

                      <LazyLoadImage 
                        className='img-fluid w-100'
                        src={`${baseImage}/${image}`}
                        effect="blur"
                        wrapperProps={{
                          style: {transitionDelay: ".5s"},
                        }} 
                      />
                    </a>  
                  </Fancybox>  
                  <h4>{title}</h4>
                </Col>
              </Row>
            )
          })}
        </div>

      <div className="d-flex justify-content-center">
        <Link to="/portfolio">
          <Learnmore className='p-3' name="Learn More" color="#000000" />
        </Link>
      </div>
       
     </section>

    <Datafetching API="https://backend.matratech.in/api/home-awards" 
    onChildData={useCallback((awardInfo)=> {
      console.log("award-info", awardInfo); 
      setAwardDetails(awardInfo);
      setIsApiLoad(false);
    },[])} />


    {/*=========Awards & Achivement Section========*/}

     <section className="awards-wrap">
       <h1 data-aos="fade-up">Awards & Achivements</h1>
       <span data-aos="fade-up">{homeContents.awards_subtitle}</span>

       <Slider {...settings}>
         {awardDetails?.map((award, index) => 
            <div className="award" key={index}>
                {/* <img src={`${baseImage}/${award.image}`} alt="award-image" /> */}
                <LazyLoadImage 
                  className='img-fluid w-100'
                  src={`${baseImage}/${award.image}`}
                  effect="blur"
                  wrapperProps={{
                  style: {transitionDelay: ".5s"},
                }}/>
                <p>{award.content}</p>
            </div>
         )}
       </Slider>
     </section>
    <ContactSection />
   </main>
  )
}

export default Home;
