import React, { useEffect, useState, useCallback, useMemo } from "react";
import BannerSection from "../../components/Topbanner/BannerSection";
import ContactSection from "../../components/Contact/ContactSection";
import btnDetails from "./Info/ButtonInfo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./sass/Style.css";
//import Fancybox from "../Fancybox";
import useAos from "../../hooks/useAos";
import Datafetching from "../Datafetching";
import PageLoader from "../../components/Pageloader/PageLoader";

import { Fancybox } from "@fancyapps/ui"; // Ensure this is installed via npm or yarn
//import '@fancyapps/ui/dist/fancybox.css';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Portfolio = () => {
  /*_____BY DEFAULT PAGE GO TO TOP_____*/

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useAos();

  const [baseImage, setBaseImage] = useState("https://backend.matratech.in/uploads");
  const [portfolioInfo, setPortfolioInfo] = useState();
  const [portfolioData, setPortfolioData] = useState(portfolioInfo);
  const [activeFilterButton, setActiveFilterButton] = useState(null);
  const [isApiLoad, setIsApiLoad] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandedId, setExpandedId] = useState(null); // Track the ID of the expanded card

  const handleTextExpand = (id) => {
    setExpandedId(expandedId === id ? null : id); // Toggle between collapsing the card
  };

  function handleTextExpend(id) {
    console.log(id)
    setExpandedId(expandedId === id ? null : id); 
    setExpanded(!expanded)
  }

  useEffect(() => {
    // Reinitialize Fancybox whenever `foodData` changes
    Fancybox.bind("[data-fancybox]", {});
  }, [portfolioData]);

  useEffect(() => {
    setActiveFilterButton(btnDetails[0].id); //by deafult first button's id will be sent
  }, []);

  useEffect(() => {
    setPortfolioData(portfolioInfo?.filter((port) => port.category.toLowerCase() === "website"));
  }, [portfolioInfo]);

  function filterData(category, ID) {
    setActiveFilterButton(activeFilterButton === ID ? null : ID); //only ID can be put here too.

    if (category.toLowerCase() == "all") {
      setPortfolioData(portfolioInfo)
    } else {
      setPortfolioData(
        portfolioInfo.filter(
          (port) => port.category.toLowerCase() === category.toLowerCase()
        )
      )
    }
  }

  return (
    <main>
      {isApiLoad && <PageLoader />}

      <BannerSection title="portfolio" />
      <hr style={{ color: "#333333" }} />

      {/*________All Buttons________*/}
      <Container fluid className="btn-container">
        <Row className="d-flex justify-content-center">
          {btnDetails.map((btn) => {
            const { id, category } = btn;
            return (
              <Col lg={2} xs={6} md={6} key={id}>
                <Button 
                  className="w-100" 
                  style={{ background: activeFilterButton === id ? "#00c9fc" : "",}}
                  onClick={() => filterData(category, id)}
                >
                { (category=="Virtual Reality" || category=="Agumented Reality") ? `${category}` : `${category}s` }
                </Button>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Datafetching
        API="https://backend.matratech.in/api/portfolio"
        onChildData={useCallback((port_info) => {
          // console.log("service-info", port_info);
          setPortfolioInfo(port_info);
          setIsApiLoad(false);
        }, [])}
      />

      <Container fluid className="portfolio-wrap">
        <Row className="row-gap-4">
          {portfolioData?.map((info) => (
           <> 
           {info.category.toLowerCase()=="app" ? <h1 className="text-light text-center">Comming Soon.....</h1> : 
            <Col lg={4} md={6} key={info.id}>
              <Card>
                {(info.category.toLowerCase() == "virtual reality") || (info.category.toLowerCase() == "agumented reality") ? (
                  <iframe
                    data-fancybox="projects"
                    data-caption={info.title}
                    src={info.url}
                    title={info.id}
                    effect="blur"
                    className="w-100"
                    wrapperProps={{
                      style: { transitionDelay: ".5s" },
                    }}
                  />
                ) : (
                  <a
                    href={`${baseImage}/${info.big_image}`}
                    data-fancybox="projects"
                    data-caption={info.title}
                  >
                    <LazyLoadImage
                      className="img-fluid w-100"
                      src={`${baseImage}/${info.image}`}
                      effect="blur"
                      placeholderSrc={`${baseImage}/${info.image}`}
                      wrapperProps={{
                        style: { transitionDelay: ".5s" },
                      }}
                    />
                  </a>
                )}

                <Card.Body>
                  <Card.Title data-aos="fade-up">{info.title}</Card.Title>
                  <Card.Text data-aos="fade-up">
                    <span>  
                        { 
                          expandedId === info.id ? 
                          info.content : info.content?.split(' ').slice(0, 9).join(' ') 
                        } 
                        {
                          (info.content && 
                            <a href="javascript:void(0);" onClick={()=> handleTextExpand(info.id)}>
                              {expandedId === info.id ? ' ...Read Less' : ' ...Read More'}
                            </a>
                          )
                        }
                    </span>
                  </Card.Text>
                    <a data-aos="fade-in" href={info.view_live_url} target="_blank">
                      { info.category.toLowerCase() === "virtual reality" ? "Best View" : "Visit Now" }
                    </a>
                </Card.Body>
              </Card>
            </Col>
            }
          </>
          ))}
        </Row>
      </Container>
      <ContactSection />
    </main>
  );
};

export default Portfolio;
