import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


class AboutUs extends React.Component{

    render(){
        return(
            <>
            <section className="bg0 pt-5 pb-5 overflow-hidden about__">
                <div className="container">
                <div className="row">
                    <div className="col mb-12">
                        <ul className="list-unstyled about_">
                            <li>
                                <h5>No-Cost EMI Courses</h5>
                                <p>Project Management Certification Course | Cyber Security Certification Course | Data Science Bootcamp Program | Data Analytics Bootcamp Program | Business Analysis Certification Course | Agile Certification Course | Digital Marketing Certification Program | Lean Six Sigma Certification Course | DevOps Certification Course | Cloud Computing Certification Course | Data Engineering Course | AI and Machine Learning Course | Full Stack Web Development Course</p>
                            </li>
                            <li>
                            <h5>Top Online Courses</h5>
                                <p>
                                Project Management Certification Course | Cyber Security Certification Course | Data Science Bootcamp Program | Data Analytics Bootcamp Program | Business Analysis Certification Course | Agile Certification Course | Digital Marketing Certification Program | Lean Six Sigma Certification Course | DevOps Certification Course | Cloud Computing Certification Course | Data Engineering Course | AI and Machine Learning Course | Full Stack Web Development Course
                                </p>
                            </li>
                            <li>
                            <h5>Certifications</h5>
                            <p>
                                Project Management Certification Course | Cyber Security Certification Course | Data Science Bootcamp Program | Data Analytics Bootcamp Program | Business Analysis Certification Course | Agile Certification Course | Digital Marketing Certification Program | Lean Six Sigma Certification Course | DevOps Certification Course | Cloud Computing Certification Course | Data Engineering Course | AI and Machine Learning Course | Full Stack Web Development Course
                                </p>
                            </li>
                            <li>
                            <h5>Institutes</h5>
                            <p>
                                Project Management Certification Course | Cyber Security Certification Course | Data Science Bootcamp Program | Data Analytics Bootcamp Program | Business Analysis Certification Course | Agile Certification Course | Digital Marketing Certification Program | Lean Six Sigma Certification Course | DevOps Certification Course | Cloud Computing Certification Course | Data Engineering Course | AI and Machine Learning Course | Full Stack Web Development Course
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
              </section>
            </>
        )
    }
}

export default connect()(AboutUs);