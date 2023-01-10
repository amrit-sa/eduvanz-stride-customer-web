import React, { Component } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import Header from "../common/header";
import { asset } from "../common/assets";
import { updateOneMoney, uploadOneMoneyStatement, downloadBankStatement, downloadBankStatementFaild } from "../actions/user";
import LogoSideBar from "../common/logo-side-bar";

class BankLinkSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: 0
    };
  }

  async componentDidMount()
  {
        const { dispatch, user } = this.props
        let data = { 
            id: user
          }
        await dispatch(updateOneMoney(data)).then(async (response)=>{
            if(response.status ==="success")
            {
               const getData = response.data;
               let obj = { 
                 id: user,
                 statement: getData
               }
               await dispatch(uploadOneMoneyStatement(obj)).then(async (response)=>{
               // console.log("uploadOneMoneyStatement", response);
                if(response.status ==="success")
                {
                  const getObj = response.data;
                  let analiseObj = {
                    user_id: user,
                    doc_id: getObj.docId
                  }
                  let callCount = 0;
                  const intervalId =  setInterval(async function() {
                    callCount = callCount+1;
                    if(callCount < 26)
                    {
                      await dispatch(downloadBankStatement(analiseObj)).then((response)=>{
                      // console.log("downloadBankStatement", response);
                        if(response.status ==="success")
                        {
                          clearInterval(intervalId);
                        }
                      },(error)=>{
                          clearInterval(intervalId);
                      });
                    }else{
                      clearInterval(intervalId);
                      dispatch(downloadBankStatementFaild())
                    }
                  }, 5000);
                  
                }else{
                  this.setState({ status: 2});
                }
               },(error)=>{
                this.setState({ status: 2});
               });
            }else{
              this.setState({ status: 2});
            }
        },(error)=>{
          this.setState({ status: 2});
        });
  }

  render() {
      const { user, bank_linked } = this.props
   
    return (
        <>
          <Helmet>
              <title>Bank Link Success</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        <Header
          user = {user}
        />
       
       <section className="bg0 login">
              <div className="container-zero">
                <div className="flex-w flex-tr">
                <div className="size-50 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md primary-card" >
                    <div className="d-flex flex-column">
                    
                    <LogoSideBar sideTitle="Learn Smart. Shop Smarter.All in One Place." backLink='' />
                    
                      <div className="login-img">
                        <img src={asset+"images/login-left2.png"} />
                      </div>
                    </div>
                  </div>
                  {bank_linked ==1?(
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform sucess-card">
                <form ref={(c) => {
                        this.form = c;
                      }}
                      
                >
                     <div className="m-b-20 how-pos4-parent mr-btn-sty">
                        <h5 className="text-center success-text">
                        Congratulations!
                        </h5>
                     </div>
                     <div className="m-b-20 how-pos4-parent mr-btn-sty">
                        <p className="text-center success-p-text">
                          Your bank account linked Successfully
                        </p>
                     </div>
                     <button type="button" onClick={()=> this.props.history.push('home')} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty valid-btn btn-normal"} >
                     Continue Shopping
                  </button>
                </form>
                </div>
            </div>
            ):bank_linked ==2?(
                <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
                <div className="loginform sucess-card">
                    <form ref={(c) => {
                            this.form = c;
                        }}
                        
                    >
                        <div className="m-b-20 how-pos4-parent mr-btn-sty">
                            <p className="text-center success-p-text">
                              Your account link under process
                            </p>
                        </div>
                        <button type="button" onClick={()=> this.props.history.push('home')} className={"flex-c-m cl0 size-121 bor1 p-lr-15 trans-04 pointer mr-btn-sty valid-btn btn-normal"} >
                          Continue Shopping
                        </button>
                   </form>
                </div>
            </div>
            ):(
              <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md login-form-img">
              <div className="loginform sucess-card">
                  <form ref={(c) => {
                          this.form = c;
                      }}
                      
                  >
                      <div className="m-b-20 how-pos4-parent mr-btn-sty">
                          <p className="text-center success-p-text">
                              Your bank account linking under process please wait
                          </p>
                          <div className="loader"></div>
                      </div>
                 </form>
              </div>
          </div>
          )}
          </div>
        </div>
      </section>
        </>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { bank_linked } = state.user;
  return {
    bank_linked,
    user
  };
}

export default connect(mapStateToProps)(BankLinkSuccess);
