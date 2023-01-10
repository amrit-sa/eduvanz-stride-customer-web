import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import { asset } from "../common/assets";
import $ from "jquery"
import About from "../common/about";

import { getGlobalSearch, getSupportSearch } from "../actions/product";
import { getHelpSuport,user_query_submit,getPaymentTransactions } from '../actions/user'

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      help_support: [],
      ques_ans: [],
      showing_answer: false,
      answer: "",
      name:"",
      mobile:'',
      email:'',
      query:'',
      description:'',
      subsMsg:'',
      search:'',
      searchData:[],
      modalquestions :[],
      modalData:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  

  componentDidMount() {
    console.log('props',this.props);
   
    this.props.dispatch(getHelpSuport()).then((response) => {
      if (response.status === "success") {
        this.setState({ help_support: response.data })
      }
    })

    


  }

  modelOpenNew = () => {
   // console.log('222222222222222222222222222');
    this.setState({
      subsMsg:'',
    });
    this.clear();
  }

  clear = () =>{
    this.setState( { 
    name:"",
    mobile:'',
    email:'',
    query:'',
    description:'',});
  }

  handleToggle = (val,subtitle) => {
    console.log(this.state.ques_ans);
    if(subtitle === "Specific Order Issue"){
      const data = {
        user_sfid: this.props.sfid,
    }
    this.props.dispatch(getPaymentTransactions(data)).then(res => {
      if(res.status === 'success'){
        this.setState({modalData:res.transactions});
      }
    });
      let questiondata = this.state.ques_ans.filter(ele => ele.subtitle === subtitle);
      this.setState({modalquestions:questiondata[0].query})
      console.log(questiondata);
      console.log(this.state.modalquestions);
      
         document.getElementById('togglemodal').click();
         return;
    }
    // console.log(val);
    // console.log(this.state.ques_ans);
    $('#' + val).slideToggle();
    // $('#' + val).toggle();

  }

  handleLoadAnswer = (ques, answer) => {
    this.setState({ showing_answer: true })
    this.setState({ answer: answer })
    this.setState({ question: ques })
  }

  goBack = () => {
    this.setState({ showing_answer: false })
    this.setState({ answer: "" })
    this.setState({ question: "" })
  }

 


  handleSelectCat = (title) => {
    let res = this.state.help_support.filter((obj) => {
      return obj.title == title;
    })
    this.setState({ ques_ans: res[0].data })
  }

  handleChange = (e) => {
    this.setState({
     [e.target.name]:e.target.value
    }); 
  }

  handleSupportClick = (categoryName, subCatName,val) => {
    //console.log(categoryName + "Category Name")
    // console.log(subCatName + "Sub - Category Name")
    $('.searchDDWrapperSupport').hide();
    this.handleSelectCat(categoryName);
    this.handleToggle(val);
  }

 
  handleSubmit = (event) => {
    const { name, email, mobile, query, description } = this.state
    event.preventDefault();
    const { sfid } = this.props;
   // console.log(sfid);
   
    let givenData = {
                    user_sfid:sfid,
                    issue_type:'',
                    subject:query,
                    description:`${name}/ ${email}/ ${mobile}/ ${query}/ ${description}`,
                    } ;

                  this.props.dispatch(user_query_submit(givenData)).then(
                    (response)=>{
                      console.log(response);
                        if(response.status=='success')
                        {
                         this.clear();
                           this.setState({subsMsg:response.message});
                           
                        }
                        
                    // this.setState({ mba_date: response.data }
                    //     ,()=>{
                            
                            
                    //     }
                        
                    //     );
                 })
    
  }

  searchProduct = (search) => {
    const payload = {
        "search_name": search,
    }
    this.props.dispatch(getSupportSearch(payload)).then((response) => {
        // console.log(response,"xxxxxxxxxxxxxxxxxxxx")
        if (response && response.status === "success") {
            this.setState({ searchData: response.data });
            // this.props.history.push("/products-list");
        } else {
            this.setState({ searchData: [] });
        }
    });
}

  handleSupportSearch = (e) => { 
    this.setState({ search: e.target.value });
    let searchText = e.target.value;
    console.log(searchText)
    if (searchText.length > 3) {
        $('.searchDDWrapperSupport').show();
        $('.searchDDWrapperSupport').slideDown();
        this.searchProduct(searchText);
        $('.search___ support').addClass('bgcolor')
    } else {
        this.setState({ searchData: [] });
        $('.searchDDWrapperSupport').hide();
    }
}
    handleSearch = () => {
      $('.searchDDWrapperSupport').slideDown();
      $('.search___ support').addClass('bgcolor')
    }

    inputfocusSupport = (elmnt) => {
  if (elmnt.key === "Enter") {
      this.props.history.push("/support_search" + this.state.search);
      // window.location.reload()
      this.props.dispatch(getSupportSearch(this.state.search)).then((response) => {
          if (response && response.status === "success") {
              this.setState({ searchData: response.data });
             
             
          } else {
              this.setState({ searchData: [] });
          }
      });
  }
}
  


  render() {

    const { user, username, isSearching, searchDet, history } = this.props;
    const { help_support, searchData } = this.state
    // console.log(searchData +'  ashutosh');
    const dispayNone = {display:"none"}
  //console.log('modal',this.state.modalquestions,this.state.modalData);
    // console.log('help_support',help_support[0].data[2].query);
    return (
      <>
        <Helmet>
          <title> Support </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
        />
        <div className="inner-page support">
          <div className="container mb-5"> 
            <div className='row'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper pt-3'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Help & Support</a></li>
                  </ul>
                </div>
              </div>
            </div>

			<div class="col-sm-12 manage_bck pt-4"><a href="/setting"><span>Help & Support</span></a></div>

            {this.state.showing_answer ?
              <div className="answer-wrapper">

                <div className='d-flex align-items-center'>
                  <button onClick={() => this.goBack()} type='button' className='back-btn rounded-circle mr-3 mr-lg-4'>
                    back
                  </button>
                  <h2 className="back-btn-text m-0">{this.state.question}</h2>
                </div>


                <div className="container answer-box">
                  {/* <p>Your payments are automatically withdrawn from your connected card according to the agreed payment schedule, but you can make early payments anytime you wish.</p>
                  <p>To make a manual payment:</p>
                  <ul className="support list-style-decimal mb-5">
                    <li>Go to Payments </li>
                    <li>Tap Payments and navigate between the purchase/statement you would like to pay</li>
                    <li>Tap Payment options and follow the instructions</li>
                  </ul> */}
                  {/* <div className="d-flex justify-content-between align-items-center">
                    <div>Was this answer helpful? <img src={asset + "images/support/thumb-down-1.png"} className="mr-2" />  <img src={asset + "images/support/thumb-down-2.png"} /></div>
                    <div><span className="mr-2">Still need help? Contact us</span> <button className="btn btn-dark rounded px-4" data-toggle="modal" data-target="#writetous">Write to us</button></div>
                  </div> */}
                  <p>{this.state.answer}</p>
                </div>
                <hr></hr>
                {/* <div className="fds_accordion">
                  <div className="tab rounded-1">How can I extend my due date?</div>
                  <div className="content">How can I extend my due date?</div>
                </div>
                <div className="fds_accordion">
                  <div className="tab rounded-1">Transmission</div>
                  <div className="content">Transmission</div>
                </div>
                <div className="fds_accordion">
                  <div className="tab rounded-1">When is my payment due?</div>
                  <div className="content">When is my payment due?</div>
                </div>
                <div className="fds_accordion">
                  <div className="tab rounded-1">What happens if I can’t pay on time?</div>
                  <div className="content">What happens if I can’t pay on time?</div>
                </div> */}
              </div>
              :

              <>
                <div className="d-lg-flex justify-content-between align-items-center mt-3">
                  
                  <div className="col-lg-12 supportSrch mb-5">
                    <h5 >Hello, What can we help you with?</h5>
                   
                    <div className="search___ support mt-0 p-0 col-sm-8">
                      <input
                        name='sub_search'
                        value={this.state.search ? this.state.search : ''}
                        autoComplete="off"
                        onChange={this.handleSupportSearch}
                        onKeyUp={e => this.inputfocusSupport(e)}
                        onClick={this.handleSupport}
                        placeholder='Search for the laptop that suits you'
                         />
                      <button className='bg-transparent' >
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                      
                      <div className="searchDDWrapperSupport" style={dispayNone}>
                      <div className='row mb-3'>
                         <div className='col t_s_bar py-2'>
                         <div className='d-flex align-items-center'>
                           <div  className='flex-1 d-flex align-items-start t_s_r_w justify-content-between'>
                    <ul>
                      {   
                        this.state.searchData.length > 0 && this.state.searchData.map((item, index)=>
                              (
                                    <li key={index} className='cursor-point'
                                    onClick={() => this.handleSupportClick(item.sub_title,item.title,index)}>{item.question}
                                     </li>
                              )
                        )
                      }                  
                      </ul>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                     
                    </div>
                    <img src="images/support_frm.svg" alt="" className="supportFrm" />
                  </div>
				  
                </div>

                <h4 className="my-3">Categories</h4>
                <div className="row mx-0 mt-4">
                  <div className="col-lg-5 p-0 pr-lg-3">
                    <ul className="list-group list-group-flush support">


                      {help_support && help_support.length > 0
                        && help_support.map((obj, index) =>

                          <li key={index} className="list-group-item p-3 cursor-point" onClick={() => this.handleSelectCat(obj.title)}>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="supportCat_icon">
                                <img src={asset + "images/support/packing.png"} className="mr-3" />
                                {obj.title}
                              </div>
                              <div className="mr-5 angle">
                                <i className="fa fa-angle-right h5 font-weight-bold"></i>
                              </div>
                            </div>
                          </li>

                        )
                      }



                      {/* <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset + "images/support/packing.png"} className="mr-3" />
                        Order Related
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset + "images/support/customer.png"} className="mr-3" />
                        General Issues
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset + "images/support/handshake.png"} className="mr-3" />
                        Partner Onboarding
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-center" onClick={() => history.push('./terms_condition')}>
                      <div>
                        <img src={asset + "images/support/exam.png"} className="mr-3" />
                        Legal, Terms & Conditions
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item border-bottom p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <img src={asset + "images/support/question.png"} className="mr-3" />
                        FAQs
                      </div>
                      <div className="mr-5 angle">
                        <i className="fa fa-angle-right h5 font-weight-bold"></i>
                      </div>
                    </div>
                  </li> */}


                    </ul>
                  </div>
                  <div className="col-lg-7 p-0 pl-lg-3">
                    <div className="fds_accordion_wrap support">


                      {this.state.ques_ans && this.state.ques_ans.map((item, index) =>
                        <div key={index} className="fds_accordion">
                          <div className="tab rounded-1 " val={index} onClick={(e) => this.handleToggle(index,item.subtitle)}>{item.subtitle}</div>
                          <div className="content " id={index}>
                            {item.query.map((ques, i) =>
                              <span className="d-flex justify-content-between" onClick={() => this.handleLoadAnswer(ques.question, ques.answer)}>
                                <button className="link">{ques.question}
                                </button>
                                <i className="fa fa-angle-right h5 font-weight-bold"></i>
                              </span>
                            )}
                          </div>
                        </div>
                      )}



                    </div>
                  </div>
                </div>


                <div className="row mx-0 mt-5">
                  <div className="col-lg-12 mb-4">
                    <div className="card border-0 rounded-1 " style={{ background: 'radial-gradient(54.59% 92.26% at 52.05% 56.7%, rgba(152, 218, 255, 0.15) 9.88%, #ACD6FC 85.94%)' }}>
                      <div className="card-body p-0">
                        <div className="row mx-0 justify-content-around">
                          <div className="col-lg-3 position-relative p-0">
                            <img src={asset + "images/support/hand@2x 1.png"} width='400' className="position-lg-absolute bottom-0 w-full-sm" />
                          </div>
                          <div className="col-lg-4 mt-5">
                            <h3>Solve your problems quickly with the Stride app.</h3>
                            <p>Track your delivery, handle returns and manage your payments with the Stride app. Get 24X7 help with our chat feature. We never miss a message, its a guarantee! </p>
                            <div className="my-5 d-flex">
                              <a href="#"><img src={asset + "images/support/apple-store.png"} className="mr-3 mb-3" /></a>
                              <a href="#"> <img src={asset + "images/support/g-play.png"} /></a>
                            </div>
                          </div>
                          <div className="col-lg-2 text-center mt-5">
                            <img src={asset + "images/support/qr-code.png"} width='122' />
                            <p className="mx-5 font-weight-bold ">Get the stride app on your phone</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>

            }


            <div className="row mx-0 mt-3 align-items-center">
              <div className="col-sm-3">
                <span className="mr-4 font-weight-bold h5">Still need help? Contact us</span>
              </div>
              <div className="col-sm-3">
              <button className="btn btn-dark rounded px-4" data-toggle="modal" onclick={this.modelOpenNew} data-target="#writetous_before_login">Write to us</button>
              </div>
            </div>
          </div>
          <About />

          <div className="modal fade" id="writetous" tabIndex="-1" role="dialog" aria-labelledby="writetousTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <h4 className="modal-title text-center mb-2 font-weight-bold">Write to us</h4>
                <p className="text-center mx-4 text-dark">Please select your query type and share the details with us. Our team will get back to you within 48 Hrs.</p>
                <div className="modal-body">
                  <form >
                    <div className="form-group">
                      <select className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="query">
                        <option defaultValue>Select the type of your query</option>
                        <option>Inquiring for Partnership</option>
                        <option>Inquire for Loans</option>
                        <option>Queries regarding repayment of EMI</option>
                        <option>I cannot find my Course / Institute   </option>
                        <option>General Query</option>
                      </select>
                    </div>
                    <div className="form-group position-relative">
                      <textarea className="form-control" id="detail" rows="10" placeholder="Please enter the details of your request. Our support staff will respond as soon as possible."></textarea>
                      <p className="font-weight-bold position-absolute bottom-0 right-0 pr-3"><img src={asset + 'images/support/fi-rr-clip.png'} /><span>Attach</span> </p>
                      <p className="font-weight-bold position-absolute bottom-20 right-0 pr-3"><img src={asset + 'images/support/fi-rr-document.png'} /><span>payment_deduction_screenshot01.jpeg</span><img src={asset + 'images/support/fi-cross-small.png'} /> </p>
                    </div>
                  </form>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-dark" disabled>Submit</button>
                </div>
              </div>
            </div>
          </div>


          <div className="modal fade" id="writetous_before_login" tabIndex="-1" role="dialog" aria-labelledby="writetous_before_loginTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <h4 className="modal-title text-center mb-2 font-weight-bold">Write to us</h4>
                <p className="text-center mx-4 text-dark">Please select your query type and share the details with us. Our team will get back to you within 48 Hrs.</p>
                <p><h5 className="mb-4 text-success popup_success">{this.state.subsMsg&& this.state.subsMsg}</h5></p>
                <div className="modal-body">
                  <form  onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="text" value={this.state.name} name="name" onChange={this.handleChange} className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="" placeholder="Enter your full name (Required)" />
                    </div>
                    <div className="form-group">
                      <input type="tel" value={this.state.mobile} name="mobile" onChange={this.handleChange} className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="" placeholder="Enter your mobile number (Required)" />
                    </div>
                    <div className="form-group">
                      <input type="email" value={this.state.email} name="email" onChange={this.handleChange} className="form-control border-top-0 border-right-0 border-left-0 rounded-0" id="" placeholder="Enter your email id (Required)" />
                    </div>
                    <div className="form-group">
                      <select className="form-control border-top-0 border-right-0 border-left-0 rounded-0" name="query" value={this.state.query} onChange={this.handleChange} id="query">
                        <option defaultValue>Select the type of your query</option>
                        <option value="Inquiring for Partnership">Inquiring for Partnership</option>
                        <option value="Inquire for Loans">Inquire for Loans</option>
                        <option value="Queries regarding repayment of EMI">Queries regarding repayment of EMI</option>
                        <option value="I cannot find my Course / Institute">I cannot find my Course / Institute   </option>
                        <option value="General Query">General Query</option>
                      </select>
                    </div>
                    <div className="form-group position-relative">
                      <textarea className="form-control" value={this.state.description} name="description" onChange={this.handleChange} id="detail" rows="10" placeholder="Please enter the details of your request. Our support staff will respond as soon as possible."></textarea>
                      {/* <p className="font-weight-bold position-absolute bottom-0 right-0 pr-3"><img src={asset + 'images/support/fi-rr-clip.png'} /><span>Attach</span> </p>
                      <p className="font-weight-bold position-absolute bottom-20 right-0 pr-3"><img src={asset + 'images/support/fi-rr-document.png'} /><span className="mx-2">payment_deduction_screenshot01.jpeg</span><img src={asset + 'images/support/fi-rr-cross-small.png'} /> </p> */}

                    </div>
                    <div className="modal-footer border-0">
                  <button type="submit" className="btn btn-dark" disabled={this.state.name != '' && this.state.mobile != '' && this.state.email != ''  && this.state.query  && this.state.description  != ''  ? false : true}>Submit</button>
                </div>
                    </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* modal  */}
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog" role="document">
    <div class="modal-content" style={{width:'850px',marginLeft:'-200px'}}>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Select your order</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
          <span aria-hidden="true" onclick={() => {this.setState({modalquestions:[],modalData:[]}); console.log("clicked");}}>&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div className="container">
          {/* <div className="row mx-auto">
            <div className="col-11 "style={{backgroundColor:'#FAFAFA' ,height:'180px'}}>
               <div><img src="./images/banner/help111.png" /><b className="mx-2">Delivered</b> On Sun, 27 Mar</div>
            </div>
          </div> */}
          <div className="row">
          <div id="accordion">
  {this.state.modalData.length > 0 && this.state.modalData.map((item, index) => (
  <div class="card" style={{backgroundColor:'#FAFAFA',marginBottom:'11px'}}>
    <div class="card-header" id="headingOne">
     
        {/* <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> */}
        <div className="" data-toggle="collapse" data-target={`#collapseOne${index}`} aria-expanded="true" aria-controls="collapseOne">
               {/* <div className="mb-4"><img src="./images/banner/help111.png" /><b className="mx-2">Delivered</b> On Sun, 27 Mar</div> */}
               <div className="d-flex justify-content-between align-items-center">
                <img className="mx-3" style={{width:'105px',height:'60px'}} src={item.product_image_url} alt="" />
                <div className="mx-3">{item.product_name}
                </div>
                 <img  className="mx-3" src="./images/banner/downarr.png" />
               </div>
            </div>
            {/* <div className="mx-3">{item.product_name} 
                </div>
                 <img  className="mx-3" src={item.product_image_url} />
               </div> */}
       
     
    </div>

    <div id={`collapseOne${index}`} class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div className="card-body">
      <div className="row">
      {this.state.modalquestions.length > 0 &&  this.state.modalquestions.map((ele,index) => (<div className="col-6 px-5 my-2"  style={{backgroundColor:'#FAFAFA'}}>
        <a className="d-flex justify-content-between align-items-center" href={'/specific-order-detail?soid='+ele.id}
        
        ><span className="text-primary">{ele.question}</span> <img  className="mx-3" src="./images/banner/rightarr111.png" /></a>
      </div>))}
      </div>
      </div>
    </div>
  </div>))}
</div>
          </div>
        </div>
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
    </div>
  </div>
</div>
<button data-toggle="modal" data-target="#exampleModal" className="d-none" id="togglemodal"></button>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet } = state.product
  return {
    isSearching,
    isLoading,
    searchDet,
    username,
    user,
    sfid
  };
}

export default connect(mapStateToProps)(Support);
