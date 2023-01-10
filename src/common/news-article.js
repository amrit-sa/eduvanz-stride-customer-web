import React from "react";
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from "../common/assets";
import { getRelatedBlog } from "../actions/product";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 991 },
        items: 3
      },
      mediumtab: {
        breakpoint: { max: 991, min: 464 },
        items: 2
    },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
  };


class NewsArticle extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            blog_list: null,
        }
    }


    componentDidMount() {
        this.props.dispatch(getRelatedBlog()).then((response) => {
            console.log(this.props.response,"bloglist")
            if (response && response.length > 0) {
                this.setState({ blog_list: response });
                
            }
        });
    }

    render(){
        let { blog_list } = this.state;
        console.log('blog_listblog_listblog_list',blog_list)
        if(!blog_list && this.props.blogList){
            
            blog_list = this.props.blogList.map(item=>{
                return {
                    image_url__c:item.image_url__c,
                    name:item.title__c,
                    title__c:item.title__c,
                    description__c:item.description__c,
                    website_url__c:item.website_url__c
                }
            })
        }
        return(
            <>
            <section className="bg0 pt-5 pb-5 overflow-hidden exploreMore related-blog-block">
                <div className="container">
                <div className="row">
                    <div className="col mb-2 latest-blog-card ">
                   
                    <div className="d-flex justify-content-between align-items-center mb-2  shopby-after-bg-image position-rel">
                            <h3 className="section_title mb-lg-4 mb-3">Related Blogs </h3>
                               {/* <a href="#" className="text-decoration-none fs-14 font-weight-bold d-block">View All 
                               <i className="ml-2 fa fa-angle-right fs-14 font-weight-bold" aria-hidden="true"></i></a> */}
                              
                             </div>
                             {blog_list && blog_list.length > 0 && (
                        <Carousel responsive={responsive}>
                           {/*  <div className="item d-flex flex-column blog-card">
                                <div className="img-box">
                                    <img src={`${asset}images/products/na01.png`} className="img-fluid"/>
                                </div>
                                <div className="card-bg-img">
                                <div className="bottom">
                                    <h6>Embracing Metaverse</h6>
                                    <p>A metaverse in need of high-quality, AR building 
                                    </p>
                                   <div className="blog-footer">
                                    <span>~Aparna</span>
                                    <span className="readmore"><a href="">Read More   <img src={`images/arrow-right.png`} className="img-fluid"/> </a></span>
                                    </div> 
                                </div>
                                </div>
                                

                             </div> */}
                            { blog_list.map((item, index)=> (
                             <div key={`related-blog-${index}`} className="item d-flex flex-column blog-card related-gradient">
                                <div className="img-box">
                                    <img src={item.image_url__c} style={{
                                        width: '100%',
                                        height: '100%',
                                        'objectFit': 'cover'
                                    }}/>
                                </div>
                                <div className="card-bg-img">
                                <div className="bottom" style={{marginTop:-20}}>
                                    <h6>{item.title__c}</h6>
                                    <p>{item.description__c}</p>
                                    <div className="blog-footer">
                                    <span>~{item.name}</span>
                                    <span className="readmore"><a href={item.website_url__c}>Read More</a></span>
                                    </div> 
                                </div>
                                </div>
                             </div>
                             ))}

                            {/*  <div className="item d-flex flex-column blog-card">
                                <div className="img-box">
                                    <img src={`${asset}images/products/na03.png`} className="img-fluid"/>
                                </div>
                                <div className="card-bg-img">
                                <div className="bottom">
                                    <h6>VR bring transhumanism to masses</h6>
                                    <p>Stories from the world’s leading digital asset platform.</p>
                                    <div className="blog-footer">
                                    <span>~Aparna</span>
                                    <span className="readmore"><a href="">Read More   <img src={`images/arrow-right.png`} className="img-fluid"/> </a></span>
                                    </div> 
                                </div>
                                </div>
                             </div>
                             <div className="item d-flex flex-column blog-card">
                                <div className="img-box">
                                    <img src={`${asset}images/products/na04.png`} className="img-fluid"/>
                                </div>
                                <div className="card-bg-img">
                                <div className="bottom">
                                    <h6>Evolution of Blockchain: 1991-2021</h6>
                                    <p>Stories from the world’s leading digital asset platform.</p>
                                    <div className="blog-footer">
                                    <span>~Aparna</span>
                                    <span className="readmore"><a href="">Read More   <img src={`images/arrow-right.png`} className="img-fluid"/> </a></span>
                                    </div> 
                                </div>
                                </div>
                             </div>
                             <div className="item d-flex flex-column blog-card">
                                <div className="img-box">
                                    <img src={`${asset}images/products/na01.png`} className="img-fluid"/>
                                </div>
                                <div className="card-bg-img">
                                <div className="bottom">
                                    <h6>Evolution of Blockchain: 1991-2021</h6>
                                    <p>Stories from the world’s leading digital asset platform.</p>
                                    <div className="blog-footer">
                                    <span>~Aparna</span>
                                    <span className="readmore"><a href="">Read More   <img src={`images/arrow-right.png`} className="img-fluid"/> </a></span>
                                    </div> 
                                </div>
                                </div>
                             </div>
                             <div className="item d-flex flex-column blog-card">
                                <div className="img-box">
                                    <img src={`${asset}images/products/na02.png`} className="img-fluid"/>
                                </div>
                                <div className="card-bg-img">
                                <div className="bottom">
                                    <h6>Evolution of Blockchain: 1991-2021</h6>
                                    <p>Stories from the world’s leading digital asset platform.</p>
                                    <div className="blog-footer">
                                    <span>~Aparna</span>
                                    <span className="readmore"><a href="">Read More   <img src={`images/arrow-right.png`} className="img-fluid"/> </a></span>
                                    </div> 
                                </div>
                                </div>
                             </div> */}
                        </Carousel>
                        )}
                    </div>
                    </div>
                </div>
                   
              </section>
            </>
        )
    }
}

export default connect()(NewsArticle);