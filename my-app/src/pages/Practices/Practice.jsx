import React, { useEffect, useState, useCallback } from "react";
import BannerSection from "../../components/Topbanner/BannerSection";
import ContactSection from "../../components/Contact/ContactSection";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import technologyDesc from "./Info/TechnologyDesc";
import Button from "react-bootstrap/Button";
import "./sass/Style.css";
import waterfallContent from "./Info/framework2";
// import together from "../../assets/Images/together.jpg";
import detailedInfo from "./Info/DetailWrap";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { MdOutlineVerifiedUser } from "react-icons/md";
import buttonDetails from "./Info/TopButtons";
import basicInfo from "./Info/basicDetails";
import methodologyFrameWork from "./Info/method&framework";
import engagementDetails from "./Info/engagementPractice";
import TableData from "./Info/TableData";
import useAos from "../../hooks/useAos";
import Datafetching from "../Datafetching";
import PageLoader from "../../components/Pageloader/PageLoader";
const Practice = () => {
  const [baseImage, setBaseImage] = useState("https://backend.matratech.in/uploads");
  const [practiceInfo, setPracticeInfo] = useState();
  const [isApiLoad, setIsApiLoad] = useState(true);

  /*_____PAGE SET TOP BY DEFAULT__*/

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useAos();

  return (
    <main>
      {isApiLoad && <PageLoader />}
      <Datafetching
        API="https://backend.matratech.in/api/practice"
        onChildData={useCallback((practiceInfo) => {
          console.log(practiceInfo);
          setPracticeInfo(practiceInfo);
          setIsApiLoad(false);
        }, [])}
      />

      <BannerSection title="practice" />

      <hr style={{ color: "#333333" }} />

      <div className="practice-menus">
        <ul data-aos="fade-up">
          {buttonDetails.map((button) => (
            <li key={button.id}>
              <a href={button.target}>{button.name}</a>
            </li>
          ))}
          {/* <li><a href='#technology'>Technology</a></li>
              <li><a href='#methodology'>Methodology and Framework</a></li>
              <li><a href='#engagement-practices'>Engagement Practices</a></li>
              <li><a href='#global-sourcing'>Global Sourcing</a></li> */}
        </ul>
      </div>

      <Container fluid className="technology-wrap px-md-5 px-3" id="technology">
        <Row>
          <Col lg={6}>
            <div className="heading">
              {/* <h1 data-aos="fade-up">Technology</h1> */}
              <h1 data-aos="fade-up">{practiceInfo?.intro.title}</h1>
              <span data-aos="fade-in">{practiceInfo?.intro.sub_title}</span>
            </div>
          </Col>
          <Col lg={6}>
            <div className="para" data-aos="fade-up">
              <p>{practiceInfo?.intro.content}</p>
            </div>
          </Col>
        </Row>
      </Container>

      <section className="technology-btn-wrap">
        {/* <Row className='g-4 justify-content-center'> */}
        <div className="btn-grid">
          {practiceInfo?.technology.map((item) => (
            <Button key={item.id} data-aos="zoom-in">
              {item.name}
            </Button>
          ))}
        </div>
        {/* </Row> */}
      </section>

      <section className="method-framework-wrap" id="methodology">
        <h1 data-aos="fade-up">Methodology & Framework</h1>

        {/*(START) COPY CODE FROM CODEPEN*/}

        <div className="ps-timeline-sec">
          <div className="container main-container">
            <ol className="ps-timeline">
              {methodologyFrameWork.map((val) => {
                const { id, title, para } = val;
                return (
                  <li key={id}>
                    <div
                      className={`${id % 2 === 0 ? "ps-top" : "ps-bot"}`}
                      data-aos="fade-up"
                    >
                      <h5>{title}</h5>
                      <p>{para}</p>
                    </div>
                    <span
                      className={`${id % 2 === 0 ? "ps-sp-bot" : "ps-sp-top"}`}
                    >
                      {" "}
                      0{id}{" "}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <h4>{methodologyFrameWork[0].caption}</h4>
        </div>
        {/*(END) COPY CODE FROM CODEPEN*/}

        <div className="circle-container">
          {practiceInfo?.waterfall_hybride.map((info) => (
            <div className="cr" key={info.id}>
              <div className="small-circle">0{info.id}</div>
              <div className="circle" data-aos="zoom-in">
                <img
                  src={`${baseImage}/${info.image}`}
                  alt=""
                  className="img-fluid"
                />
                <p>{info.title}</p>
              </div>
            </div>
          ))}
          <h4 className="mt-5">{waterfallContent[0].caption}</h4>
        </div>
      </section>

      <Container
        fluid
        className="technology-wrap px-md-5 px-3"
        id="engagement-practices"
      >
        <Row>
          <Col lg={6}>
            <div className="heading">
              {/* <h1 data-aos="fade-up">Engagement Practices</h1> */}
              <h1 data-aos="fade-up">{practiceInfo?.engagement_intro.title}</h1>
            </div>
          </Col>
          <Col lg={6}>
            <div className="para" data-aos="fade-up">
              <p>{practiceInfo?.engagement_intro.content}</p>
            </div>
          </Col>
        </Row>

        <div className="image" data-aos="fade-up">
          <img
            src={`${baseImage}/${practiceInfo?.engagement_intro.image}`}
            alt=""
            className="img-fluid"
          />
        </div>
      </Container>

      <section className="table-wrap">
        <h2 data-aos="fade-up">
          Maximum cost savings possible as onus is onto us to deliver in-time
          on-budget. Great way to start off with us.
        </h2>
        <div className="outer" data-aos="fade-up">
          <div className="inner">
            <table>
              {TableData.map((tr) =>
                tr.id === 1 ? (
                  <thead key={tr.id}>
                    <tr>
                      {tr.tableHead.map((th, index) => (
                        <th key={index}>{th}</th>
                      ))}
                    </tr>
                  </thead>
                ) : (
                  <tbody key={tr.id}>
                    {tr.tableBody.map((td, index) => (
                      <tr key={index}>
                        {Array.isArray(td) &&
                          td.map((data, index) => (
                            <td key={index}>
                              {Array.isArray(data) ? (
                                data.map((line, index) => (
                                  <p key={index}>
                                    {line.icon} {line.info}
                                  </p>
                                ))
                              ) : (
                                <p>{data}</p>
                              )}
                            </td>
                          ))}
                        {/* <td> {td} xxx </td> */}
                      </tr>
                    ))}

                    {/* <tr>
                              <th className="first-col">Project-based</th>
                              <td>Fixed based on milestones</td>

                              <td>
                                <p><MdOutlineVerifiedUser /> Requirements are very clear.</p> 
                                <p><MdOutlineVerifiedUser /> Team will be a significant addition to existing team or all of it.</p>
                                <p><MdOutlineVerifiedUser /> Team’s capabilities are known well.</p> 
                              </td>

                              <td>
                                <p><IoIosStar /> Agile possible as well if client is fully engaged in the development process.</p> 
                                <p><IoIosStar /> Maximum cost savings possible as onus is onto us to deliver in-time on-budget.</p>
                              </td>
                          </tr> */}

                    {/* <tr>
                              <th className="first-col">Resource-based engagement</th>
                              <td>Hourly or daily rates based on type of resource engaged</td>
                              <td>
                                <p><MdOutlineVerifiedUser /> Want to augment your team with more resources.</p>
                                <p><MdOutlineVerifiedUser /> Unsure of exact requirements.</p>
                                <p><MdOutlineVerifiedUser /> Starting off for the first time.</p>
                              </td>
                              <td>
                                 <p><IoIosStar /> We could also offer blended rates based on pre-set conditions so smoothen the billing.</p>
                                 <p><IoIosStar /> Great way to start off with us.</p>
                              </td>
                          </tr> */}

                    {/* <tr>
                              <th className="first-col">Partnership Engagement</th>
                              <td>Pre-defined hourly rate (typically at cost) + Share of profits earned</td>
                              <td>
                                 <p><MdOutlineVerifiedUser /> Not enough capital to take a risk.</p>
                                 <p><MdOutlineVerifiedUser /> Expect the product/solution to be sold to others through you. </p>
                                 <p><MdOutlineVerifiedUser /> Willingness to share risk and as well as gains.</p>
                              </td>
                              <td>
                                <p><IoIosStar /> Excellent combination of your domain knowledge and our technology skills to form a win-win partnership. </p>
                                <p><IoIosStar /> Shared IP.</p>
                              </td>
                          </tr> */}

                    {/* <tr>
                              <th className="first-col">Dedicated development facility</th>
                              <td>Flexible based on type of needs and resources</td>
                              <td>
                                <p><MdOutlineVerifiedUser /> Best for settings up low-cost offshore center without the headache of managing it.</p>
                              </td>
                              <td>
                                <p><IoIosStar /> IP is owned by you.</p>
                                <p><IoIosStar /> Can set up facility based on your requirements and corporate practices.</p>
                              </td>
                          </tr> */}
                  </tbody>
                )
              )}
              {/* <thead>
                          <tr>
                              <th className="first-col">Type</th>
                              <th>Costing</th>
                              <th>Best When</th>
                              <th>Comments</th>
                          </tr>
                      </thead> */}
              {/* <tbody>
                          <tr>
                              <th className="first-col">Project-based</th>
                              <td>Fixed based on milestones</td>

                              <td>
                                <p><MdOutlineVerifiedUser /> Requirements are very clear.</p> 
                                <p><MdOutlineVerifiedUser /> Team will be a significant addition to existing team or all of it.</p>
                                <p><MdOutlineVerifiedUser /> Team’s capabilities are known well.</p> 
                              </td>

                              <td>
                                <p><IoIosStar /> Agile possible as well if client is fully engaged in the development process.</p> 
                                <p><IoIosStar /> Maximum cost savings possible as onus is onto us to deliver in-time on-budget.</p>
                              </td>
                          </tr>
                          <tr>
                              <th className="first-col">Resource-based engagement</th>
                              <td>Hourly or daily rates based on type of resource engaged</td>
                              <td>
                                <p><MdOutlineVerifiedUser /> Want to augment your team with more resources.</p>
                                <p><MdOutlineVerifiedUser /> Unsure of exact requirements.</p>
                                <p><MdOutlineVerifiedUser /> Starting off for the first time.</p>
                              </td>
                              <td>
                                 <p><IoIosStar /> We could also offer blended rates based on pre-set conditions so smoothen the billing.</p>
                                 <p><IoIosStar /> Great way to start off with us.</p>
                              </td>
                          </tr>
                          <tr>
                              <th className="first-col">Partnership Engagement</th>
                              <td>Pre-defined hourly rate (typically at cost) + Share of profits earned</td>
                              <td>
                                 <p><MdOutlineVerifiedUser /> Not enough capital to take a risk.</p>
                                 <p><MdOutlineVerifiedUser /> Expect the product/solution to be sold to others through you. </p>
                                 <p><MdOutlineVerifiedUser /> Willingness to share risk and as well as gains.</p>
                              </td>
                              <td>
                                <p><IoIosStar /> Excellent combination of your domain knowledge and our technology skills to form a win-win partnership. </p>
                                <p><IoIosStar /> Shared IP.</p>
                              </td>
                          </tr>

                          <tr>
                              <th className="first-col">Dedicated development facility</th>
                              <td>Flexible based on type of needs and resources</td>
                              <td>
                                <p><MdOutlineVerifiedUser /> Best for settings up low-cost offshore center without the headache of managing it.</p>
                              </td>
                              <td>
                                <p><IoIosStar /> IP is owned by you.</p>
                                <p><IoIosStar /> Can set up facility based on your requirements and corporate practices.</p>
                              </td>
                          </tr>
                      </tbody> */}
            </table>
          </div>
        </div>
      </section>

      <section className="global-sourcing-wrap" id="global-sourcing">
        <Row className="justify-content-between">
          <Col lg={5}>
            <div className="heading">
              {/* <h1 data-aos="fade-up">Global Sourcing</h1> */}
              <h1 data-aos="fade-up">{practiceInfo?.global_sourcing.title}</h1>
              <span data-aos="fade-up">
                {practiceInfo?.global_sourcing.first_content}
              </span>
            </div>
          </Col>
          <Col lg={6}>
            {detailedInfo.map((val) => (
              <div className="para" key={val.id}>
                <h1 data-aos="fade-up">{val.title}</h1>
                <ul>
                  {val.list.map((li, index) => (
                    <li key={index} data-aos="fade-up">
                      <FaRegCheckCircle className="circleTick" />
                      <p>{li}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Col>
        </Row>
      </section>
      <ContactSection />
    </main>
  );
};

export default Practice;
